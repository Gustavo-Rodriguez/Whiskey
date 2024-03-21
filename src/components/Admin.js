

import React from 'react';
import Dropdown from "./Dropdown";


class Admin extends React.Component {
	state = {
	};

	



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
