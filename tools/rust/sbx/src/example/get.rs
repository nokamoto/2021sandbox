extern crate clap;
use clap::App;

pub fn app() -> clap::App<'static> {
    App::new("get").about("Get example")
}

pub fn run() {
    println!("todo get run")
}
