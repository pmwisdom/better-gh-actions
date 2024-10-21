import {
  Button,
  Container,
  Header,
  List,
  ListContent,
  ListDescription,
  ListHeader,
  ListIcon,
  ListItem,
  ListList,
} from "semantic-ui-react";
import { useListGithubWorkflows } from "../api/github";
import { GithubWorkflow } from "../api/github/types";
import { set } from "lodash/fp";
import { workflowConfigs } from "../config/workflowConfigs";

interface NestedWorkflows {
  // domain
  [key: string]: {
    // action
    [key: string]: {
      // environment
      [key: string]: GithubWorkflow;
    };
  };
}

const nestWorkflows = (workflows: GithubWorkflow[]) => {
  const nestedWorkflows = workflows.reduce<NestedWorkflows>((acc, workflow) => {
    const workflowPath = workflow.name.replace(/-/g, ".");

    return set(workflowPath, workflow, acc);
  }, {});

  return nestedWorkflows;
};

export const Workflows = () => {
  const { data, loading } = useListGithubWorkflows();

  if (loading) {
    return <Container>Loading...</Container>;
  }

  const nestedWorkflowData = nestWorkflows(data?.workflows || []);

  const handleWorkflowClick = (workflow: GithubWorkflow) => {
    const config = workflowConfigs[workflow.id];

    console.log("CONFIG", config);
  };

  return (
    <Container textAlign="left">
      <Header>Workflows</Header>
      <List>
        {Object.keys(nestedWorkflowData).map((domainKey) => (
          <ListItem>
            <ListIcon />
            <ListContent>
              <ListHeader>{domainKey}</ListHeader>
              <ListList>
                {Object.keys(nestedWorkflowData[domainKey]).map((actionKey) => (
                  <ListItem>
                    <ListIcon />
                    <ListContent>
                      <ListHeader>{actionKey}</ListHeader>
                      <ListList>
                        {Object.keys(
                          nestedWorkflowData[domainKey][actionKey]
                        ).map((environmentKey) => (
                          <ListItem>
                            <ListIcon />
                            <ListContent>
                              <ListHeader
                                as="a"
                                onClick={() =>
                                  handleWorkflowClick(
                                    nestedWorkflowData[domainKey][actionKey][
                                      environmentKey
                                    ]
                                  )
                                }
                              >{`${environmentKey} >`}</ListHeader>
                            </ListContent>
                          </ListItem>
                        ))}
                      </ListList>
                    </ListContent>
                  </ListItem>
                ))}
              </ListList>
            </ListContent>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
