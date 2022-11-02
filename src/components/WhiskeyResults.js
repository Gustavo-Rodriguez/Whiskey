import React from 'react';

class WhiskeyResults extends React.Component {
	state = {};
	details = (e) => {
		e.preventDefault();
		this.props.ShowDetails(this.props.result);
	};

	bgColor = Math.floor(this.props.result.VoteAverage);

	render() {
		// console.log('in whiskey results, props are',this.props)
		return (
			<tr>
				<td>{this.props.result.realWhiskey}</td>
				<td
					style={{
						color: this.bgColor === -1 ? 'white' : 'black',
						backgroundColor: `var(--color-${this.bgColor})`,
					}}
				>
					{this.bgColor === -1
						? 'N/A'
						: this.props.result.VoteAverage.toFixed(2)}
				</td>
				<td>
					<button
						onClick={this.bgColor === -1 ? null : this.details}
						disabled={this.bgColor === -1}
						data-bs-toggle="modal"
						data-bs-target="#detail-modal"
					>
						Details
					</button>
				</td>
			</tr>
		);
	}
}

export default WhiskeyResults;
