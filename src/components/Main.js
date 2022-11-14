import React from "react"
import { Route, Routes } from "react-router-dom"

import App from "./App"
import Results from "./Results"
import listItems from '../data/Data';
import Admin from "./Admin";
import { ref, set, onValue } from 'firebase/database';
import db from '../utils/firebase';

class Main extends React.Component {
  state = {
    listItems:listItems,
		nextWhiskey: listItems.count + 1,
		selectedWhiskey: '',
		results: true,
		sorted: {},
	};

  componentDidMount() {
		const whiskeysRef = ref(db, 'whiskeys/');
		let dbResults;
		onValue(whiskeysRef, (snapshot) => {
			dbResults = snapshot.val();
      // console.log('dbResults is ',dbResults.Whiskeys)
			if (dbResults.Whiskeys !== undefined)
      {
        // console.log('we found whiskey')
      		this.setState((prevState) => ({
					listItems: {
						owner: 'Gustavo',
						count: prevState.listItems.count + 1,
						Whiskeys: dbResults.Whiskeys,
					},
					selectedWhiskey: prevState.selectedWhiskey,
					nextWhiskey: dbResults.nextWhiskey,
					results: prevState.results,
				}));
      }
      else {
        // console.log('in the else of componentdidmount in main')
        this.setState((prevState) => ({
          listItems:listItems,
          nextWhiskey:listItems.count+1,
          selectedWhiskey:'',
          results: true,
          sorted: {},
        }))
      }
		});
    // console.log('in main, in ComponentDidMount state is',this.state)
	}

  handleSubmitWhiskey = (Info) => {
    // console.log('in main, I was given',Info)
    this.setState(
      (prevState) => ({
        listItems: {
          owner: 'Gustavo',
          count: prevState.listItems.count + 1,
          Whiskeys: [
            ...prevState.listItems.Whiskeys,
            {
              VoteAverage: -1,
              visibleName: 'Whiskey ' + Info.InputNumber,
              realWhiskey: Info.InputWhiskeyName,
              hiddenEmail: Info.InputEmail,
              votes: [],
            },
          ],
        },
        selectedWhiskey: prevState.selectedWhiskey,
        nextWhiskey: prevState.nextWhiskey + 1,
        results: false,
      }),
      () => {
        let alertText="Your Whiskey is Whiskey "+Info.InputNumber;
        this.updateFirebasewithState(this.state);
        alert(alertText)
      }
    );
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



  render(){

   


  return (  
    <div>
      <Routes>
          <Route path="/" element={<App title={'WHISKEY PARTY APP'} listItems={this.state.listItems} VotingOpen={true}/> }  />
          <Route path="/Admin" element={<Admin handlesubmitfromApp={this.handleSubmitWhiskey} placeholderText={'Whiskey?'}/>} />
          <Route path="/Winner" element={<Results data={this.state.listItems.Whiskeys} />} />
      </Routes>
    </div>
  )
  }
}

export default Main;