import React from 'react';
//import listItems from '../data/Data.js';
import Vote from './Vote.js';
import GetVotes from './GetVotes.js';
import { isEmpty } from '@firebase/util';


class RatingModal extends React.Component {



	render() {
		console.log('in Rating Modal my props are',this.props)
		let WhiskeyNum;
		let VoterIntro='These people have Voted for this Whiskey already:';
		let Voters=[];
		//let ExistingVote={};
		let VoterArray=[];
		let VoterList
		let votedBool=false;
		let votedNotes='You did not give notes'
		let votedValue=0;
		let storedProfile = JSON.parse(sessionStorage.getItem('profile'))
		// This is the code that checks if anyone has voted for the whiskey and tells you who voted for this whiskey. 
		// It also checks that if you voted for the whiskey and won't let you vote if you have alerady voted
		 if (this.props.selectedWhiskey !==  ''){
			console.log('I was given a selected Whiskey',this.props.selectedWhiskey)
			let WhiskeyKey=this.props.selectedWhiskey
			const Votes=GetVotes(WhiskeyKey);
			const VoteCount=Votes.length
			console.log('These are the votes I saw',Votes)
			console.log('I count ',VoteCount," votes again that's",Votes.length," Votes")
			//Pretty sure we don't need this block
			// let MyArr=Object.entries(this.props.whiskeyList)
			// for(let i=0;i<MyArr.length;i++){
			// 	if(WhiskeyKey===MyArr[i][1].key){
			// 		WhiskeyNum=MyArr[i][1].visibleName;
			// 	}
			// }
			for (let i=0;i<VoteCount;i++){
				console.log('found Votes')
				Voters.push(Votes[i].email)
				VoterArray.push(Votes[i].voter)
				if (Votes[i].email===storedProfile.email){
					console.log('this user has voted for this whiskey')
					votedBool=true;
					votedValue=Votes[i].vote;
					if (Votes[i].notes){
						votedNotes=Votes[i].notes
					}
				}
				VoterList = VoterArray.map(string => <li>{string}</li>);
				console.log('voters were ',Voters)
			}
			if (isEmpty(VoterArray)){
				VoterIntro="No one has voted for this whiskey yet"
			}
		 }
		return (
			<div
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
								Rate {WhiskeyNum}
							</h5>
							<button
								id="CloseVoteWindow"
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={this.props.ClearVote}
							></button>
						</div>
						<div className='modal-body'>
							{VoterIntro}
							{VoterList}
						</div>
						<div className="modal-body">
							{!votedBool ? 
							<Vote
								key={this.props.selectedWhiskey}
								WhiskeyKey={this.props.selectedWhiskey}
								clear={this.props.ClearVote}
								SubmitVote={this.props.SubmitVote}
								placeholderName={'Your Name (REQUIRED)'}
								placeholderNotes={'Notes (Optional)'}
								// modal={this.myModal}
							/>
							: <div>You have already Voted for this Whiskey
								<br></br>You gave it {votedValue} stars
								<br></br>{votedNotes}
								</div>}
						</div>

					</div>
				</div>
			</div>
		);
	}
}

export default RatingModal;
