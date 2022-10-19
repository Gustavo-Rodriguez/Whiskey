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
    //Add Votes to Array
    newWhiskeys[position].votes.push(voteInfo.CurrentStar)
    // Add Calculate Average
    const Average=newWhiskeys[position].votes.reduce((a,b)=>Number(a)+Number(b),0) / newWhiskeys[position].votes.length;
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
    //  console.log(this.state)
  }
  ShowResults = e => {
    this.setState(
      prevState=> ({
        selectedWhiskey:'',
        listItems:prevState.listItems,
        nextWhiskey:prevState.nextWhiskey,
        results:true
      })
    )
  }


  render() {
    // console.log('state',this.state)
    
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
        <button onClick={this.ShowResults}>Show Results</button>
        </div>
        <div className="vote-section">
          <Vote 
             key={this.state.selectedWhiskey}
             data={this.state.selectedWhiskey}
             clear={this.ClearVote}
             SubmitVote={this.SubmitVote}
          />
          <Results
              data={this.state.listItems.Whiskeys}
              run={this.state.results}
          />
        </div>
      </div>
    
    )
    

    }
}

export default App;

