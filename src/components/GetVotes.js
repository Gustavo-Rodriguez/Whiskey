import db from '../utils/firebase';
import { ref, get } from 'firebase/database';



const GetVotes = (WhiskeyRef) => {
    // console.log("Inside GetVotes",WhiskeyRef)
    // let OuterVoteArray=[];
    const wrapper = async() => {
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
            console.log('given a string')
            const VoteRef = ref(db, "Whiskeys/".concat(WhiskeyRef).concat('/Votes'));
            let dbResults
            const snapshot = await get(VoteRef);
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
            
        }
        return VoteArray
    }
    const wrapperPromise=wrapper();
    return wrapperPromise.then(result => {
        console.log(wrapperPromise)
        console.log('Returning VoteArray',result)
        return (result)
    })
}
export default GetVotes