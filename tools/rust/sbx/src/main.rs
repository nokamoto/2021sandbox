extern crate clap;
use clap::{App, AppSettings};

mod example;

fn sbx() -> clap::App<'static> {
    App::new("sbx")
        .version("0.1.0")
        .setting(AppSettings::SubcommandRequired)
        .subcommand(example::app())
}

fn main() {
    let matches = sbx().get_matches();

    match matches.subcommand() {
        Some(("example", example)) => example::run(example),
        _ => unreachable!(),
    }
}
