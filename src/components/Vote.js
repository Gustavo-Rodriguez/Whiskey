import React from 'react';
import star from './unchecked.png';
import checked from './checked.png';
import Whiskey from './Whiskey';

class Vote extends React.Component {
    state = {
        WhiskeyNumber: this.props.data,
        CurrentStar: 0
    }
    
    ChangeStars = ClickedStar => {
        // Start by clearing the stars
        for (let index = 1; index < 6; index++) {
            let myId="[id='"+index+"-Star']"
            let currentStarToChange = document.querySelector(myId);
            currentStarToChange.src=star;
        }
           
        //What star clicked on me
        let numberStar=ClickedStar.target.id.split('-',1)[0];        
        // Loop and check Our Star and previous stars
        for (let index = 1; index <= numberStar; index++) {
            let myId="[id='"+index+"-Star']"
            let currentStarToChange = document.querySelector(myId);
            currentStarToChange.src=checked;           
        }       
        // update state
        this.setState (
            prevState =>(
                {
                    WhiskeyNumber: prevState.WhiskeyNumber,
                    CurrentStar: numberStar
                }
            )
        )
        // console.log ('Whiskey number is ',this.state.WhiskeyNumber, "vote is ",numberStar)
        
    }
    HandleVote = e => {
        e.preventDefault();
        this.props.SubmitVote(this.state);
        this.props.clear();
    }
   
    
    render() {
    //    console.log("inside Vote these are props ", this.props, "This is State", this.state)
        if (this.state.WhiskeyNumber > 0){
    return (
        
        <div>
            <h1> Vote Here</h1>
            <span id="whiskey-name">Whiskey {this.state.WhiskeyNumber}</span>
            <span id="display-vote">{this.state.CurrentStar} Stars</span>
            <div>
                <img src={star} onClick={this.ChangeStars} alt="1-Star" id="1-Star" />
                <img src={star} onClick={this.ChangeStars} alt="2-Star" id="2-Star" />
                <img src={star} onClick={this.ChangeStars} alt="3-Star" id="3-Star" />
                <img src={star} onClick={this.ChangeStars} alt="4-Star" id="4-Star" />
                <img src={star} onClick={this.ChangeStars} alt="5-Star" id="5-Star" />
            </div>
            <button onClick={this.HandleVote}>Submit Vote</button>
            <button onClick={this.props.clear}>Clear Form</button>
        </div>
    );
        }
        else {return(
            <div> </div>
        )
        }

    }}
  
export default Vote;