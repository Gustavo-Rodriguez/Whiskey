import React from 'react';
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Main'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles.css';

const container=document.getElementById('root')
const root=createRoot(container);
// // Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// // Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";





root.render(
	<GoogleOAuthProvider clientId="518792592220-4ob0rgcq8gee7932reovm80utuarc4mu.apps.googleusercontent.com">
		<React.StrictMode>
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		</React.StrictMode>
	</GoogleOAuthProvider>,
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
