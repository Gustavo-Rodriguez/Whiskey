import React, { Component } from 'react';

class DetailModal extends Component {
	render() {
		const roundedRating = Number(this.props.Details.VoteAverage).toFixed(2);

		const baseWidth = 8;
		const maxVoteCount = this.props.Distribution.reduce((prev, curr) => {
			return Math.max(prev, curr);
		}, 0);
		const pcts = this.props.Distribution.reverse().map((d) => {
			if (maxVoteCount === 0) return 0;
			return (baseWidth + ((100 - baseWidth) * d) / maxVoteCount).toFixed(2);
		});

		const graphList = pcts.map((p, i) => {
			const votes = this.props.Distribution[i];
			return (
				<div className="graph-container">
					<div className="vote">
						<div className="vote-value">{5 - i}</div>
					</div>
					<div className="graph">
						<div
							className={`graph-bar ${votes === 0 ? '' : 'align-right'}`}
							style={{ width: `${p}%` }}
						>
							<div className="num-votes">{votes}</div>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div
				className="modal fade"
				id="detail-modal"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="detail-modal-label"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="detail-modal-label">
								Rating Details: {this.props.Details.visibleName}
								<br /> ({this.props.Details.realWhiskey})
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<p>Average rating: {roundedRating}</p>
							<p>Vote distribution:</p>
							<div className="vote-distribution">{graphList}</div>
							<table className="modalTable">
								{this.props.DetailHeader}
								<tbody>{this.props.DetailList}</tbody>
							</table>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DetailModal;
