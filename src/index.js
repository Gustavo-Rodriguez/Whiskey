import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import listItems from "./data";
import { BrowserRouter } from "react-router-dom";
import db from './utils/firebase';
import {ref, onValue} from "firebase/database"


import "./styles.css";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
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
