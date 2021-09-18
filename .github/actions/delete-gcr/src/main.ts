import * as core from "@actions/core";

async function run(): Promise<void> {
  try {
    const username = core.getInput("username");
    const packagename = core.getInput("packagename");
    const token = core.getInput("token");
    const dryrun = core.getBooleanInput("dryrun");
    console.log(
      "username=",
      username,
      "packagename=",
      packagename,
      "token=",
      token,
      "dryrun=",
      dryrun
    );
  } catch (err) {
    if (err instanceof Error) {
      core.setFailed(err.message);
    } else {
      console.log(err);
      core.setFailed("unknown error");
    }
  }
}

run();
