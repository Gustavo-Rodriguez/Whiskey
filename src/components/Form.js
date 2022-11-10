import React from 'react';

class Form extends React.Component {
	state = {
		InputWhiskeyName: '',
		InputEmail: '',
		InputNumber:'',
		NameRun: false,
		EmailRun: false,
		NumberRun: false,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (
			this.state.NameRun === this.state.EmailRun &&
			this.state.NameRun === true &&
			this.state.NumberRun === true 

		) {
			this.props.handlesubmitfromApp(this.state);
			this.setState({
				InputWhiskeyName: '',
				InputEmail: '',
				InputNumber:'',
				NameRun: false,
				EmailRun: false,
				NumberRun: false,
			});
		}
		else {
			document.getElementById('new-whiskey-form').style.color="red"
		}
	};

	handleName = (e) => {
		// console.log("this is handleName");
		this.setState(
			(prevState) => ({
				InputWhiskeyName: e.target.value,
				InputEmail: prevState.InputEmail,
				InputNumber: prevState.InputNumber,
				NameRun: true,
				EmailRun: prevState.EmailRun,
				NumberRun: prevState.NumberRun,
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
				InputNumber: prevState.InputNumber,
				NameRun: prevState.NameRun,
				EmailRun: true,
				NumberRun: prevState.NumberRun
			}),
			() => {
				// console.log("this is state", this.state);
			}
		);
	};
	handleNumber = (e) =>{
		this.setState(
			(prevState) => ({
				InputWhiskeyName: prevState.InputWhiskeyName,
				InputEmail: prevState.InputEmail,
				InputNumber: e.target.value,
				NameRun: prevState.NameRun,
				EmailRun: prevState.EmailRun,
				NumberRun: true
			}),
			() => {
				// callback
			}
		)
	}

	render() {
		// console.log('in Form state is ',this.state)
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
				<div className="input-container">
					<div className='input-label'>Visible Number</div>
					<input 
						onChange={this.handleNumber}
						value={this.state.InputNumber}
						type='text'
						placeholder="Whiskey Number"
						/>
				</div>
				<button form="new-whiskey-form">Add Whiskey</button>
			</form>
		);
	}
}

export default Form;
