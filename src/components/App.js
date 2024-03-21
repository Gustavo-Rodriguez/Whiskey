import React from 'react';
import WhiskeyList from './WhiskeyList';
import RatingModal from './RatingModal';
import db from '../utils/firebase';
import { ref, set, onValue, update, push } from 'firebase/database';

class App extends React.Component {
	storedProfile = JSON.parse(sessionStorage.getItem('profile'))

	state = {
		WhiskeyList: this.props.WhiskeyList,
//		nextWhiskey: this.props.listItems.count + 1,
		selectedWhiskey: '',
		results: true,
		sorted: {},
	};

	componentDidMount() {
		console.log('inApp WhiskeyList is',this.props.WhiskeyList)
		const whiskeysRef = ref(db, 'Whiskeys/');
		let dbResults;
		onValue(whiskeysRef, (snapshot) => {
			dbResults = snapshot.val();
			if (dbResults !== undefined && dbResults !== null && this.storedProfile) {
				const WhiskeyArray=Object.entries(dbResults);
				let WhiskeyState={}
				for (let i=0; i<WhiskeyArray.length;i++)
				{
				  WhiskeyState[i]={}
				  // console.log('whiskeyArray of i',WhiskeyArray[i])
				  WhiskeyState[i].key=WhiskeyArray[i][0];
				  WhiskeyState[i].visibleName=WhiskeyArray[i][1].visibleName;
				  WhiskeyState[i].voteCount=WhiskeyArray[i][1].voteCount;
				}
				console.log('WhiskeyState=',WhiskeyState)
				this.setState(
				  (prevState) => ({
					WhiskeyList:WhiskeyState,
					selectedWhiskey: prevState.selectedWhiskey,
					nextWhiskey: dbResults.nextWhiskey,
					results: prevState.results,
					userName:this.storedProfile.name,
					userEmail:this.storedProfile.email
				}));

			}
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
	updateFirebasewithVote = (voteObject, position, Average) => {

		console.log('updating firebase with just VOTE, voteObject is ', voteObject)
		console.log('whiskey position is ',position )
		console.log('Whiskey Average is ',Average)

		let AvgRef = ref(db,"whiskeys/Whiskeys/"+position);
		let VoteRef= ref(db,"whiskeys/Whiskeys/"+position+"/votes")

		console.log('AvgRef is ',AvgRef)
		console.log('VoteRef is ',VoteRef)
		push(voteObject)
	}
	updateFirebasewithNewWhiskey = (NewWhiskey)=> {

	}
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

	handleSelectWhiskey = (Whiskey) => {
		console.log('Someone Clicked on it, position ', Whiskey);
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
		
		console.log('vote info',voteInfo);
		let newWhiskeys = this.state.listItems.Whiskeys;
		let position = voteInfo.WhiskeyNumber - 1;
		let voteObject = {
			vote: voteInfo.CurrentStar,
			voter: voteInfo.VoterName,
			email: voteInfo.VoterEmail,
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
				this.updateFirebasewithVote(voteObject,position, Average)
				// this.updateFirebasewithState(this.state);
			}
		);
	};


	render() {
		 console.log('inApp WhiskeyList in state is',this.state.WhiskeyList)
		 console.log('in App props is ',this.props)
		// let unsorted=this.state.WhiskeyList;
		// console.log('unsorted is ',unsorted)
		// 	const sorted = [...unsorted.Whiskeys].sort((a, b) =>
		// 				a.visibleName > b.visibleName ? 1 : -1
		// 			);
		return (
			<div>
				<div className="application">
					<RatingModal
						selectedWhiskey={this.state.selectedWhiskey}
						ClearVote={this.ClearVote}
						SubmitVote={this.SubmitVote}
						whiskeyList={this.state.WhiskeyList}
					/>
					<div
						className={`whiskey-list f-1 ${
							this.props.VotingOpen ?  '': 'invisible' 
						}`}
					>
						<div className="header">Whiskeys</div>
						<WhiskeyList

							WhiskeyList={this.state.WhiskeyList}
							handleRatefromApp={this.handleSelectWhiskey}
							selectedWhiskey={this.state.selectedWhiskey}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
