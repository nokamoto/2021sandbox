fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::configure().build_server(false).compile(
        &["../../../api/example/v1alpha/example.proto"],
        &["../../../api"],
    )?;
    Ok(())
}
