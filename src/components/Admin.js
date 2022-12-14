import React from 'react';
import Dropdown from "./Dropdown";


class Admin extends React.Component {
	state = {
		InputWhiskeyName: '',
		InputEmail: '',
		InputNumber:'',
		InputType:'',
		NameRun: false,
		EmailRun: false,
		NumberRun: false,
		options: [
			{ value: "Bourbon", label: "Bourbon" },
			{ value: "Scotch", label: "Scotch" },
			{ value: "Canadian", label: "Canadian" },
			{ value: "Rye", label: "Rye" },
			{ value: "Irish", label: "Irish" },
			{ value: "American", label: "American" },
			{ value: "Japanese", label: "Japanese" },
			{ value: "Other", label: "Other" }
		  ]
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
				InputType:prevState.InputType,
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
				InputType:prevState.InputType,
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
		// console.log('in number e is ',e)
		this.setState(
			(prevState) => ({
				InputWhiskeyName: prevState.InputWhiskeyName,
				InputEmail: prevState.InputEmail,
				InputNumber: e.target.value,
				InputType:prevState.InputType,
				NameRun: prevState.NameRun,
				EmailRun: prevState.EmailRun,
				NumberRun: true
			}),
			() => {
				// callback
			}
		)
	}
	handleType = (value) =>{
		console.log('inside Handle Type value is',value)
		this.setState(
			(prevState) => ({
				InputWhiskeyName: prevState.InputWhiskeyName,
				InputEmail: prevState.InputEmail,
				InputNumber: prevState.InputNumber,
				InputType:value.value,
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
						placeholder="Visible Number"
						/>
				</div>
				<div className="input-container">
					<div className='input-label'>Whiskey Type (OPTIONAL)</div>
					<Dropdown
						isSearchable
						placeHolder="Select Whiskey Type"
						options={this.state.options}
						onChange={this.handleType}
    				/>
				</div>
				
				<button form="new-whiskey-form">Add Whiskey</button>
			</form>
		);
	}
}

export default Admin;
