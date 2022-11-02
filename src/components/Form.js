import React from 'react';

class Form extends React.Component {
	state = {
		InputWhiskeyName: '',
		InputEmail: '',
		NameRun: false,
		EmailRun: false,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// console.log("this is handleSubmit and these are my props", this.props);
		if (
			this.state.NameRun === this.state.EmailRun &&
			this.state.NameRun === true
		) {
			this.props.handlesubmitfromApp(this.state);
			this.setState({
				InputWhiskeyName: '', // this clears the form
				InputEmail: '',
				NameRun: false,
				EmailRun: false,
			});
		}
	};

	handleName = (e) => {
		// console.log("this is handleName");
		this.setState(
			(prevState) => ({
				InputWhiskeyName: e.target.value,
				InputEmail: prevState.InputEmail,
				NameRun: true,
				EmailRun: prevState.EmailRun,
			}),
			() => {
				// console.log("this is state", this.state);
			}
		);
	};
	handleEmail = (e) => {
		// console.log("this is handleEmail");
		this.setState(
			(prevState) => ({
				InputWhiskeyName: prevState.InputWhiskeyName,
				InputEmail: e.target.value,
				NameRun: prevState.NameRun,
				EmailRun: true,
			}),
			() => {
				// console.log("this is state", this.state);
			}
		);
	};

	render() {
		return (
			<form id="new-whiskey-form" onSubmit={this.handleSubmit}>
				<div className="input-container">
					<div className="input-label">Whiskey Name</div>
					<input
						onChange={this.handleName}
						value={this.state.InputWhiskeyName}
						type="text"
						placeholder={this.props.placeholderText}
					/>
				</div>
				<div className="input-container">
					<div className="input-label">Your Name</div>
					<input
						onChange={this.handleEmail}
						value={this.state.InputEmail}
						type="text"
						placeholder="Your Name?"
					/>
				</div>
			</form>
		);
	}
}

export default Form;
