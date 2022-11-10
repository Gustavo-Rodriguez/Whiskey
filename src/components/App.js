import React from 'react';
import Form from './Form';
import WhiskeyList from './WhiskeyList';
import RatingModal from './RatingModal';
import db from '../utils/firebase';
import { ref, set, onValue } from 'firebase/database';

class App extends React.Component {
	state = {
		listItems: this.props.listItems,
		nextWhiskey: this.props.listItems.count + 1,
		selectedWhiskey: '',
		results: true,
		sorted: {},
	};

	componentDidMount() {
		const whiskeysRef = ref(db, 'whiskeys/');
		let dbResults;
		onValue(whiskeysRef, (snapshot) => {
			dbResults = snapshot.val();
			if (dbResults.Whiskeys !== undefined)
				this.setState((prevState) => ({
					listItems: {
						owner: 'Gustavo',
						count: prevState.listItems.count + 1,
						Whiskeys: dbResults.Whiskeys,
					},
					selectedWhiskey: prevState.selectedWhiskey,
					nextWhiskey: dbResults.nextWhiskey,
					results: prevState.results,
				}));
		});
	}

	updateFirebasewithState = (param) => {
		console.log('in updateFirebase in App this is my param', param);
		set(ref(db, 'whiskeys/'), {
			nextWhiskey: param.nextWhiskey,
			Whiskeys: param.listItems.Whiskeys,
		}).catch((error) => {
			// The write failed...
			alert('Something went wrong');
		});
	};

	handleSubmitWhiskey = (Info) => {
		this.setState(
			(prevState) => ({
				listItems: {
					owner: 'Gustavo',
					count: prevState.listItems.count + 1,
					Whiskeys: [
						...prevState.listItems.Whiskeys,
						{
							VoteAverage: -1,
							visibleName: 'Whiskey ' + prevState.nextWhiskey,
							realWhiskey: Info.InputWhiskeyName,
							hiddenEmail: Info.InputEmail,
							votes: [],
						},
					],
				},
				selectedWhiskey: prevState.selectedWhiskey,
				nextWhiskey: prevState.nextWhiskey + 1,
				results: false,
			}),
			() => {
				let alertText="Your Whiskey is Whiskey "+Number(this.state.nextWhiskey-1);
				this.updateFirebasewithState(this.state);
				alert(alertText)
			}
		);
	};

	handleRatefromApp = (Whiskey) => {
		// console.log('Someone Clicked on it, position ', Whiskey);
		this.setState((prevState) => ({
			selectedWhiskey: Whiskey + 1,
			listItems: prevState.listItems,
			nextWhiskey: prevState.nextWhiskey,
			results: false,
		}));
		// console.log('updatedState in handleratefromapp',this.state)
	};

	ClearVote = (e) => {
		this.setState((prevState) => ({
			selectedWhiskey: '',
			listItems: prevState.listItems,
			nextWhiskey: prevState.nextWhiskey,
			results: false,
		}));
	};
	SubmitVote = (voteInfo) => {
		
		console.log(voteInfo);
		let newWhiskeys = this.state.listItems.Whiskeys;
		let position = voteInfo.WhiskeyNumber - 1;
		let voteObject = {
			vote: voteInfo.CurrentStar,
			voter: voteInfo.VoterName,
			notes: voteInfo.VoterNotes,
		};
		console.log('voteObject', voteObject);
		//Add Votes to Array
		if (newWhiskeys[position].votes) {
			newWhiskeys[position].votes.push(voteObject);
		} else {
			newWhiskeys[position].votes = [voteObject];
		}
		// Add Calculate Average
		const Average =
			newWhiskeys[position].votes.reduce(
				(total, next) => Number(total) + Number(next.vote),
				0
			) / newWhiskeys[position].votes.length;
		newWhiskeys[position].VoteAverage = Average;
		this.setState(
			(prevState) => ({
				listItems: {
					owner: 'Gustavo',
					count: prevState.listItems.count,
					Whiskeys: newWhiskeys,
				},
				nextWhiskey: prevState.nextWhiskey,
				selectedWhiskey: prevState.selectedWhiskey,
				results: false,
			}),
			() => {
				this.updateFirebasewithState(this.state);
			}
		);
	};


	render() {

		console.log('in App');
		return (
			<div>
				<div className="application">
					<RatingModal
						selectedWhiskey={this.state.selectedWhiskey}
						ClearVote={this.ClearVote}
						SubmitVote={this.SubmitVote}
						whiskeyList={this.state.listItems.Whiskeys}
					/>
					<div
						className={`whiskey-list f-1 ${
							this.props.VotingOpen ?  '': 'invisible' 
						}`}
					>
						<div className="header">Whiskeys</div>
						<WhiskeyList
							listItems={this.state.listItems}
							handleRatefromApp={this.handleRatefromApp}
							selectedWhiskey={this.state.selectedWhiskey}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
