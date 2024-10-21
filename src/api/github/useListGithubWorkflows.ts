import { GithubWorkflowsResponse } from "./types";
import { useGithubClient } from "./useGithubClient";

export const useListGithubWorkflows = () => {
  return useGithubClient<GithubWorkflowsResponse>({
    url: "/actions/workflows",
    method: "GET",
  });
};
