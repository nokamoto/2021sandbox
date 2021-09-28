extern crate clap;
use clap::{App, AppSettings};

mod create;
mod delete;
mod get;

pub fn app() -> clap::App<'static> {
    App::new("example")
        .about("api example.v1alpha")
        .version("v1alpha")
        .setting(AppSettings::SubcommandRequired)
        .subcommand(create::app())
        .subcommand(get::app())
        .subcommand(delete::app())
}

pub fn run(matches: &clap::ArgMatches) {
    match matches.subcommand() {
        Some(("create", _create)) => create::run(),
        Some(("delete", _delete)) => delete::run(),
        Some(("get", _get)) => get::run(),
        _ => unreachable!(),
    }
}
