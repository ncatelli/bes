use std::fmt;

mod utils;

use wasm_bindgen::prelude::*;

pub enum RuntimeError {
    Undefined(String),
    Simulator(String),
}

impl fmt::Debug for RuntimeError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Simulator(e) => write!(f, "simulator error: {}", e),
            Self::Undefined(s) => write!(f, "{}", s),
        }
    }
}

impl fmt::Display for RuntimeError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
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

#[wasm_bindgen]
/// Provides a wasm wrapper around the Mos6502 type.
pub struct Mos6502JsSafe(Mos6502);

#[wasm_bindgen]
pub fn simulate_js(cycles: usize, bin: Vec<u8>) -> RuntimeResultJsSafe<Mos6502JsSafe> {
    simulate(cycles, bin)
        .map(|mos| Mos6502JsSafe(mos))
        .map_err(|e| JsValue::from_str(&format!("{:?}", e)))
}

pub fn simulate(cycles: usize, bin: Vec<u8>) -> RuntimeResult<Mos6502> {
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

#[wasm_bindgen]
pub fn assemble_object_js(asm_src: &str) -> RuntimeResultJsSafe<Vec<u8>> {
    assemble_object(asm_src).map_err(|e| JsValue::from_str(&format!("{:?}", e)))
}

pub fn assemble_object(asm_src: &str) -> RuntimeResult<Vec<u8>> {
    let obj = assemble(Backend::Mos6502, asm_src).map_err(RuntimeError::Undefined)?;
    let bin = obj.emit();
    Ok(bin)
}
