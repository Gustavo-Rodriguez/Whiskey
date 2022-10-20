import React from "react";
import Form from "./Form";
import WhiskeyList from "./WhiskeyList";
import Vote from "./Vote.js";
import Results from "./Results.js"

class App extends React.Component {
  state = {
    listItems: this.props.listItems,
    nextWhiskey: this.props.listItems.count+1,
    selectedWhiskey:"",
    results:false
  };

  handleSubmitWhiskey = Info => {
     this.setState(
      prevState => ({
        listItems :{
          owner:"Gustavo",
          count:prevState.listItems.count+1,
          Whiskeys:[...prevState.listItems.Whiskeys , 
            {
              VoteAverage:-1,
              visibleName:"Whiskey "+prevState.nextWhiskey,
              realWhiskey:Info.InputWhiskeyName,
              hiddenEmail:Info.InputEmail,
              votes:[]
            }
        ]
        },
        selectedWhiskey:prevState.selectedWhiskey,
        nextWhiskey: prevState.nextWhiskey+1,
        results:false
      }),
      () => {
        // console.log("handleSubmit from the App", this.listItems);
      }
    );
  };

  handleRatefromApp = Whiskey => {
    // console.log('Someone Clicked on it, position ',Whiskey)
    this.setState(
      prevState => ({
        selectedWhiskey: Whiskey+1,
        listItems:prevState.listItems,
        nextWhiskey:prevState.nextWhiskey,
        results:false
      })
    )
    // console.log('updatedState in handleratefromapp',this.state)
  }

  ClearVote = e => {
    this.setState(
      prevState=> ({
        selectedWhiskey:'',
        listItems:prevState.listItems,
        nextWhiskey:prevState.nextWhiskey,
        results:false
      })
    )
  }
  SubmitVote = voteInfo => {
    
    let newWhiskeys=this.state.listItems.Whiskeys;
    let position=voteInfo.WhiskeyNumber-1;
    let voteObject={
      vote:voteInfo.CurrentStar,
      voter:voteInfo.voterName,
      notes:voteInfo.voterNotes
    }
    //Add Votes to Array
    newWhiskeys[position].votes.push(voteObject)
    // Add Calculate Average
    const Average=newWhiskeys[position].votes.reduce((total,next)=>Number(total)+Number(next.vote),0) / newWhiskeys[position].votes.length;
    newWhiskeys[position].VoteAverage=Average;
    this.setState(
      prevState => ({
        listItems: {
          owner: "Gustavo",
          count:prevState.listItems.count,
          Whiskeys:newWhiskeys
        },
        nextWhiskey:prevState.nextWhiskey,
        selectedWhiskey:prevState.selectedWhiskey,
        results:false
      })
    )
  }
  SortAndDisplayResults = e =>{
    // console.log('inside function')
    // console.log('my props are',this.props)
    // console.log('my state is',this.state)
    
    let WhiskeyCount=this.state.listItems.Whiskeys.length
    const sorted=[...this.state.listItems.Whiskeys].sort((a,b) => (a.VoteAverage < b.VoteAverage)? 1: -1)
    // console.log('I was ran, sorted is',sorted)
    this.setState(
      prevState => ({
        listItems: {
          owner: "Gustavo",
          count:prevState.listItems.count,
          Whiskeys:prevState.listItems.Whiskeys
        },
        nextWhiskey:prevState.nextWhiskey,
        selectedWhiskey:prevState.selectedWhiskey,
        sorted:sorted,
        results:true
      })
    )
    
    // console.log('new state is',this.state)
 }




  render() {
    // console.log('state',this.state)
    const displayResults = this.state.results;
    let results;
    if (displayResults){
      results=<div>'Results go here'</div>
      console.log('sorted results in log',this.state.sorted)
    }
    else {
      results=<div></div>
    }
    
    return (
      
      <div className="application">
        <div className="whiskey-list">
        <div className="header">
          <h1>Whiskeys</h1>
        </div>
        <div className="create-new">
          <Form
            handlesubmitfromApp={this.handleSubmitWhiskey}
            placeholderText={"Add A New Whiskey"}
          />
        </div>
        <WhiskeyList
          listItems={this.state.listItems}
          handleRatefromApp={this.handleRatefromApp}
          selectedWhiskey={this.state.selectedWhiskey}
        />
        <button onClick={this.SortAndDisplayResults}>Show Results</button>
        </div>
        <div className="vote-section">
          <Vote 
             key={this.state.selectedWhiskey}
             data={this.state.selectedWhiskey}
             clear={this.ClearVote}
             SubmitVote={this.SubmitVote}
             placeholderName={"Your Name (optional)"}
             placeholderNotes={"Notes (Optional)"}
          />
          
        </div>
      </div>
    
    )
    

    }
}

export default App;

