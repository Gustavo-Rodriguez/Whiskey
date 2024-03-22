import React from 'react';
import WhiskeyList from './WhiskeyList';
import RatingModal from './RatingModal';
import db from '../utils/firebase';
import { ref, set, onValue, update, push, getDatabase, increment} from 'firebase/database';
import GetVotes from "./GetVotes";
import Vote from './Vote';

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
	// Nothing should call this
	// updateFirebasewithState = (param) => {
	// 	console.log('in updateFirebase in App this is my param', param);
	// 	set(ref(db, 'whiskeys/'), {
	// 		nextWhiskey: param.nextWhiskey,
	// 		Whiskeys: param.listItems.Whiskeys,
	// 	}).catch((error) => {
	// 		// The write failed...
	// 		alert('Something went wrong');
	// 	});
	// };
	updateFirebasewithVote = (voteObject, position, Average) => {
		
		console.log('updating firebase with just VOTE, voteObject is ', voteObject)
		console.log('whiskey Key is ',position )
		console.log('Whiskey Average is ',Average);
		// alert ('Check the log')
		let myRef = ref(db);
		let VoteRef= ref(db,"Whiskeys/"+position+"/Votes")

		push(VoteRef,voteObject)
		const updates={}
		updates["Whiskeys/"+position+"/VoteAverage"]=Average;
		updates["Whiskeys/"+position+"/voteCount"]=increment(1)
		update(myRef,updates);
		console.log('check log now, average should be ', Average)
	}
	updateFirebasewithNewWhiskey = (Whiskey) => {
		const db = getDatabase();
		const WhiskeyRef = ref(db, '/Whiskeys/');
		const whiskeyloc= push(WhiskeyRef,Whiskey);
	  }
	// Nothing should call this
	// handleSubmitWhiskey = (Info) => {
	// 	this.setState(
	// 		(prevState) => ({
	// 			listItems: {
	// 				owner: 'Gustavo',
	// 				count: prevState.listItems.count + 1,
	// 				Whiskeys: [
	// 					...prevState.listItems.Whiskeys,
	// 					{
	// 						VoteAverage: -1,
	// 						visibleName: 'Whiskey ' + prevState.nextWhiskey,
	// 						realWhiskey: Info.InputWhiskeyName,
	// 						hiddenEmail: Info.InputEmail,
	// 						votes: [],
	// 					},
	// 				],
	// 			},
	// 			selectedWhiskey: prevState.selectedWhiskey,
	// 			nextWhiskey: prevState.nextWhiskey + 1,
	// 			results: false,
	// 		}),
	// 		() => {
	// 			let alertText="Your Whiskey is Whiskey "+Number(this.state.nextWhiskey-1);
	// 			this.updateFirebasewithState(this.state);
	// 			alert(alertText)
	// 		}
	// 	);
	// };

	handleSelectWhiskey = (Whiskey) => {
		console.log('Someone Clicked on it, position ', Whiskey);
		this.setState((prevState) => ({
			selectedWhiskey: Whiskey,
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
	SubmitVote =  (voteInfo) => {
		let VoteArray=[];
		console.log('vote info',voteInfo);
		VoteArray= GetVotes(voteInfo.WhiskeyNumber)
		let key = voteInfo.WhiskeyNumber;
		let voteObject = {
			vote: voteInfo.CurrentStar,
			voter: voteInfo.VoterName,
			email: voteInfo.VoterEmail,
			notes: voteInfo.VoterNotes,
		};
		let voteArray = []
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
