extern crate clap;
use clap::App;

pub fn app() -> clap::App<'static> {
    App::new("create").about("Create example")
}

pub fn run() {
    println!("todo create run")
}
