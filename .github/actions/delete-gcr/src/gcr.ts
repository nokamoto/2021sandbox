import * as github from "@actions/github";

interface version {
  created_at: string;
  deleted_at?: string;
  name: string;
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
      console.log(res.data);
      return res.data.map((v) => {
        return {
          created_at: v.created_at,
          deleted_at: v.deleted_at,
          name: v.name,
        };
      });
    });
}
