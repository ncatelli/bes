mod utils;

use wasm_bindgen::prelude::*;

pub enum RuntimeError {
    Undefined(String),
    Simulator(String),
}

impl std::fmt::Debug for RuntimeError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Simulator(e) => write!(f, "simulator error: {}", e),
            Self::Undefined(s) => write!(f, "{}", s),
        }
    }
}

impl std::fmt::Display for RuntimeError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", &self)
    }
}

pub type RuntimeResult<T> = Result<T, RuntimeError>;
pub type RuntimeResultJsSafe<T> = Result<T, JsValue>;

// simulator

use mainspring::address_map::memory::{Memory, ReadOnly, ReadWrite};
use mainspring::cpu::mos6502::Mos6502;

#[allow(unused)]
use mainspring::prelude::v1::*;

type Rom = Memory<ReadOnly, u16, u8>;
type Ram = Memory<ReadWrite, u16, u8>;

#[cfg(target_arch = "wasm32")]
const RAM_SIZE: usize = 0x4000;
#[cfg(target_arch = "wasm32")]
const ROM_SIZE: usize = 0x8000;

#[wasm_bindgen]
#[cfg(target_arch = "wasm32")]
pub struct Mos6502JsSafe {
    // memory
    ram: [u8; RAM_SIZE],
    rom: [u8; ROM_SIZE],
    // registers
    pub acc: u8,
    pub x: u8,
    pub y: u8,
    pub sp: u8,
    pub pc: u16,
    pub ps: u8,
}

#[wasm_bindgen]
#[cfg(target_arch = "wasm32")]
impl Mos6502JsSafe {
    pub fn ram(&self) -> Box<[u8]> {
        Box::new(self.ram.clone())
    }

    pub fn rom(&self) -> Box<[u8]> {
        Box::new(self.rom.clone())
    }
}

#[cfg(target_arch = "wasm32")]
impl From<Mos6502> for Mos6502JsSafe {
    fn from(src: Mos6502) -> Self {
        let mut ram = [0u8; RAM_SIZE];
        ram.iter_mut()
            .enumerate()
            .map(|(offset, byte)| (offset as u16, byte))
            .for_each(|(offset, byte)| *byte = src.address_map.read(offset));
        let mut rom = [0u8; ROM_SIZE];
        rom.iter_mut()
            .enumerate()
            .map(|(offset, byte)| ((offset as u16 + 0x8000u16), byte))
            .for_each(|(offset, byte)| *byte = src.address_map.read(offset));

        Self {
            ram: ram,
            rom: rom,
            acc: src.acc.read(),
            x: src.x.read(),
            y: src.y.read(),
            sp: src.sp.read(),
            pc: src.pc.read(),
            ps: src.ps.read(),
        }
    }
}

#[wasm_bindgen]
#[cfg(target_arch = "wasm32")]
pub fn simulate(cycles: usize, bin: Vec<u8>) -> RuntimeResultJsSafe<Mos6502JsSafe> {
    simulate_inner(cycles, bin)
        .map_err(|e| JsValue::from_str(&format!("{:?}", e)))
        .map(|state| Mos6502JsSafe::from(state))
}

#[cfg(not(target_arch = "wasm32"))]
pub fn simulate(cycles: usize, bin: Vec<u8>) -> RuntimeResult<Mos6502> {
    simulate_inner(cycles, bin)
}

fn simulate_inner(cycles: usize, bin: Vec<u8>) -> RuntimeResult<Mos6502> {
    let ram = Ram::new(0x0200, 0x3fff);
    let via = Ram::new(0x6000, 0x7fff);
    let rom = Rom::new(0x8000, 0xffff).load(bin);
    let cpu = Mos6502::default()
        .register_address_space(0x0200..=0x3fff, ram)
        .and_then(|cpu| cpu.register_address_space(0x6000..=0x7fff, via))
        .and_then(|cpu| cpu.register_address_space(0x8000..=0xffff, rom))
        .map_err(RuntimeError::Simulator)?
        .reset()
        .unwrap();

    Ok(cpu.run(cycles).unwrap())
}

// assembler

use spasm::assemble;
use spasm::Backend;
use spasm::Emitter;

/// hexdump formats a binary array into a a format emulating the output of xxd
/// or hexdump.
#[wasm_bindgen]
pub fn hexdump(bytes: &[u8]) -> String {
    let lines: Vec<String> = bytes
        .chunks(16)
        .enumerate()
        .map(|(offset, bytes)| {
            // multiply the line offset by the bytes in the chunk.
            let line_offset = offset * 16;

            // break array into 2-byte chunks.
            let columns: Vec<String> = bytes
                .chunks(2)
                .map(|two_byte_chunk| {
                    two_byte_chunk
                        .iter()
                        .map(|b| format!("{:02x?}", b))
                        .collect()
                })
                .collect();

            (line_offset, columns.join(" "))
        })
        .map(|(offset, line)| format!("{:08x?}: {}", offset, line))
        .collect();

    lines.join("\n")
}

#[wasm_bindgen]
#[cfg(target_arch = "wasm32")]
pub fn assemble_object(asm_src: &str) -> RuntimeResultJsSafe<Vec<u8>> {
    assemble_object_inner(asm_src).map_err(|e| JsValue::from_str(&format!("{:?}", e)))
}

#[cfg(not(target_arch = "wasm32"))]
pub fn assemble_object(asm_src: &str) -> RuntimeResult<Vec<u8>> {
    assemble_object_inner(asm_src)
}

fn assemble_object_inner(asm_src: &str) -> RuntimeResult<Vec<u8>> {
    let obj = assemble(Backend::Mos6502, asm_src).map_err(RuntimeError::Undefined)?;
    let bin = obj.emit();
    Ok(bin)
}
