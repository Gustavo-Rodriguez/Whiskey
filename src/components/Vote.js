import React from 'react';
import star from './unchecked.png';
import checked from './checked.png';
// import Whiskey from './Whiskey';

class Vote extends React.Component {
	state = {
		WhiskeyNumber: this.props.data,
		CurrentStar: 0,
		VoterName: '',
		VoterNotes: '',
		disableSubmit: true,
	};

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
			VoterName: prevState.VoterName,
			VoterNotes: prevState.VoterNotes,
			disableSubmit: false,
		}));
	};
	HandleVote = (e) => {
		if (!this.state.disableSubmit) {
			e.preventDefault();
			this.props.SubmitVote(this.state);
			this.props.clear();
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
		//    console.log("inside Vote these are props ", this.props, "This is State", this.state)
		if (this.state.WhiskeyNumber > 0) {
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
						<div className="input-label">Your name (optional):</div>
						<input
							onChange={this.handleName}
							value={this.state.VoterName}
							type="text"
							placeholder={this.props.placeholderName}
						/>
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
							data-bs-dismiss="modal"
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
			return <div className="f-1"> </div>;
		}
	}
}

export default Vote;
