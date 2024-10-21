import {
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

  //   return (
  // //     <Container></Container>
  // //     <List>
  // //       <ListItem>
  // //         <ListIcon name="folder" />
  // //         <ListContent>
  // //           <ListHeader>src</ListHeader>
  // //           <ListDescription>Source files for project</ListDescription>
  // //           <ListList>
  // //             <ListItem>
  // //               <ListIcon name="folder" />
  // //               <ListContent>
  // //                 <ListHeader>site</ListHeader>
  // //                 <ListDescription>Your site's theme</ListDescription>
  // //               </ListContent>
  // //             </ListItem>
  // //             <ListItem>
  // //               <ListIcon name="folder" />
  // //               <ListContent>
  // //                 <ListHeader>themes</ListHeader>
  // //                 <ListDescription>Packaged theme files</ListDescription>
  // //                 <ListList>
  // //                   <ListItem>
  // //                     <ListIcon name="folder" />
  // //                     <ListContent>
  // //                       <ListHeader>default</ListHeader>
  // //                       <ListDescription>Default packaged theme</ListDescription>
  // //                     </ListContent>
  // //                   </ListItem>
  // //                   <ListItem>
  // //                     <ListIcon name="folder" />
  // //                     <ListContent>
  // //                       <ListHeader>my_theme</ListHeader>
  // //                       <ListDescription>
  // //                         Packaged themes are also available in this folder
  // //                       </ListDescription>
  // //                     </ListContent>
  // //                   </ListItem>
  // //                 </ListList>
  // //               </ListContent>
  // //             </ListItem>
  // //             <ListItem>
  // //               <ListIcon name="file" />
  // //               <ListContent>
  // //                 <ListHeader>theme.config</ListHeader>
  // //                 <ListDescription>
  // //                   Config file for setting packaged themes
  // //                 </ListDescription>
  // //               </ListContent>
  // //             </ListItem>
  // //           </ListList>
  // //         </ListContent>
  // //       </ListItem>
  // //       <ListItem>
  // //         <ListIcon name="folder" />
  // //         <ListContent>
  // //           <ListHeader>dist</ListHeader>
  // //           <ListDescription>Compiled CSS and JS files</ListDescription>
  // //           <ListList>
  // //             <ListItem>
  // //               <ListIcon name="folder" />
  // //               <ListContent>
  // //                 <ListHeader>components</ListHeader>
  // //                 <ListDescription>
  // //                   Individual component CSS and JS
  // //                 </ListDescription>
  // //               </ListContent>
  // //             </ListItem>
  // //           </ListList>
  // //         </ListContent>
  // //       </ListItem>
  // //       <ListItem>
  // //         <ListIcon name="file" />
  // //         <ListContent>
  // //           <ListHeader>semantic.json</ListHeader>
  // //           <ListDescription>Contains build settings for gulp</ListDescription>
  // //         </ListContent>
  // //       </ListItem>
  // //     </List>
  // //   );

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
                              <ListHeader>{`${environmentKey} >`}</ListHeader>
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
