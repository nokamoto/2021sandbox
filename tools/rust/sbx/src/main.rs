extern crate clap;
use clap::App;

fn example() -> clap::App<'static> {
    App::new("example")
        .about("api example.v1alpha")
        .version("v1alpha")
        .subcommand(App::new("create").about("Create example"))
        .subcommand(App::new("get").about("Get example"))
        .subcommand(App::new("delete").about("Delete example"))
}

fn sbx() -> clap::App<'static> {
    App::new("sbx").version("0.1.0").subcommand(example())
}

fn main() {
    let matches = sbx().get_matches();

    match matches.subcommand() {
        Some(("example", example)) => match example.subcommand() {
            Some(("create", _create)) => println!("todo create"),
            Some(("delete", _delete)) => println!("todo delete"),
            Some(("get", _get)) => println!("todo get"),
            None => {}
            _ => unreachable!(),
        },
        None => {}
        _ => unreachable!(),
    }
}
