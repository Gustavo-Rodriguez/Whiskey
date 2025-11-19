import React from 'react';
class AdminResults extends React.Component {
	state = {
		WhiskeyOwner:this.props.result.WhiskeyOwner,
		key:this.props.result.key,
		WhiskeyType:this.props.result.WhiskeyType,
		visibleName:this.props.result.visibleName,
		InputNumber:''
	};
	
	handleNumber = (e) =>{
		// console.log('in number e is ',e)
		this.setState(
			(prevState) => ({
				WhiskeyOwner:prevState.WhiskeyOwner,
				key:prevState.key,
				WhiskeyType:prevState.WhiskeyType,
				visibleName:prevState.visibleName,
				InputNumber: e.target.value,
			}),
			() => {
				// callback
				// console.log('edited State, state is now',this.state)
				// console.log('my props are',this.props)
			}
		)
	}
	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.InputNumber){
			this.props.updateNumber(this.state.key,this.state.InputNumber,this.state.WhiskeyOwner)
		}
	}


	render() {
		// console.log('in Admin results, props are',this.props)
		let DisplayNumber
		let FormNumber
		let ButtonText='Change Number'
		if (this.state.visibleName==="Whiskey -1"){
			DisplayNumber='NO Previous Number'
			FormNumber=''
			ButtonText='Set Number'
		}
		else {
			DisplayNumber=this.state.visibleName
			FormNumber=this.state.visibleName.slice(8)
		}
		return (
			
			<tr>
				
					<td>{this.state.WhiskeyOwner}</td>
					<td>{DisplayNumber}</td>
					<td>{this.state.WhiskeyType}</td>
					<td>
					<input 
						onChange={this.handleNumber}
						value={this.state.InputNumber}
						type='text'
						placeholder={FormNumber}
					/>
					</td>
					<td>
						<form id={this.state.key} onSubmit={this.handleSubmit}>
							<button form={this.state.key}>{ButtonText} </button>
						</form>
					</td>
			</tr>
		);
	}
}

export default AdminResults;
