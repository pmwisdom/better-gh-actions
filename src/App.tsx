import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "semantic-ui-react";
import { useListGithubWorkflows } from "./api/github/useListGithubWorkflows";

function App() {
  const { data } = useListGithubWorkflows();

  console.log("DATA", data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Header>Semantic Integration</Header>
      </header>
    </div>
  );
}

export default App;
