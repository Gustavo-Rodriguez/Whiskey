import React from 'react';
import WhiskeyList from './WhiskeyList';
import RatingModal from './RatingModal';
import db from '../utils/firebase';
import { ref, onValue, update, push, getDatabase, increment} from 'firebase/database';
import GetVotes from "./GetVotes";


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
		// console.log('inApp WhiskeyList is',this.props.WhiskeyList)
		const whiskeysRef = ref(db, 'Whiskeys/');
		let dbResults;
		onValue(whiskeysRef, (snapshot) => {
			dbResults = snapshot.val();
			if (dbResults !== undefined && dbResults !== null && this.storedProfile) {
				const WhiskeyArray=Object.entries(dbResults);
				let WhiskeyState={}
				let WhiskeyStateI=0;
				for (let i=0; i<WhiskeyArray.length;i++)
				{
					console.log('I havent checked if Whiskey is Registered yet WhiskeyStateI=',WhiskeyStateI)
					if (WhiskeyArray[i][1].visibleName==='Whiskey -1'){
						console.log('UnRegistered Whiskey Found, not adding to List')
						console.log('WhiskeyStateI=',WhiskeyStateI)
					} else {
						console.log('registered whiskey found',WhiskeyArray[i][1])
						console.log('WhiskeyStateI=',WhiskeyStateI)
						WhiskeyState[WhiskeyStateI]={}
						WhiskeyState[WhiskeyStateI].key=WhiskeyArray[i][0];
						WhiskeyState[WhiskeyStateI].visibleName=WhiskeyArray[i][1].visibleName;
						WhiskeyState[WhiskeyStateI].voteCount=WhiskeyArray[i][1].voteCount;
						WhiskeyStateI= WhiskeyStateI+1;
					}
				}
				// console.log('WhiskeyState=',WhiskeyState)
				this.setState(
				  (prevState) => ({
					WhiskeyList:WhiskeyState,
					selectedWhiskey: prevState.selectedWhiskey,
					nextWhiskey: dbResults.nextWhiskey,
					results: prevState.results,
					userName:this.storedProfile.name,
					userEmail:this.storedProfile.email
				}))

			}
		});
	}
	updateFirebasewithVote = (voteObject, position, Average) => {
		let myRef = ref(db);
		let VoteRef= ref(db,"Whiskeys/"+position+"/Votes")
		push(VoteRef,voteObject)
		const updates={}
		updates["Whiskeys/"+position+"/VoteAverage"]=Average;
		updates["Whiskeys/"+position+"/voteCount"]=increment(1)
		update(myRef,updates);
	}
	updateFirebasewithNewWhiskey = (Whiskey) => {
		const db = getDatabase();
		const WhiskeyRef = ref(db, '/Whiskeys/');
		push(WhiskeyRef,Whiskey);
	  }
	handleSelectWhiskey = (Whiskey) => {
		// console.log('Someone Clicked on it, position ', Whiskey);
		this.setState((prevState) => ({
			selectedWhiskey: Whiskey,
			listItems: prevState.listItems,
			nextWhiskey: prevState.nextWhiskey,
			results: false,
		}));
	};
	ClearVote = (e) => {
		this.setState((prevState) => ({
			selectedWhiskey: '',
			listItems: prevState.listItems,
			nextWhiskey: prevState.nextWhiskey,
			results: false,
		}));
	};
	SubmitVote =  (voteInfo) => {
		let VoteArray=[];
		// console.log('vote info',voteInfo);
		VoteArray= GetVotes(voteInfo.WhiskeyNumber)
		let key = voteInfo.WhiskeyNumber;
		let voteObject = {
			vote: voteInfo.CurrentStar,
			voter: voteInfo.VoterName,
			email: voteInfo.VoterEmail,
			notes: voteInfo.VoterNotes,
		};
		//Add Votes to Array
		if (VoteArray) {
			VoteArray.push(voteObject);
		} else {
			VoteArray=voteObject;
		}
		let  NumericArray=[]
		VoteArray.forEach((element) => NumericArray.push(element.vote));
		// Add Calculate Average
		const Average =
			NumericArray.reduce(
				(total, next) => Number(total) + Number(next),
				0
			) / NumericArray.length;
		const VoteAverage = Average;
		this.updateFirebasewithVote(voteObject,key,VoteAverage);
	};


	render() {
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
