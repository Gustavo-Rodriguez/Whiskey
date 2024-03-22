

import React from 'react';


class Admin extends React.Component {
	state = {
	};

	



	render() {
		// console.log('in Form state is ',this.state)
		return (
			<div className='application center-me'>
				<div className='header'>
					<h3>This is the admin Pannel, click <a href="https://console.firebase.google.com/u/0/project/whiskey-a2ed6/database/whiskey-a2ed6-default-rtdb/data">here</a> to get to the database</h3>
				</div>

			</div>
		);
	}
}

export default Admin;
