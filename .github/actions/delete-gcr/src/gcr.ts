import * as github from "@actions/github";

export interface version {
  created_at: string;
  deleted_at?: string;
  name: string;
  id: number;
}

export function compareFn(a: version, b: version): number {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export function listCandidates(versions: version[], keep: number): version[] {
  return versions.sort(compareFn).slice(keep);
}

export async function getAllVersions(
  token: string,
  username: string,
  packagename: string
): Promise<version[]> {
  const octokit = github.getOctokit(token);

  return await octokit.rest.packages
    .getAllPackageVersionsForPackageOwnedByUser({
      package_type: "container",
      package_name: packagename,
      username: username,
    })
    .then((res) => {
      console.log(res.url, JSON.stringify(res.data));
      return res.data.map((v) => {
        return {
          created_at: v.created_at,
          deleted_at: v.deleted_at,
          name: v.name,
          id: v.id,
        };
      });
    });
}

export async function deleteVersion(
  token: string,
  username: string,
  packagename: string,
  version: version
): Promise<void> {
  const octokit = github.getOctokit(token);

  console.log("delete version = ", version);

  return await octokit.rest.packages
    .deletePackageVersionForUser({
      package_type: "container",
      package_name: packagename,
      username: username,
      package_version_id: version.id,
    })
    .then((res) => {
      console.log(res.url, res.status);
      return;
    })
    .catch((err) => {
      console.log(err);
    });
}
