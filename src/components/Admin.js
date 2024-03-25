
import AdminResults from './AdminResults';
import React from 'react';
import db from '../utils/firebase';
import { ref, onValue } from 'firebase/database';
import WhiskeysToArray from './WhiskeysToArray';

class Admin extends React.Component {
	state = {
	};
	componentDidMount() {
		const whiskeysRef = ref(db, 'Whiskeys/');
		let dbResults;
		// search for all Whiskeeys in Results
		onValue(whiskeysRef, (snapshot) => {
			dbResults = snapshot.val();
			// If we Found Whiskeys at all
			if (dbResults !== null){
				// Cast our Whiskeys to an array
				let tempArray=WhiskeysToArray(dbResults);
				let unsorted=[];
				// We are doing this to strip the e-mail of the Contributor from the object before we pass it everywhere 
				for (let i=0;i<tempArray.length;i++){
					let newObj=tempArray[i];
					delete newObj.OwnerEmail;
					unsorted.push(newObj)
				}
				//Sort our Whiskeys by Average Vote
				const sorted = [...unsorted].sort((a, b) =>
					a.VoteAverage < b.VoteAverage ? 1 : -1
				);
				this.setState((prevState) => ({
					data:sorted,
					details:'',
					showDetails:false,
					WhiskeyFound:true
				}));
			}
		});
		
	}


	render() {
		console.log('in Admin state is ',this.state)
		let ResultItems
		if (this.state.WhiskeyFound){
			ResultItems = this.state.data.map((d, i) => {
				return (
					<AdminResults
						result={d}
						key={i}
						mykey={i}
						ShowDetails={this.ShowDetails}
					/>
				);
			});
		}
		return (
			<div className='application center-me'>
				<div className='header'>
					<h3>This is the admin Pannel, click <a href="https://console.firebase.google.com/u/0/project/whiskey-a2ed6/database/whiskey-a2ed6-default-rtdb/data">here</a> to get to the database</h3>
				</div>
				<table className="resultsTable">
					<thead>
						<tr>
							<th>Contributor</th>
							<th>Previous Number</th>
							<th>Type</th>
							<th>New Whiskey Number</th>
							<th>Submit</th>
						</tr>
					</thead>
					<tbody>{ResultItems}</tbody>
				</table>
			</div>
		)
	}
}

export default Admin;
