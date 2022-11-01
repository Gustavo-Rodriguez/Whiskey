import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import listItems from "./data";
import { BrowserRouter } from "react-router-dom";



import "./styles.css";



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <getDataFromFirebase></getDataFromFirebase>
   <App 
    title={"WHISKEY PARTY APP"} 
    listItems={listItems} 
  /> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <App 
//     title={"WHISKEY PARTY APP"} 
//     listItems={listItems} 
//   />,
//   rootElement
// );
