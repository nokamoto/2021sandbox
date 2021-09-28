extern crate clap;
use clap::{App, AppSettings};

pub mod example_service {
    tonic::include_proto!("example.v1alpha");
}

use example_service::example_service_client::ExampleServiceClient;
use example_service::{CreateExampleRequest, DeleteExampleRequest, GetExampleRequest};

pub fn app() -> clap::App<'static> {
    App::new("example")
        .about("api example.v1alpha")
        .version("v1alpha")
        .setting(AppSettings::SubcommandRequired)
        .subcommand(create_app())
        .subcommand(get_app())
        .subcommand(delete_app())
}

pub async fn run(matches: &clap::ArgMatches) -> Result<(), Box<dyn std::error::Error>> {
    match matches.subcommand() {
        Some(("create", _create)) => create_run().await,
        Some(("delete", _delete)) => delete_run().await,
        Some(("get", _get)) => get_run().await,
        _ => unreachable!(),
    }
}

fn create_app() -> clap::App<'static> {
    App::new("create").about("Create example")
}

fn get_app() -> clap::App<'static> {
    App::new("get").about("Get example")
}

fn delete_app() -> clap::App<'static> {
    App::new("delete").about("Delete example")
}

const ADDR: &str = "http://localhost:9000";

async fn create_run() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = ExampleServiceClient::connect(ADDR).await?;
    let request = tonic::Request::new(CreateExampleRequest {});
    let response = client.create_example(request).await?;
    println!("RESPONSE={:?}", response);
    Ok(())
}

async fn get_run() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = ExampleServiceClient::connect(ADDR).await?;
    let request = tonic::Request::new(GetExampleRequest {});
    let response = client.get_example(request).await?;
    println!("RESPONSE={:?}", response);
    Ok(())
}

async fn delete_run() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = ExampleServiceClient::connect(ADDR).await?;
    let request = tonic::Request::new(DeleteExampleRequest {});
    let response = client.delete_example(request).await?;
    println!("RESPONSE={:?}", response);
    Ok(())
}
