import React from 'react';
import listItems from '../data/Data.js';
import Vote from './Vote.js';


class RatingModal extends React.Component {
	render() {
		console.log('in Rating Modal my props are',this.props)
		let WhiskeyNum;
		let votes;
		let VoterIntro='These people have Voted for this Whiskey already:';
		let Voters=[];
		let VoterList;
		if (this.props.selectedWhiskey !== '' ){
			WhiskeyNum=this.props.whiskeyList[this.props.selectedWhiskey-1].visibleName
			console.log('whiskeynum',WhiskeyNum)
			votes=this.props.whiskeyList[this.props.selectedWhiskey-1].votes
			console.log('votes',votes)
			console.log('votes.length',votes.length)
			for (let i=0;i<votes.length;i++)
			{
				console.log('in loop votes',votes[i])
				Voters.push(votes[i].voter);
			}
			console.log('Voters',Voters)
			VoterList = Voters.map(string => <li>{string}</li>);
			console.log('listItems',VoterList)
		} 
		else 
		{ WhiskeyNum=-1;}
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
						<div className="modal-body">
							<Vote
								key={this.props.selectedWhiskey}
								data={this.props.selectedWhiskey}
								clear={this.props.ClearVote}
								SubmitVote={this.props.SubmitVote}
								placeholderName={'Your Name (REQUIRED)'}
								placeholderNotes={'Notes (Optional)'}
								// modal={this.myModal}
							/>
						</div>
						<div className='modal-body'>
							{VoterIntro}
							{VoterList}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RatingModal;
