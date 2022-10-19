import React from "react";

class Form extends React.Component {
  state = {
    InputWhiskeyName: "",
    InputEmail: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log("this is handleSubmit and these are my props", this.props);
 
    this.props.handlesubmitfromApp(this.state);
    this.setState({
      InputWhiskeyName: "", // this clears the form
      InputEmail:""
    });
  };

  handleName = e => {
    // console.log("this is handleName");
    this.setState(
      prevState =>(
      {
        InputWhiskeyName: e.target.value,
        InputEmail: prevState.InputEmail
      }),
      () => {
        // console.log("this is state", this.state);
      }
    );
  };  
  handleEmail = e => {
    // console.log("this is handleEmail");
    this.setState(
      prevState =>(
      {
        InputWhiskeyName: prevState.InputWhiskeyName,
        InputEmail: e.target.value
      }),
      () => {
        // console.log("this is state", this.state);
      }
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleName}
          value={this.state.InputWhiskeyName}
          type="text"
          placeholder={this.props.placeholderText}
        />
         <input
          onChange={this.handleEmail}
          value={this.state.InputEmail}
          type="text"
          placeholder="What's your E-mail"
        />
        
        <button>Add Whiskey</button>
      </form>
    );
  }
}

export default Form;
