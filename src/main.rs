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

fn main() {
    let raw_args: Vec<String> = env::args().into_iter().collect::<Vec<String>>();
    let args = raw_args.iter().map(|a| a.as_str()).collect::<Vec<&str>>();

    let cmd = scrap::Cmd::new("bes")
        .description("A development assembler/simulator tool for the BE6502")
        .author("Nate Catelli <ncatelli@packetfire.org>")
        .version("0.1.0")
        .with_flag(scrap::WithOpen::new(scrap::ExpectFilePath::new(
            "input-file",
            "i",
            "an input path for a source file.",
            true,
            false,
            true,
        )))
        .with_flag(scrap::Flag::expect_u64(
            "cycles",
            "c",
            "The number of cycles to run the simulator for.",
        ))
        .with_handler(|(input_file, cycles)| {
            read_src_file(input_file).and_then(|src| {
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
        Ok(Err(e)) | Err(e) => println!("error: {}\n\n{}", &e.to_string(), &help_string),
    }
}
