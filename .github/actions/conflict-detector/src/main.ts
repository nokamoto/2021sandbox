import * as core from "@actions/core";

async function run(): Promise<void> {
  try {
    console.log("todo");
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
