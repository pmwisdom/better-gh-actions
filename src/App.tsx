import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "semantic-ui-react";
import { useListGithubWorkflows } from "./api/github/useListGithubWorkflows";
import { Workflows } from "./components/Workflows";

function App() {
  const { data } = useListGithubWorkflows();

  console.log("DATA 222", data);

  return (
    <div className="App">
      <Workflows />
    </div>
  );
}

export default App;
