import React from 'react';
import Vote from './Vote.js';
// import {Modal} from 'bootstrap';

class RatingModal extends React.Component {
	render() {
		// const myModal = new Modal(document.getElementById('rating-modal'));
		// console.log('Before trying to hide my modal',myModal)
		return (
			<div
				className="modal fade"
				id="rating-modal"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="rating-modal-label"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="rating-modal-label">
								Rate Whiskey #{this.props.selectedWhiskey}
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<Vote
								key={this.props.selectedWhiskey}
								data={this.props.selectedWhiskey}
								clear={this.props.ClearVote}
								SubmitVote={this.props.SubmitVote}
								placeholderName={'Your Name (REQUIRED)'}
								placeholderNotes={'Notes (Optional)'}
								modal={this.myModal}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RatingModal;
