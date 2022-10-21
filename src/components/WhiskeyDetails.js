import React from "react";

class WhiskeyDetails extends React.Component {
  state = {
    
  };

  render() {
    
    return ( 
        <tr className="DetailRow">           
            <td>{this.props.voteDetail.vote}</td>
            <td>{this.props.voteDetail.voter}</td>
            <td>{this.props.voteDetail.notes}</td>
        </tr>
    );
  }
}

export default WhiskeyDetails;
