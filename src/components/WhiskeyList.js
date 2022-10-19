import React from "react";
// Uses listItems from State in App 
import Whiskey from "./Whiskey";




const WhiskeyList = (props) => {
  const todoListItems = props.listItems.Whiskeys.map((d, i) => {
    return (
      // console.log('array of objects in todoList'),
      // console.log (d),
      // console.log(i),
      // console.log('myprops in WhiskeyList'),
      // console.log(props),
      <Whiskey
        handleRateFromApp={props.handleRatefromApp}
        todo={d}
        key={i}
        mykey={i}
        
      />
     //,console.log('end of loop?')
    );
  });

  return <div className="items-list">{todoListItems}</div>;
};

export default WhiskeyList;
