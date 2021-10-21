import * as core from "@actions/core";
import { createComment, getPull, getPulls } from "./pr";

async function run(): Promise<void> {
  try {
    const token = core.getInput("token");
    const owner = core.getInput("owner");
    const repo = core.getInput("repo");
    const body = core.getInput("body");
    const dryrun = core.getBooleanInput("dryrun");

    console.log(
      "token =",
      token,
      "owner =",
      owner,
      "repo =",
      repo,
      "body =",
      body,
      "dryrun =",
      dryrun
    );

    const pulls = await getPulls(token, owner, repo);

    const conflictingPulls: number[] = [];
    await (async () => {
      for (let i = 0; i < pulls.length; i++) {
        let pull = pulls[i];
        pull = await getPull(token, owner, repo, pull);
        console.log("pull =", pull);
        switch (pull.state) {
          case "dirty":
            conflictingPulls.push(pull.number);
            break;
          default:
            console.log("skip state =", pull.state);
            break;
        }
      }
    })();

    console.log("conflicting =", conflictingPulls);

    await (async () => {
      for (let i = 0; i < conflictingPulls.length; i++) {
        if (dryrun) {
          console.log("dryrun comment: #", conflictingPulls[i]);
        } else {
          console.log("run: #", conflictingPulls[i]);
          await createComment(token, owner, repo, conflictingPulls[i], body);
        }
      }
    });
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
