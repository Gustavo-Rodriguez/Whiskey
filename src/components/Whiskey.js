import React from 'react';

class Whiskey extends React.Component {
	state = {
		nameid: 'name' + this.props.mykey,
		voteid: 'vote' + this.props.mykey,
		hasVotes: false,
	};

	rateItem = (e) => {
		e.preventDefault();
		this.props.handleRateFromApp(this.props.mykey);
	};

	render() {
		let votenum = 0;
		if (this.props.todo.votes) {
			votenum = this.props.todo.votes.length;
		}
		// console.log('inside whiskey')
		return (
			<div className="whiskey-item">
				
				<button
					onClick={this.rateItem}
					data-bs-toggle="modal"
					data-bs-target="#rating-modal"
				>
					Rate {this.props.todo.visibleName} ({votenum}{' '}
					{votenum === 1 ? 'rating' : 'ratings'})
				</button>
				{/* </span>
        </span> */}
			</div>
		);
	}
}

export default Whiskey;
