import React from 'react';
import Dropdown from "./Dropdown";


class AddWhiskey extends React.Component {
	storedProfile = JSON.parse(sessionStorage.getItem('profile'))
	state = {
		InputWhiskeyName: '',
		InputEmail: '',
		InputNumber:'',
		InputType:'',
		NameRun: false,
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

	componentDidMount (){
		if (this.storedProfile){
		this.setState((prevState) => ({
			InputWhiskeyName:prevState.InputWhiskeyName,
			InputEmail: this.storedProfile.email,
			InputName:this.storedProfile.name,
			InputNumber:prevState.InputNumber,
			InputType:prevState.InputType,
			NameRun:prevState.NameRun,
			NumberRun:prevState.NumberRun,
			options: prevState.options
		}));
	}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('in submit this is state',this.state)
		if (
			this.state.NameRun === true &&
			this.state.NumberRun === true 

		) {
			this.props.handlesubmitfromApp(this.state);
			this.setState((prevState) => ({
				InputWhiskeyName:'',
				InputEmail: this.storedProfile.email,
				InputName:this.storedProfile.name,
				InputNumber:'',
				InputType:'',
				NameRun:false,
				NumberRun:false,
				options: prevState.options
			}));
		}
		else {
			document.getElementById('new-whiskey-form').style.color="red"
			console.log('You had a false')
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
				NumberRun: prevState.NumberRun,
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
				NumberRun: true
			}),
			() => {
				// callback
			}
		)

		
	}



	render() {
		// console.log('in Form state is ',this.state)
		if (this.storedProfile ) {
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
					<div className="input-label">Your name</div>
					<input
						disabled="true"
						onChange={this.handleEmail}
						value={this.state.InputName}
						type="text"
						placeholder="Your Name?"
					/>
				</div>
				<div className="input-container">
					<div className="input-label">Your E-mail</div>
					<input
						disabled="true"
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
		} else {
			return <div className="application"> <div className='whiskey-list f-1 '> <div className='eader'> You must login to add a whiskey </div></div></div>;
		}
	}
}

export default AddWhiskey;
