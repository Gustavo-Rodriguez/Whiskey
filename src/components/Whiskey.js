import React from "react";

class Whiskey extends React.Component {
  state = {
    nameid: "name" + this.props.mykey,
    voteid: "vote" + this.props.mykey
  };

  rateItem = e => {
    e.preventDefault();
   this.props.handleRateFromApp(this.props.mykey);
  };

  render() {
    // console.log('inside todolistitem')
    // console.log(this.props)
    // console.log(this.state.nameid)
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
            <button onClick={this.rateItem}>Rate ({this.props.todo.votes.length})</button>
          </span>
        </span>
      </div>
    );
  }
}

export default Whiskey;
