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

#[cfg(not(target_arch = "wasm32"))]
use mainspring::address_map::memory::{Memory, ReadOnly, ReadWrite};
#[cfg(not(target_arch = "wasm32"))]
use mainspring::cpu::mos6502::Mos6502;

#[allow(unused)]
use mainspring::prelude::v1::*;

#[cfg(not(target_arch = "wasm32"))]
type Rom = Memory<ReadOnly, u16, u8>;
#[cfg(not(target_arch = "wasm32"))]
type Ram = Memory<ReadWrite, u16, u8>;

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
