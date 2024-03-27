import React from "react";
import Whiskey from "./Whiskey";
import WhiskeysToArray from "./WhiskeysToArray";




const WhiskeyList = (props) => {
  // if (!props.whiskeyList){
  //   return ( <div>Loading Whiskeys</div>)
  // }
  // console.log('in whiskeyList these are my props',props)
  const whiskeyList=props.WhiskeyList;
  const storedProfile = JSON.parse(sessionStorage.getItem('profile'))
  const WhiskeyArray=WhiskeysToArray(whiskeyList);
  // console.log('WhiskeyArray is ',WhiskeyArray,", Stored Profile is ",storedProfile)
  const WhiskeyItems = WhiskeyArray.map((d, i) => {
    return (
      <Whiskey
        handleRateFromApp={props.handleRatefromApp}
        Whiskey={d}
      />
    );
  });

  return <div className="items-list">{storedProfile ? (WhiskeyItems) :(
    <div>You Must Log In to Vote </div>)}
    
    </div>;
};

export default WhiskeyList;
