use scrap::prelude::v1::*;
use spasm::assemble;
use spasm::Backend;
use spasm::Emitter;
use std::env;
use std::fmt;
use std::fs::File;
use std::io::prelude::*;

enum RuntimeError {
    FileUnreadable,
    Undefined(String),
    Simulator(String),
}

impl fmt::Debug for RuntimeError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::FileUnreadable => write!(f, "source file unreadable"),
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

type RuntimeResult<T> = Result<T, RuntimeError>;

// Assembler

fn read_src_file(filename: &str) -> RuntimeResult<String> {
    let mut f = File::open(filename).map_err(|_| RuntimeError::FileUnreadable)?;

    let mut contents = String::new();
    match f.read_to_string(&mut contents) {
        Ok(_) => Ok(contents),
        Err(e) => Err(RuntimeError::Undefined(e.to_string())),
    }
}

fn assemble_object(asm_src: &str) -> RuntimeResult<Vec<u8>> {
    let obj = assemble(Backend::Mos6502, asm_src).map_err(RuntimeError::Undefined)?;
    let bin = obj.emit();
    Ok(bin)
}

// Simulator

use mainspring::address_map::memory::{Memory, ReadOnly, ReadWrite};
use mainspring::cpu::mos6502::Mos6502;

#[allow(unused)]
use mainspring::prelude::v1::*;

type Rom = Memory<ReadOnly, u16, u8>;
type Ram = Memory<ReadWrite, u16, u8>;

fn simulate(cycles: usize, bin: Vec<u8>) -> RuntimeResult<Mos6502> {
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

fn main() {
    let raw_args: Vec<String> = env::args().into_iter().collect::<Vec<String>>();
    let args = raw_args.iter().map(|a| a.as_str()).collect::<Vec<&str>>();

    let cmd = scrap::Cmd::new("bes")
        .description("A development assembler/simulator tool for the BE6502")
        .author("Nate Catelli <ncatelli@packetfire.org>")
        .version("0.1.0")
        .with_flag(scrap::Flag::expect_string(
            "input-file",
            "i",
            "an input path for a source file.",
        ))
        .with_flag(scrap::Flag::expect_u64(
            "cycles",
            "c",
            "The number of cycles to run the simulator for.",
        ))
        .with_handler(|(input_file, cycles)| {
            read_src_file(&input_file).and_then(|src| {
                assemble_object(&src).map(|binary| simulate(cycles as usize, binary))
            })
        });

    let help_string = cmd.help();
    let eval_res = cmd
        .evaluate(&args[..])
        .map_err(|e| RuntimeError::Undefined(e.to_string()))
        .and_then(|flags| cmd.dispatch(flags));

    match eval_res {
        Ok(Ok(cpu)) => println!("{:#?}", cpu),
        Ok(Err(e)) | Err(e) => println!("{}\n\n{}", &e.to_string(), &help_string),
    }
}
