import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import listItems from "./data";

import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <App 
    title={"WHISKEY PARTY APP"} 
    listItems={listItems} 
  />,
  rootElement
);
