import db from '../utils/firebase';
import { ref, onValue } from 'firebase/database';



const GetVotes =  (WhiskeyRef) => {
    console.log("DELETE_ME Inside GetVotes",WhiskeyRef)
    
    let VoteArray=[];
    // Run this code if you gave this a Whiskey Object
    if (typeof(WhiskeyRef)=='object'){
        let fromObject=Object.entries(WhiskeyRef.Votes)
        for (let i=0;i<fromObject.length;i++){
            VoteArray.push(fromObject[i][1])
        }
    }
    // Run this code if you were given a KEY
    if (typeof(WhiskeyRef)=='string'){
        const VoteRef = ref(db, "Whiskeys/".concat(WhiskeyRef).concat('/Votes'));
        let dbResults
        onValue(VoteRef, (snapshot) => {
            dbResults = snapshot.val();
            let storedProfile = JSON.parse(sessionStorage.getItem('profile'))
            if (storedProfile){
            //User Found Now Check for Votes
            if (dbResults !== undefined && dbResults !== null)
            {
                //Votes were Found, push them to an array
                const fromObject=Object.entries(dbResults)
                for (let i=0;i<fromObject.length;i++){
                    VoteArray.push(fromObject[i][1])
                }
            }
            else {
                //console.log('We didnt find Votes')
            }
            } else {
                //console.log('user not found')
            }
        });
    }
    return (VoteArray)

}
export default GetVotes