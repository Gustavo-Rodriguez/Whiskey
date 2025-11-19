import WhiskeyResults from './WhiskeyResults';
import React from 'react';
import WhiskeyDetails from './WhiskeyDetails';
import DetailModal from './DetailModal';
import db from '../utils/firebase';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom'
import WhiskeysToArray from './WhiskeysToArray';
import GetVotes from './GetVotes';

class Results extends React.Component {
	state = {
		data: this.props.WhiskeyList,
		details: '',
		showDetails: false,
		distribution: [0, 0, 0, 0, 0],
		WhiskeyFound: false,
		WhiskeyDetails: {}
	};

	componentDidMount() {
		const whiskeysRef = ref(db, 'Whiskeys/');
		let dbResults;
		// search for all Whiskeeys in Results
		onValue(whiskeysRef, (snapshot) => {
			dbResults = snapshot.val();
			// If we Found Whiskeys at all
			if (dbResults !== null) {
				// Cast our Whiskeys to an array
				let tempArray = WhiskeysToArray(dbResults);
				let unsorted = [];
				// We are doing this to strip the e-mail of the Contributor from the object before we pass it everywhere 
				for (let i = 0; i < tempArray.length; i++) {
					let newObj = tempArray[i];
					delete newObj.OwnerEmail;
					unsorted.push(newObj)
				}
				//Sort our Whiskeys by Average Vote
				const sorted = [...unsorted].sort((a, b) =>
					a.VoteAverage < b.VoteAverage ? 1 : -1
				);
				this.setState((prevState) => ({
					data: sorted,
					details: '',
					showDetails: false,
					distribution: [0, 0, 0, 0, 0],
					WhiskeyFound: true
				}));
			}
		});

	}

	ShowDetails = (Whiskey) => {
		let VoteArray = [];
		const WhiskeyVotes = GetVotes(Whiskey)
		let voteDistribution = [0, 0, 0, 0, 0];
		if (WhiskeyVotes.then()) {
			// console.log('WhiskeyVotes is a promise')
			WhiskeyVotes.then(value => {

				// console.log('Votes Promise resolves to ', value)
				VoteArray = value;
				const votes = VoteArray;
				// console.log('votes arary is =', votes)
				votes.forEach((v) => {
					const rating = parseInt(v.vote);
					if (rating > 0 && rating <= voteDistribution.length) {
						voteDistribution[rating - 1]++;
					}
				});
				this.setState((prevState) => ({
					data: prevState.data,
					showDetails: true,
					VoteDetails: votes,
					WhiskeyDetails: Whiskey,
					distribution: voteDistribution,
				}));
			});
		} else {
			VoteArray = WhiskeyVotes;
			const votes = VoteArray;
			// console.log('votes arary is =', votes)
			votes.forEach((v) => {
				const rating = parseInt(v.vote);
				if (rating > 0 && rating <= voteDistribution.length) {
					voteDistribution[rating - 1]++;
				}
			});
			this.setState((prevState) => ({
				data: prevState.data,
				showDetails: true,
				VoteDetails: votes,
				WhiskeyDetails: Whiskey,
				distribution: voteDistribution,
			}));
		}
		// console.log('showDetails updated state is ',this.state)

	};

	render() {
		let ResultItems
		if (this.state.WhiskeyFound) {
			ResultItems = this.state.data.map((d, i) => {
				return (
					<WhiskeyResults
						result={d}
						key={i}
						mykey={i}
						ShowDetails={this.ShowDetails}
					/>
				);
			});
		}
		let DetailList;
		let DetailHeader;
		if (this.state.showDetails) {
			DetailHeader = (
				<thead>
					<tr>
						<th style={{ width: '10%' }}>Vote</th>
						<th style={{ width: '45%' }}>Voter name</th>
						<th>Notes (if given)</th>
					</tr>
				</thead>
			);
			DetailList = this.state.VoteDetails.map((d, i) => {
				return <WhiskeyDetails voteDetail={d} key={i} mykey={i} />;
			});
		} else {
			DetailHeader = '';
			DetailList = '';
		}
		return (
			<div>
				<DetailModal
					Details={this.state.WhiskeyDetails}
					Distribution={this.state.distribution}
					DetailHeader={DetailHeader}
					DetailList={DetailList}
				/>
				<table className="resultsTable">
					<thead>
						<tr>
							<th>Name</th>
							<th>Contributor</th>
							<th>Number</th>
							<th>Type</th>
							<th>Rating</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>{ResultItems}</tbody>
				</table>
				<Link to='/'>Back to Home</Link>
			</div>
		);
	}
}

export default Results;
