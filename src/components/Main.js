import React from "react"
import { Route, Routes } from "react-router-dom"

import App from "./App"
import Results from "./Results"
import listItems, {ExistingResults} from '../data/Data';
 

class Main extends React.Component {
  state = {
		data: ExistingResults,
    listItems:listItems
	};




  render(){

  return (  
    <div>
      <Routes>
          <Route path="/" element={<App title={'WHISKEY PARTY APP'} listItems={this.state.listItems} VotingOpen={true}/> }  />
          <Route path="/Winner" element={<Results data={this.state.listItems.Whiskeys} />} />
      </Routes>
    </div>
  )
  }
}

export default Main;