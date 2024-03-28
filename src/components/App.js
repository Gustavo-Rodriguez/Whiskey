import React from 'react';
import WhiskeyList from './WhiskeyList';
import RatingModal from './RatingModal';
import db from '../utils/firebase';
import { ref, update, push, getDatabase, increment} from 'firebase/database';
import GetVotes from "./GetVotes";
import GetValidWhiskeys from './GetValidWhiskeys';



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
		const whiskeysRef = ref(db, 'Whiskeys/');
		// let dbResults;
		console.log('inApp props are ',this.props)
		console.log('inApp State is ',this.state)
		console.log('inApp in componentDidMount this is',this)
		let WhiskeyPromise= GetValidWhiskeys(whiskeysRef)
		let WhiskeyState
		WhiskeyPromise.then(result => {
			WhiskeyState=result
			console.log('inApp Result is ',result)
			console.log('inApp in result function seting WhiskeyState to ',WhiskeyState)
			console.log('inApp in result function this is',this)
			// This needs to be commented out becouse I get an error because it can't find setState
			// Resolved error by using arrowfunctinos in the then
			this.setState((prevState) => ({
				WhiskeyList:WhiskeyState,
				selectedWhiskey:prevState.selectedWhiskey,
				results:true,
			}))
			
		}) 
	}

	updateFirebasewithVote = (voteObject, position, Average) => {
		console.log('in UpdateFirebasewithVote these are paramaters, vote Object',voteObject,'Position: ',position,' Average: ',Average)
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
		console.log('Someone Clicked on it, position ', Whiskey);
		this.setState((prevState) => ({
			selectedWhiskey: Whiskey,
			WhiskeyList:prevState.WhiskeyList,
			listItems: prevState.listItems,
			// nextWhiskey: prevState.nextWhiskey,
			results: true,
		}));
	};
	ClearVote = (e) => {
		this.setState((prevState) => ({
			selectedWhiskey: '',
			listItems: prevState.listItems,
			WhiskeyList:prevState.WhiskeyList,
			// nextWhiskey: prevState.nextWhiskey,
			results: true,
		}));
	};
	SubmitVote =  (voteInfo) => {
		let VoteArray=[];
		console.log('vote info',voteInfo);
		VoteArray= GetVotes(voteInfo.WhiskeyNumber)
		console.log('VoteArray',VoteArray)
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
			console.log('existing Votes were found')
		} else {
			VoteArray=voteObject;
			console.log('first vote',)
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
		console.log('Gonna feed this to whiskeyList,',this.state.WhiskeyList)
		console.log('in Render of App state is ',this.state)
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
							this.state.results ?  '': 'invisible' 
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
