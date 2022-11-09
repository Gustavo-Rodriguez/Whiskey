
import db from '../utils/firebase';
import { ref, onValue } from 'firebase/database';

const listItems = {
    
    Owner: "Gustavo",
    count:0,
    Whiskeys:[]

}

const whiskeysRef = ref(db, 'whiskeys/');

let dbResults;
console.log('inside data',dbResults)
let test
onValue(whiskeysRef, (snapshot) => {
    dbResults = snapshot.val();
    console.log('inside onvalue in')

    // return dbResults

    // if (dbResults !== null)
    //     this.setState((prevState) => ({
    //         listItems: {
    //             owner: 'Gustavo',
    //             count: prevState.listItems.count + 1,
    //             Whiskeys: dbResults.Whiskeys,
    //         },
    //         selectedWhiskey: prevState.selectedWhiskey,
    //         nextWhiskey: dbResults.nextWhiskey,
    //         results: prevState.results,
    //     }));
     
});



console.log('after update',dbResults)

//This is only getting the empty value of dbResults, not the one after onValue
export const ExistingResults=dbResults
export default listItems;


