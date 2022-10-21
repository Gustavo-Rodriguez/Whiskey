import React from "react";

class WhiskeyResults extends React.Component {
  state = {
    
  };
  details = e => {
    e.preventDefault();
   this.props.ShowDetails(this.props.result);
  };

  render() {
    // console.log('in whiskey results, props are',this.props)
    return (
      <div className="WhiskeyResults">
        <span className="WhiskeyResult">
           Whiskey {this.props.result.realWhiskey} had a score of {this.props.result.VoteAverage}
        </span>
        <span className="detailsButton">
           <button onClick={this.details}>Details</button>
        </span>
      </div>
    );
  }
}

export default WhiskeyResults;
