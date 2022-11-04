import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import listItems from './data';
import { BrowserRouter } from 'react-router-dom';


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import './styles.css';

const votingOpen = true;

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App
				title={'WHISKEY PARTY APP'}
				listItems={listItems}
				VotingOpen={votingOpen}
			/>
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
