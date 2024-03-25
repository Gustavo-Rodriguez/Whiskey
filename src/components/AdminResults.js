import React from 'react';

class AdminResults extends React.Component {
	state = {};
	
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

	render() {
		console.log('in Admin results, props are',this.props)
		return (
			
			<tr>
					<td>{this.props.result.WhiskeyOwner}</td>
					<td>{this.props.result.visibleName}</td>
					<td>{this.props.result.WhiskeyType}</td>
					<td>
					<input 
						onChange={this.handleNumber}
						value={this.state.InputNumber}
						type='text'
						placeholder={this.props.result.visibleName.slice(8)}
					/>
					</td>
					<td>
						<button form="Change-whiskey-form">Change Number</button>
					</td>
			</tr>
		);
	}
}

export default AdminResults;
