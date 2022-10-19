import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import listItems from "./data/Data";

import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <App 
    title={"React ToDo List"} 
    listItems={listItems} 
  />,
  rootElement
);
