import React from "react"
import { Route, Routes } from "react-router-dom"

import App from "./App"
import Admin from "./Admin"
import Results from "./Results"
import Login2 from "./Login2"
import AddWhiskey from "./Add";
import Login from "./Login";
import Privacy from "./PrivacyPolicy"
import NavBar from "./NavBar";
import { push, ref, getDatabase } from 'firebase/database';
import db from '../utils/firebase';
import GetValidWhiskeys from "./GetValidWhiskeys"


class Main extends React.Component {
	state = {
		WhiskeyList: {}
	};

  
  storedProfile = JSON.parse(sessionStorage.getItem('profile'))
  componentDidMount() {
		const whiskeysRef = ref(db, 'Whiskeys/');
		console.log('in main props are ',this.props)
		console.log('in main State is ',this.state)
		const WhiskeyState=GetValidWhiskeys(whiskeysRef)
    this.setState({
      WhiskeyList:WhiskeyState
    })
    console.log('in main WhiskeyState was just created as ',WhiskeyState)
    console.log('in main, in ComponentDidMount state is',this.state)
	}

  handleSubmitWhiskey = (Info) => {
    // console.log('in main, I was given this when submitting a new whiskey',Info)
    const NewWhiskey= {
      VoteAverage: -1,
      visibleName: 'Whiskey ' + Info.InputNumber,
      realWhiskey: Info.InputWhiskeyName,
      WhiskeyOwner:Info.InputName,
      OwnerEmail: Info.InputEmail,
      WhiskeyType: Info.InputType,
      voteCount:0,
      votes: []
    }
        let alertText="Your Whiskey is Whiskey "+Info.InputNumber;
        if (Info.InputNumber==='-1'){
          alertText='Party Host will give you a number, now go vote'
        }
        this.updateFirebasewithNewWhiskey(NewWhiskey)
        alert (alertText)
  };
  updateFirebasewithNewWhiskey = (Whiskey) => {
    const db = getDatabase();
    const WhiskeyRef = ref(db, '/Whiskeys/');
    push(WhiskeyRef,Whiskey);
  }
  changeLogin = (param) => {
    // console.log("I should be changing login state ",param)
    this.setState(
      (prevState) => ({
      userName:prevState.userName,
      userEmail:prevState.userEmail,
      listItems:prevState.listItems,
      nextWhiskey: prevState.nextWhiskey,
      selectedWhiskey: prevState.selectedWhiskey,
      results: prevState.results,
      login: prevState.login+1,
      sorted:prevState.sorted,
      WhiskeyList:prevState.WhiskeyList
    }));
    // console.log('login (count) is', this.state.login)
  }


  render(){

   
    console.log('in main Render, state is',this.state)

  return (  
    <div>
      <NavBar user={this.storedProfile} />
      <Routes>
          {/* Removing this route to see if you need WhiskeyList in App */}
          <Route path="/Vote" element={<App WhiskeyList={this.state.WhiskeyList} title={'WHISKEY PARTY APP'} VotingOpen={true}/> }  />
          {/* <Route path="/Vote" element={<App title={'WHISKEY PARTY APP'} VotingOpen={true}/> }  /> */}
          <Route path="/Add" element={<AddWhiskey handlesubmitfromApp={this.handleSubmitWhiskey} placeholderText={'Whiskey?'}/>} />
          <Route path="/Admin" element={<Admin ></Admin>} />
          <Route path="/Results" element={<Results WhiskeyList={this.state.WhiskeyList} />} />
          <Route path="/Login" element={<Login  refresh={this.changeLogin} />} />
          <Route path="/Login2" element={<Login2 />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/" element={<Login  refresh={this.changeLogin} />} />
      </Routes>
    </div>
  )
  }
}

export default Main;