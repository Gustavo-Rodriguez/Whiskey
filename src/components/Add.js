import React from 'react';
import CheckAdmin from './CheckAdmin';
import Dropdown from "./Dropdown";


class AddWhiskey extends React.Component {
	storedProfile = JSON.parse(sessionStorage.getItem('profile'))
	state = {
		InputWhiskeyName: '',
		InputEmail: '',
		InputNumber:'-1',
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
		  ],
		AdminBool:false,
	};

	componentDidMount (){
		if (this.storedProfile){
			let AdminBool=CheckAdmin(this.storedProfile.email)
			this.setState((prevState) => ({
			InputWhiskeyName:prevState.InputWhiskeyName,
			InputEmail: this.storedProfile.email,
			InputName:this.storedProfile.name,
			InputNumber:prevState.InputNumber,
			InputType:prevState.InputType,
			NameRun:prevState.NameRun,
			NumberRun:prevState.NumberRun,
			options: prevState.options,
			AdminBool: AdminBool
		}));
		}
		
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// console.log('in submit this is state',this.state)
		if (
			this.state.NameRun === true &&
			this.state.NumberRun === true 

		) {
			this.props.handlesubmitfromApp(this.state);
			this.setState((prevState) => ({
				InputWhiskeyName:'',
				InputEmail: this.storedProfile.email,
				InputName:this.storedProfile.name,
				InputNumber:'-1',
				InputType:'',
				NameRun:false,
				NumberRun:false,
				options: prevState.options,
				AdminBool: prevState.AdminBool
			}));
		}
		else {
			document.getElementById('new-whiskey-form').style.color="red"
			console.log('You had a false')
		}
	};

	handleName = (e) => {
		this.setState(
			(prevState) => ({
				InputWhiskeyName: e.target.value,
				InputEmail: prevState.InputEmail,
				InputNumber: prevState.InputNumber,
				InputType:prevState.InputType,
				NameRun: true,
				NumberRun: prevState.NumberRun,
				AdminBool:prevState.AdminBool,
			}),
			() => {
				// console.log("this is state", this.state);
			}
		);
	};
	handleEmail=(e) => {
		this.setState(
			(prevState) => ({
				InputWhiskeyName:prevState.InputWhiskeyName,
				InputEmail: e.target.value,
				InputNumber:prevState.InputNumber,
				NameRun:prevState.NameRun,
				InputName:prevState.InputName,
				InputType:prevState.InputType,
				NumberRun:prevState.NumberRun,
				options: prevState.options,
				AdminBool:prevState.AdminBool
			})
		) 
	}
	handleContributor = (e) => {
		this.setState(
			(prevState) => ({
				InputWhiskeyName:prevState.InputWhiskeyName,
				InputEmail:prevState.InputEmail ,
				InputNumber:prevState.InputNumber,
				NameRun:prevState.NameRun,
				InputName:e.target.value,
				InputType:prevState.InputType,
				NumberRun:prevState.NumberRun,
				options: prevState.options,
				AdminBool:prevState.AdminBool
			})
		)
	}
	handleNumber = (e) =>{
		// console.log('in number e is ',e)
		this.setState(
			(prevState) => ({
				InputWhiskeyName: prevState.InputWhiskeyName,
				InputEmail: prevState.InputEmail,
				InputNumber: e.target.value,
				InputType:prevState.InputType,
				NameRun: prevState.NameRun,
				NumberRun: true,
				AdminBool:prevState.AdminBool,
			}),
			() => {
				// callback
			}
		)
	}
	handleType = (value) =>{
		this.setState(
			(prevState) => ({
				InputWhiskeyName: prevState.InputWhiskeyName,
				InputEmail: prevState.InputEmail,
				InputNumber: prevState.InputNumber,
				InputType:value.value,
				NameRun: prevState.NameRun,
				NumberRun: true,
				AdminBool:prevState.AdminBool
			}),
			() => {
				// callback
			}
		)
	}

	render() {
		if (this.storedProfile ) {
			let AdminBool=CheckAdmin(this.storedProfile.email)
		// console.log('in render adminbool is ',AdminBool,'the one from state is ',this.state.AdminBool)
		return (
			<form id="new-whiskey-form" onSubmit={this.handleSubmit}>
				<div className="input-container">
					<div className="input-label">What's on the Bottle</div>
					<input
						onChange={this.handleName}
						value={this.state.InputWhiskeyName}
						type="text"
						placeholder={this.props.placeholderText}
					/>
				</div>
				<div className="input-container">
					{AdminBool ? (
						<div className="input-label">Contributor Name</div>
						):(
						<div className="input-label">Your Name </div>
						) }
					{AdminBool ? (
							<input
								onChange={this.handleContributor}
								value={this.state.InputName}
								type="text"
								placeholder="Your Name?"
							/>
						)
						: (
							<input
								disabled="true"
								onChange={this.handleContributor}
								value={this.state.InputName}
								type="text"
								placeholder="Your Name?"
							/>
						)
					}
				</div>
				<div className="input-container">
				{AdminBool ? (
						<div className="input-label">Contributor Email</div>
						):(
						<div className="input-label">Your Email </div>
						) }
					{AdminBool ? (
							<input
								onChange={this.handleEmail}
								value={this.state.InputEmail}
								type="text"
								placeholder="Your Name?"
							/>
						)
						: (
							<input
								disabled="true"
								onChange={this.handleEmail}
								value={this.state.InputEmail}
								type="text"
								placeholder="Your Name?"
							/>
						)
					}			
				</div>
				<div className="input-container">
					{AdminBool ? (
						<div className='input-label'>Visible Number</div>
						) : (
						<div className='input-label'>Visible Number</div>
						) 
					}
					{AdminBool ? (
						<input 
							onChange={this.handleNumber}
							value={this.state.InputNumber}
							type='text'
							placeholder="Visible Number"
						/>
						) : (
							<input 
							onChange={this.handleNumber}
							disabled="true"
							value={this.state.InputNumber}
							type='text'
							placeholder="Party Host will give you a Number"
							/>
						)}
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
