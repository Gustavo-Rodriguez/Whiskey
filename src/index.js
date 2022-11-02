import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import listItems from './data';
import { BrowserRouter } from 'react-router-dom';

import './styles.css';

const votingOpen = true;

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<getDataFromFirebase></getDataFromFirebase>
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
