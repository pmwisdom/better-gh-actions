import { useGithubClient } from "./useGithubClient";

export const useListGithubWorkflows = () => {
  return useGithubClient({ url: "/actions/workflows", method: "GET" });
};
