import db from '../utils/firebase';
import { ref, onValue } from 'firebase/database';



const GetVotes =  (WhiskeyRef) => {
    
    let VoteArray=[];
    if (typeof(WhiskeyRef)=='object'){
        let fromObject=Object.entries(WhiskeyRef.Votes)
        console.log('DEBUG_RESULTS, VoteArary with type',typeof(VoteArray),'its value is ',VoteArray)
        console.log('DEBUG_RESULTS, sending fromObject with type',typeof(fromObject),'its value is ',fromObject)
        for (let i=0;i<fromObject.length;i++){
            VoteArray.push(fromObject[i][1])
        }
        console.log('DEBUG_RESULTS, sending VoteArary with type',typeof(VoteArray),'its value is ',VoteArray)
    }
    if (typeof(WhiskeyRef)=='string'){
        const VoteRef = ref(db, "Whiskeys/".concat(WhiskeyRef).concat('/Votes'));
        let dbResults
        onValue(VoteRef, (snapshot) => {
            dbResults = snapshot.val();
            console.log('dbResults is ',dbResults)
            let storedProfile = JSON.parse(sessionStorage.getItem('profile'))
            console.log('checking for user')
            if (storedProfile){
            //User Found Now Check for Whiskey
            if (dbResults !== undefined && dbResults !== null)
            {
                console.log('POKEMON Votes were found they are  ',dbResults)
                console.log('user is ',storedProfile.email)
                const fromObject=Object.entries(dbResults)
                for (let i=0;i<fromObject.length;i++){
                    console.log('adding this vote to voteArray',fromObject[i][1])
                    VoteArray.push(fromObject[i][1])
                }
            }
            else {
                console.log('We didnt find Votes')
            }
            } else {
                console.log('user not found')
            }
        });
    }
    return (VoteArray)

}
export default GetVotes