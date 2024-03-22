import React from 'react';
import star from './unchecked.png';
import checked from './checked.png';
import db from '../utils/firebase';
import { ref, set, onValue, update, push } from 'firebase/database';

class Vote extends React.Component {
	storedProfile = JSON.parse(sessionStorage.getItem('profile'))
	state = {
		WhiskeyNumber: this.props.WhiskeyKey,
		CurrentStar: 0,
		VoterName: '',
		VoterEmail: '',
		VoterNotes: '',
		disableSubmit: true,
		VoterNameBool: false,
		VoterNotesBool: false,
		WhiskeyRef:''
	};

	storedProfile = JSON.parse(sessionStorage.getItem('profile'))


	ClearStars = () => {
		for (let index = 1; index < 6; index++) {
			let myId = "[id='" + index + "-Star']";
			let currentStarToChange = document.querySelector(myId);
			currentStarToChange.src = star;
		}
	};

	ChangeStars = (ClickedStar) => {
		// Start by clearing the stars
		this.ClearStars();

		//What star clicked on me
		let numberStar = ClickedStar.target.id.split('-', 1)[0];
		// Loop and check Our Star and previous stars
		for (let index = 1; index <= numberStar; index++) {
			let myId = "[id='" + index + "-Star']";
			let currentStarToChange = document.querySelector(myId);
			currentStarToChange.src = checked;
		}
		// update state
		this.setState((prevState) => ({
			WhiskeyNumber: prevState.WhiskeyNumber,
			CurrentStar: numberStar,
			VoterName: this.storedProfile.name,
			VoterEmail:this.storedProfile.email,
			VoterNotes: prevState.VoterNotes,
			disableSubmit: false,
		}));
	};
	HandleVote = (e) => {
		// e.preventDefault()
		// if (e.target.dataset.bsDismiss='modal')
		// {
		// 	console.log('modal should be set',e.target.dataset.bsDismiss)
		// 	e.target.dataset.bsDismiss='custom'
		// }
		// else
		 if (!this.state.disableSubmit && 
			this.storedProfile
			) 
			{
				// console.log('inside handleVote in Vote, state is',this.State)
				e.preventDefault();
				this.props.SubmitVote(this.state);
				this.props.clear();
				var closebutton = document.getElementById('CloseVoteWindow');
				closebutton.click();
				// console.log('inside handleVote this is e',e)
				// console.log('e.target.data',e.target.dataset)
				// e.target.dataset.bsDismiss='modal'
				// e.target.click();		
			}
		else if (!this.state.disableSubmit){
			document.getElementById('VoterNameLabel').style.color="red"
			alert('You must provide your name to vote')

		}
		else {
			alert ('you must rate the whiskey between 1 and 5 stars');
		}
	};
	handleName = (e) => {
		// console.log("this is handleName");
		this.setState(
			(prevState) => ({
				WhiskeyNumber: prevState.WhiskeyNumber,
				CurrentStar: prevState.CurrentStar,
				VoterName: e.target.value,
				VoterNotes: prevState.VoterNotes,
				VoterNameBool: true,
				VoterNotesBool: prevState.VoterNotesBool
			}),
			() => {}
		);
	};
	handleNotes = (e) => {
		this.setState(
			(prevState) => ({
				WhiskeyNumber: prevState.WhiskeyNumber,
				CurrentStar: prevState.CurrentStar,
				VoterName: prevState.VoterName,
				VoterNotes: e.target.value,
				VoterNameBool: prevState.VoterNameBool,
				VoterNotesBool: true
			}),
			() => {}
		);
	};
	ClearForm = (e) => {
		this.ClearStars();
		this.setState((prevState) => ({
			...prevState,
			CurrentStar: 0,
			VoterName: '',
			VoterNotes: '',
		}));
	};

	render() {
	    // console.log("inside Vote these are props ", this.props, "This is State", this.state)
		// if (this.state.WhiskeyNumber > 0 && this.storedProfile ) {
			if (this.storedProfile ) {
			return (
				<div className="f-1">
					<span id="display-vote">
						{this.state.CurrentStar}{' '}
						{this.state.CurrentStar === '1' ? 'Star' : 'Stars'}
					</span>
					<div className="vote-container">
						<img
							src={star}
							onClick={this.ChangeStars}
							alt="1-Star"
							id="1-Star"
						/>
						<img
							src={star}
							onClick={this.ChangeStars}
							alt="2-Star"
							id="2-Star"
						/>
						<img
							src={star}
							onClick={this.ChangeStars}
							alt="3-Star"
							id="3-Star"
						/>
						<img
							src={star}
							onClick={this.ChangeStars}
							alt="4-Star"
							id="4-Star"
						/>
						<img
							src={star}
							onClick={this.ChangeStars}
							alt="5-Star"
							id="5-Star"
						/>
					</div>
					<div className="input-container">
						<div className="input-label" id="VoterNameLabel">Voter Name: {this.storedProfile.name}</div>
					</div>
					<div className="input-container">
						<div className="input-label" id="VoterEmailLabel">Voter Email: {this.storedProfile.email}</div>
					</div>
					<div className="input-container">
						<div className="input-label">Notes (optional):</div>
						<textarea
							onChange={this.handleNotes}
							value={this.state.VoterNotes}
							placeholder={this.props.placeholderNotes}
						/>
					</div>
					<div className="button-container">
						<button
							className="btn btn-primary"
							onClick={this.HandleVote}
							data-bs-dismiss="customvalue"
							
						>
							Submit
						</button>
						<button className="btn btn-secondary" onClick={this.ClearForm}>
							Clear Form
						</button>
						<button className="btn btn-warning" data-bs-dismiss="modal">
							Cancel
						</button>
					</div>
				</div>
			);
		} else {
			return <div className="f-1"> You Must Login to Vote </div>;
		}
	}
}

export default Vote;
