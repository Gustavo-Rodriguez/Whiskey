import React from "react";
import Whiskey from "./Whiskey";




const WhiskeyList = (props) => {
  const storedProfile = JSON.parse(sessionStorage.getItem('profile'))
  const WhiskeyItems = props.Sorted.map((d, i) => {
    return (
      <Whiskey
        handleRateFromApp={props.handleRatefromApp}
        todo={d}
        key={i}
        mykey={i}
        
      />
     //,console.log('end of loop?')
    );
  });

  return <div className="items-list">{storedProfile ? (WhiskeyItems) :(
    <div>You Must Log In to Vote </div>)}
    
    </div>;
};

export default WhiskeyList;
