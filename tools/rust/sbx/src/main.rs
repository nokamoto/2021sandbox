extern crate clap;
use clap::{App, AppSettings};

mod example;

fn sbx() -> clap::App<'static> {
    App::new("sbx")
        .version("0.1.0")
        .setting(AppSettings::SubcommandRequired)
        .subcommand(example::app())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let matches = sbx().get_matches();

    match matches.subcommand() {
        Some(("example", example)) => example::run(example).await?,
        _ => unreachable!(),
    }

    Ok(())
}
