import React from "react"
import { Route, Routes } from "react-router-dom"

import App from "./App"
import Admin from "./Admin"
import Results from "./Results"
import listItems from '../data/Data';
import AddWhiskey from "./Add";
import Login from "./Login";
import Privacy from "./PrivacyPolicy"
import NavBar from "./NavBar";
import { push, ref, set, onValue, getDatabase } from 'firebase/database';
import db from '../utils/firebase';


class Main extends React.Component {
	state = {
		WhiskeyList: {}
	};


  storedProfile = JSON.parse(sessionStorage.getItem('profile'))
  componentDidMount() {
		const whiskeysRef = ref(db, 'Whiskeys/');
		let dbResults
    let adminbool
    let votebool
		onValue(whiskeysRef, (snapshot) => {
			dbResults = snapshot.val();
      console.log('dbResults is ',dbResults)
      //Check for User First
      let storedProfile = JSON.parse(sessionStorage.getItem('profile'))
      console.log('checking for user')
      if (storedProfile){
      //User Found Now Check for Whiskey
        if (dbResults !== undefined && dbResults !== null)
        {
          console.log('user is ',storedProfile.email)
          const WhiskeyArray=Object.entries(dbResults);
          let WhiskeyState={}
          for (let i=0; i<WhiskeyArray.length;i++)
          {
            WhiskeyState[i]={}
            // console.log('whiskeyArray of i',WhiskeyArray[i])
            WhiskeyState[i].key=WhiskeyArray[i][0];
            WhiskeyState[i].visibleName=WhiskeyArray[i][1].visibleName;
            WhiskeyState[i].voteCount=WhiskeyArray[i][1].voteCount;
          }
          console.log('WhiskeyState=',WhiskeyState)
          this.setState(
            (prevState) => ({
            WhiskeyList:WhiskeyState
          }));
        }
        else {
          console.log('We didnt find whiskey')
        }
      } else {
        console.log('user not found')
      }
		});
    // console.log('in main, in ComponentDidMount state is',this.state)
	}

  handleSubmitWhiskey = (Info) => {
    console.log('in main, I was given this when submitting a new whiskey',Info)
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
        this.updateFirebasewithNewWhiskey(NewWhiskey)
        alert (alertText)
        // this.updateFirebasewithState(this.state)
  };
  updateFirebasewithState = (param) => {
		// console.log('in updateFirebase this is my param', param);
		set(ref(db, 'whiskeys/'), {
			nextWhiskey: param.nextWhiskey,
			Whiskeys: param.listItems.Whiskeys,
		}).catch((error) => {
			// The write failed...
			alert('Something went wrong');
		});
	};
  updateFirebasewithNewWhiskey = (Whiskey) => {
    const db = getDatabase();
    const WhiskeyRef = ref(db, '/Whiskeys/');
    const whiskeyloc= push(WhiskeyRef,Whiskey);
  }
  changeLogin = (param) => {
    console.log("I should be changing login state ",param)
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
    }));
    console.log('login (count) is', this.state.login)
  }


  render(){

   


  return (  
    <div>
      <NavBar user={this.storedProfile} />
      <Routes>
          <Route path="/Vote" element={<App WhiskeyList={this.state.WhiskeyList} title={'WHISKEY PARTY APP'} VotingOpen={true}/> }  />
          <Route path="/Add" element={<AddWhiskey handlesubmitfromApp={this.handleSubmitWhiskey} placeholderText={'Whiskey?'}/>} />
          <Route path="/Admin" element={<Admin ></Admin>} />
          <Route path="/Results" element={<Results WhiskeyList={this.state.WhiskeyList} />} />
          <Route path="/Login" element={<Login  refresh={this.changeLogin} />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/" element={<Login  refresh={this.changeLogin} />} />
      </Routes>
    </div>
  )
  }
}

export default Main;