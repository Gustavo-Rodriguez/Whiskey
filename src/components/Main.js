import React from "react"
import { Route, Routes } from "react-router-dom"
// import {Switch } from "react-router"
import App from "./App"
import Results from "./Results"
import listItems, {ExistingResults} from '../data/Data';
import db from '../utils/firebase';
import { ref, onValue } from 'firebase/database';


class Main extends React.Component {
  state = {
		data: ExistingResults,
    listItems:listItems
	};

  // componentDidMount() {
	// 	const whiskeysRef = ref(db, 'whiskeys/');
	// 	console.log('in Mains Component did mount');
	// 	let dbResults;
	// 	onValue(whiskeysRef, (snapshot) => {
	// 		dbResults = snapshot.val();
	// 		if (dbResults !== null){
	// 			console.log('dbresults',dbResults)
  //       let unsorted=dbResults.Whiskeys
  //       console.log('unsorted is',unsorted)
	// 			const sorted = [unsorted].sort((a, b) =>
	// 				a.VoteAverage < b.VoteAverage ? 1 : -1
	// 			);
	// 			this.setState((prevState) => ({
	// 				data:sorted,
	// 			}));
	// 		}
	// 	});
		
	// }



  render(){
    console.log('inside Main')
    console.log('state in main is ',this.state)
    // const whiskeysRef = ref(db, 'whiskeys/');
    // let sorted;
		// let dbResults;
		// onValue(whiskeysRef, (snapshot) => {
		// 	dbResults = snapshot.val();
    //   console.log('inside onValue')
		// 	if (dbResults !== null){
		// 		console.log('dbresults',dbResults)
		// 		sorted = [dbResults.Whiskeys].sort((a, b) =>
		// 			a.VoteAverage < b.VoteAverage ? 1 : -1
		// 		);
		// 	}
		// });
    // console.log('sorted is',sorted)
  return (  
    <div>
      <Routes>
          <Route path="/" element={<App title={'WHISKEY PARTY APP'} listItems={this.state.listItems} VotingOpen={true}/> }  />
          {/* <Route path="/" element ={<App />} /> */}
          <Route path="/Winner" element={<Results data={this.state.listItems.Whiskeys} />} />
      </Routes>
    </div>
  )
  }
}

export default Main;