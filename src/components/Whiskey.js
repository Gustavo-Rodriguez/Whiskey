import React from "react";

class Whiskey extends React.Component {
  state = {
    nameid: "name" + this.props.mykey,
    voteid: "vote" + this.props.mykey,
    hasVotes: false
  };

  rateItem = e => {
    e.preventDefault();
   this.props.handleRateFromApp(this.props.mykey);
  };


  render() {
    let votenum=0
    if (this.props.todo.votes){
      votenum=this.props.todo.votes.length
    }
    // console.log('inside whiskey')
    return (
      <div className="to-do-item">
        <span className="name">
          <span>
            <input id={this.state.nameid} value={this.props.todo.visibleName} disabled={true} />
          </span>
        </span>
        <span className="Vote">
          <span>
            
            
          </span>
        </span>
        <span className="actions">
          <span>
            <button onClick={this.rateItem}>Rate ({votenum})</button>
          </span>
        </span>
      </div>
    );
  }
}

export default Whiskey;
