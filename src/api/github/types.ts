export type GithubWorkflow = {
  id: number;
  name: string;
  path: string;
  state: string;
  created_at: string;
  updated_at: string;
  url: string;
  html_url: string;
  badge_url: string;
};

export type GithubWorkflowsResponse = {
  total_count: number;
  workflows: GithubWorkflow[];
};
