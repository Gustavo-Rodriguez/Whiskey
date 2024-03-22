import React from 'react';

class Whiskey extends React.Component {
	state = {
		nameid: 'name' + this.props.mykey,
		voteid: 'vote' + this.props.mykey,
		hasVotes: false,
	};

	rateItem = (e) => {
		e.preventDefault();
		this.props.handleRateFromApp(this.props.Whiskey.key);
	};

	render() {
		let votenum = 0;
		if (this.props.Whiskey.voteCount) {
			votenum = this.props.Whiskey.voteCount;
		}
		// console.log('inside whiskey, props are',this.props)
		return (
			<div className="whiskey-item">
				
				<button
					onClick={this.rateItem}
					data-bs-toggle="modal"
					data-bs-target="#rating-modal"
				>
					Rate {this.props.Whiskey.visibleName} ({votenum}{' '}
					{votenum === 1 ? 'rating' : 'ratings'})
				</button>
			</div>
		);
	}
}

export default Whiskey;
