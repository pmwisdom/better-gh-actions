import Axios from "axios";

export const githubClient = Axios.create({
  baseURL: `https://api.github.com/repos/pmwisdom/better-gh-actions`,
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Authorization: Bearer ${process.env.REACT_APP_GH_WORKFLOW_PAT}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
  data: {
    owner: "PMWISDOM",
    repo: "BETTER-GH-ACTIONS",
  },
});
