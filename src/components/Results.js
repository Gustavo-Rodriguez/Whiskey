import WhiskeyResults from './WhiskeyResults';
import React from 'react';
import WhiskeyDetails from './WhiskeyDetails';
import DetailModal from './DetailModal';
import db from '../utils/firebase';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom'

class Results extends React.Component {
	state = {
		data: this.props.data,
		details: '',
		showDetails: false,
		distribution: [0, 0, 0, 0, 0],
	};

	componentDidMount() {
		const whiskeysRef = ref(db, 'whiskeys/');
		let dbResults;
		onValue(whiskeysRef, (snapshot) => {
			dbResults = snapshot.val();
			if (dbResults !== null){
				let unsorted=dbResults;
				const sorted = [...unsorted.Whiskeys].sort((a, b) =>
					a.VoteAverage < b.VoteAverage ? 1 : -1
				);
				this.setState((prevState) => ({
					data:sorted,
					details:'',
					showDetails:false,
					distribution: [0,0,0,0,0],
				}));
			}
		});
		
	}

	ShowDetails = (Whiskey) => {
		console.log(Whiskey);

		console.log(Whiskey.votes);

		let voteDistribution = [0, 0, 0, 0, 0];
		const votes = Whiskey.votes;

		// for (var i = 0; i < votes.length; i++) {}
		votes.forEach((v) => {
			const rating = parseInt(v.vote);
			if (rating > 0 && rating <= voteDistribution.length) {
				voteDistribution[rating - 1]++;
			}
		});

		console.log(voteDistribution);

		this.setState((prevState) => ({
			data: prevState.data,
			showDetails: true,
			details: Whiskey,
			distribution: voteDistribution,
		}));
	};

	render() {
		const ResultItems = this.state.data.map((d, i) => {
			return (
				<WhiskeyResults
					result={d}
					key={i}
					mykey={i}
					ShowDetails={this.ShowDetails}
				/>
			);
		});
		let DetailList;
		let DetailHeader;
		if (this.state.showDetails) {
			DetailHeader = (
				<thead>
					<tr>
						<th style={{ width: '10%' }}>Vote</th>
						<th style={{ width: '45%' }}>Voter name (if given)</th>
						<th>Notes (if given)</th>
					</tr>
				</thead>
			);
			DetailList = this.state.details.votes.map((d, i) => {
				return <WhiskeyDetails voteDetail={d} key={i} mykey={i} />;
			});
		} else {
			DetailHeader = '';
			DetailList = '';
		}
		return (
			<div>
				<DetailModal
					Details={this.state.details}
					Distribution={this.state.distribution}
					DetailHeader={DetailHeader}
					DetailList={DetailList}
				/>
				<table className="resultsTable">
					<thead>
						<tr>
							<th>Name</th>
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
