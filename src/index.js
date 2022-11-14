import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main'

// // Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// // Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";

import './styles.css';



ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Main />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <App
//     title={"WHISKEY PARTY APP"}
//     listItems={listItems}
//   />,
//   rootElement
// );
