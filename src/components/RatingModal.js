import React from 'react';
//import listItems from '../data/Data.js';
import Vote from './Vote.js';


class RatingModal extends React.Component {



	render() {
		console.log('in Rating Modal my props are',this.props)
		let WhiskeyNum;
		let votes;
		let VoterIntro='These people have Voted for this Whiskey already:';
		let Voters=[];
		let VoterList;
		let votedBool=false;
		let votedNotes='You did not give notes'
		let votedValue=0;
		let storedProfile = JSON.parse(sessionStorage.getItem('profile'))
		// This is the code that checks if anyone has voted for the whiskey and tells you who voted for this whiskey. 
		// It also checks that if you voted for the whiskey and won't let you vote if you have alerady voted


		// if (this.props.selectedWhiskey !== '' && this.props.whiskeyList[this.props.selectedWhiskey-1].VoteAverage !== -1 ){
		// 	WhiskeyNum=this.props.whiskeyList[this.props.selectedWhiskey-1].visibleName
		// 	votes=this.props.whiskeyList[this.props.selectedWhiskey-1].votes
		// 	for (let i=0;i<votes.length;i++)
		// 	{
		// 		Voters.push(votes[i].voter);
		// 		if (!votedBool && storedProfile)
		// 		{
		// 			if(votes[i].email===storedProfile.email){
		// 					votedBool=true;
		// 					votedValue=votes[i].vote;
		// 					if (!votes[i].notes){
		// 					}else{
		// 						votedNotes=votes[i].notes
		// 					}
		// 				}
		// 		}
		// 	}
		// 	VoterList = Voters.map(string => <li>{string}</li>);
		// } 
		// else 
		// {
		// 	WhiskeyNum=-1;
		// 	VoterIntro="No one has Voted for this Whiskey Yet"
		// }
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
