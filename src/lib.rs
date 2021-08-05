use spasm::assemble;
use spasm::Backend;
use spasm::Emitter;
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

#[wasm_bindgen]
pub fn assemble_object_js(asm_src: &str) -> RuntimeResultJsSafe<Vec<u8>> {
    assemble_object(asm_src).map_err(|e| JsValue::from_str(&format!("{:?}", e)))
}

pub fn assemble_object(asm_src: &str) -> RuntimeResult<Vec<u8>> {
    let obj = assemble(Backend::Mos6502, asm_src).map_err(RuntimeError::Undefined)?;
    let bin = obj.emit();
    Ok(bin)
}
