use scrap::prelude::v1::*;
use std::env;
use std::io::prelude::*;

use bes::*;

fn read_src_file(mut src_file: std::fs::File) -> RuntimeResult<String> {
    let mut contents = String::new();
    match src_file.read_to_string(&mut contents) {
        Ok(_) => Ok(contents),
        Err(e) => Err(RuntimeError::Undefined(e.to_string())),
    }
}

fn main() -> Result<(), String> {
    let raw_args: Vec<String> = env::args().into_iter().collect::<Vec<String>>();
    let args = raw_args.iter().map(|a| a.as_str()).collect::<Vec<&str>>();

    // Flag definitions
    let help_flag = scrap::Flag::store_true("help", "h", "display usage information.").optional();

    let input_file_flag = scrap::WithOpen::new(scrap::FlagWithValue::new(
        "input-file",
        "i",
        "An input path for a source file.",
        scrap::FileValue::new(true, false, true),
    ));

    let cycles_flag = scrap::Flag::expect_u64(
        "cycles",
        "c",
        "The number of cycles to run the simulator for.",
    );

    let cmd = scrap::Cmd::new("bes")
        .description("A development assembler/simulator tool for the BE6502")
        .author("Nate Catelli <ncatelli@packetfire.org>")
        .version("0.1.0")
        .with_flag(input_file_flag)
        .with_flag(cycles_flag)
        .with_flag(help_flag)
        .with_handler(|((input_file, cycles), _)| {
            read_src_file(input_file).and_then(|src| {
                assemble_object(&src).map(|binary| simulate(cycles as usize, binary))
            })
        });

    let help_string = cmd.help();
    cmd.evaluate(&args[..])
        .map_err(|e| RuntimeError::Undefined(e.to_string()).to_string())
        .and_then(|(flags, help)| {
            if help.is_none() {
                cmd.dispatch((flags, help))
                    // On success print the state
                    .map(|cpu| println!("{:#?}", cpu))
                    // On failure, format an error.
                    .map_err(|e| format!("{}\n\n{}", &e.to_string(), &help_string))
            } else {
                println!("{:?}", &help_string);
                Ok(())
            }
        })
        .map_err(|e| e.to_string())
}
