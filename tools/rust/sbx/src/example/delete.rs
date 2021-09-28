extern crate clap;
use clap::App;

pub fn app() -> clap::App<'static> {
    App::new("delete").about("Delete example")
}

pub fn run() {
    println!("todo delete run")
}
