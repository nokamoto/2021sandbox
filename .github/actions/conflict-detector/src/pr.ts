import * as github from "@actions/github";

interface pull {
  number: number;
  state: string;
}

export async function getPulls(
  token: string,
  owner: string,
  repo: string
): Promise<pull[]> {
  const octokit = github.getOctokit(token);

  return octokit.rest.pulls
    .list({
      owner: owner,
      repo: repo,
    })
    .then((res) => {
      return res.data.map((pull) => {
        return {
          number: pull.number,
          state: "",
        };
      });
    });
}

export async function getPull(
  token: string,
  owner: string,
  repo: string,
  pull: pull
): Promise<pull> {
  const octokit = github.getOctokit(token);

  return octokit.rest.pulls
    .get({
      owner: owner,
      repo: repo,
      pull_number: pull.number,
    })
    .then((res) => {
      return {
        number: pull.number,
        state: res.data.mergeable_state,
      };
    });
}

export async function createComment(
  token: string,
  owner: string,
  repo: string,
  issueNumber: number,
  body: string
): Promise<void> {
  const octokit = github.getOctokit(token);

  return octokit.rest.issues
    .createComment({
      owner: owner,
      repo: repo,
      issue_number: issueNumber,
      body: body,
    })
    .then(() => {
      return;
    });
}
