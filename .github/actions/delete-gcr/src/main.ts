import * as core from "@actions/core";
import { deleteVersion, getAllVersions, listCandidates } from "./gcr";

async function run(): Promise<void> {
  try {
    const username = core.getInput("username");
    const packagename = core.getInput("packagename");
    const keep = core.getInput("keep");
    const token = core.getInput("token");
    const dryrun = core.getBooleanInput("dryrun");

    console.log(
      "username =",
      username,
      "packagename =",
      packagename,
      "keep = ",
      keep,
      "token =",
      token,
      "dryrun =",
      dryrun
    );

    const versions = await getAllVersions(token, username, packagename);

    const keepNum = parseInt(keep);
    if (keepNum < 0) {
      core.setFailed("invalid input: keep < 0");
    }

    const deleteVerions = listCandidates(versions, keepNum);
    console.log("delete versions = ", deleteVerions);

    await (async () => {
      for (let i = 0; i < deleteVerions.length; i++) {
        const v = deleteVerions[i];
        if (dryrun) {
          console.log("dryrun delete", JSON.stringify(v));
        } else {
          await deleteVersion(token, username, packagename, v);
        }
      }
    })();
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
