import React from 'react';
import { NavLink } from 'react-router-dom';
import noPic from './noPic.png'

class Login2 extends React.Component {
	storedProfile = JSON.parse(sessionStorage.getItem('profile'))
	state = {
		GivenName: '',
		GivenEmail: '',
        LoggedIn:false
	};

	componentDidMount (){
		if (this.storedProfile){
		this.setState((prevState) => ({
			GivenEmail: this.storedProfile.email,
			GivenName:this.storedProfile.name,
            LoggedIn:true
		}));
	}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// console.log('in submit this is state',this.state)
		const ProfileObject={
            name:this.state.GivenName,
            email:this.state.GivenEmail,
            picture:noPic,
        }
        if (this.state.NameBool===this.state.EmailBool && this.state.NameBool===true){
            sessionStorage.setItem('profile',JSON.stringify(ProfileObject))
            let msg="Thank you for Logging in "+this.state.GivenName;
            console.log(msg)
            alert (msg)
            this.setState((prevState) => ({
                GivenEmail:prevState.GivenEmail,
                GivenName:prevState.GivenName,
                LoggedIn:true,
            }));
        }
        else {
            alert ("Give a name and E-mail address")
        }
	};

	handleName = (e) => {
		this.setState(
			(prevState) => ({
				GivenName: e.target.value,
				GivenEmail: prevState.GivenEmail,
                NameBool:true,
                EmailBool:prevState.EmailBool,
			}),
			() => {
				// console.log("this is state", this.state);
			}
		);
	};
	handleEmail = (e) =>{
		// console.log('in number e is ',e)
		this.setState(
			(prevState) => ({
				GivenName: prevState.GivenName,
				GivenEmail: e.target.value,
                NameBool:prevState.NameBool,
                EmailBool:true,
			}),
			() => {
				// callback
			}
		)
	}



	render() {
		if (!this.state.LoggedIn ) {
		return (
			<form id="new-whiskey-form" onSubmit={this.handleSubmit}>
				<div className="input-container">
					<div className="input-label">Your name</div>
					<input
						onChange={this.handleName}
						value={this.state.InputName}
						type="text"
						placeholder="Your Name?"
					/>
				</div>
				<div className="input-container">
					<div className="input-label">Your E-mail</div>
					<input
						onChange={this.handleEmail}
						value={this.state.InputEmail}
						type="text"
						placeholder="Your E-mail"
					/>
				</div>

				
				<button form="new-whiskey-form">Log In <span role='img' aria-label='whiskey'> 🥃 </span></button>
			</form>
		);
		} else {
			return (
            <div className="application">
                 <div className='whiskey-list f-1 '> 
                    <div className='header'> 
                        You have already Logged In Go &nbsp;
                        <NavLink
                            to="/Vote"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "white"
                                    : "white",
                            })}
                        >
                            <span role='img' aria-label='whiskey'> 🥃</span>Vote<span role='img' aria-label='whiskey'> 🥃 </span>
                        </NavLink>
                    </div>
                </div>
            </div>)
		}
	}
}

export default Login2;
