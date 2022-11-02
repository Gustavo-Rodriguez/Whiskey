import React from 'react';
import Form from './Form';
import WhiskeyList from './WhiskeyList';
import RatingModal from './RatingModal';
import Results from './Results.js';
import db from '../utils/firebase';
import { ref, set, onValue } from 'firebase/database';

class App extends React.Component {
	state = {
		listItems: this.props.listItems,
		nextWhiskey: this.props.listItems.count + 1,
		selectedWhiskey: '',
		results: false,
	};

	componentDidMount() {
		const whiskeysRef = ref(db, 'whiskeys/');
		let dbResults;
		onValue(whiskeysRef, (snapshot) => {
			dbResults = snapshot.val();
			if (dbResults !== null)
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
		console.log('in updateFirebase this is my param', param);
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
				console.log('in submit whiskey my state is ', this.stateS);
				this.updateFirebasewithState(this.state);
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
	SortAndDisplayResults = (e) => {
		// let WhiskeyCount=this.state.listItems.Whiskeys.length
		const sorted = [...this.state.listItems.Whiskeys].sort((a, b) =>
			a.VoteAverage < b.VoteAverage ? 1 : -1
		);

		this.setState((prevState) => ({
			listItems: {
				owner: 'Gustavo',
				count: prevState.listItems.count,
				Whiskeys: prevState.listItems.Whiskeys,
			},
			nextWhiskey: prevState.nextWhiskey,
			selectedWhiskey: prevState.selectedWhiskey,
			sorted: sorted,
			results: true,
		}));

		// console.log('new state is',this.state)
	};

	render() {
		// console.log('in app my props are', this.props);
		const displayResults = this.state.results;
		let results;
		if (displayResults) {
			results = <Results data={this.state.sorted} />;
		} else {
			results = <div></div>;
		}
		console.log();
		return (
			<div>
				<div className="application">
					<RatingModal
						selectedWhiskey={this.state.selectedWhiskey}
						ClearVote={this.ClearVote}
						SubmitVote={this.SubmitVote}
					/>
					{/* <div
						className="modal fade"
						id="rating-modal"
						data-bs-backdrop="static"
						data-bs-keyboard="false"
						tabIndex="-1"
						aria-labelledby="rating-modal-label"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="rating-modal-label">
										Rate Whiskey #{this.state.selectedWhiskey}
									</h5>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
									></button>
								</div>
								<div className="modal-body">
									<Vote
										key={this.state.selectedWhiskey}
										data={this.state.selectedWhiskey}
										clear={this.ClearVote}
										SubmitVote={this.SubmitVote}
										placeholderName={'Your Name (optional)'}
										placeholderNotes={'Notes (Optional)'}
									/>
								</div>
							</div>
						</div>
					</div> */}
					<div
						className={`whiskey-list f-1 ${
							this.props.VotingOpen ? 'invisible' : ''
						}`}
					>
						<div className="header">Whiskeys</div>
						<div className="create-new">
							<div className="form-container">
								<Form
									handlesubmitfromApp={this.handleSubmitWhiskey}
									placeholderText={'What did you bring?'}
								/>
							</div>
							<button form="new-whiskey-form">Add Whiskey</button>
						</div>
						<WhiskeyList
							listItems={this.state.listItems}
							handleRatefromApp={this.handleRatefromApp}
							selectedWhiskey={this.state.selectedWhiskey}
						/>
						<button
							id="ShowResultsButton"
							className={this.props.VotingOpen ? 'invisible' : ''}
							onClick={this.SortAndDisplayResults}
						>
							Show Results
						</button>
					</div>
					<div
						className={`vote-section f-1 ${
							this.props.VotingOpen ? 'invisible' : ''
						}`}
					>
						<div className="header">Voting Results</div>
						<div>{results}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
