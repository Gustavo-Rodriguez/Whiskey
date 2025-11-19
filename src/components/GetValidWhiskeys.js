import { get } from 'firebase/database';
const GetValidWhiskeys = async (whiskeysRef) => {
    let dbResults
    let WhiskeyState=[]
    let WhiskeyStateI=0
    let done=false;
    const snapshot = await get(whiskeysRef);
    
        dbResults = snapshot.val();
        if (dbResults !== undefined && dbResults !== null) {
            const WhiskeyArray=Object.entries(dbResults)
            for (let i=0; i<WhiskeyArray.length;i++)
            {
                // console.log('I havent checked if Whiskey is Registered yet WhiskeyStateI=',WhiskeyStateI)
                let WhiskeyKey = WhiskeyArray[i][0]
                // console.log('outside of whiskeyCheck key is ',WhiskeyKey)
                if (WhiskeyArray[i][1].visibleName==='Whiskey -1'){
                    //  console.log('UnRegistered Whiskey Found, not adding to List')
                    //  console.log('WhiskeyStateI=',WhiskeyStateI)
                } else {
                    // console.log('registered whiskey found',WhiskeyArray[i],'Adding it to the WhiskeyStateArray')
                    // console.log('key should be ',WhiskeyKey)
                    // console.log('WhiskeyStateI=',WhiskeyStateI)
                    WhiskeyState[WhiskeyStateI]={}
                    WhiskeyState[WhiskeyStateI].visibleName=WhiskeyArray[i][1].visibleName;
                    WhiskeyState[WhiskeyStateI].voteCount=WhiskeyArray[i][1].voteCount;
                    WhiskeyState[WhiskeyStateI].key=WhiskeyKey;
                    WhiskeyState[WhiskeyStateI].WhiskeyKey=WhiskeyKey;
                    // console.log('registered whiskey found',WhiskeyState[WhiskeyStateI])
                    WhiskeyStateI= WhiskeyStateI+1;
                    // console.log('registered Whiskeys Found to date',WhiskeyState)
                }
            }
            // console.log("I'm gonna export this whiskeyState, Outside of For loop, inside onValue",WhiskeyState)
        }
        done=true;
    if (done) {
        // console.log("I'm gonna export this whiskeystate, right before return",WhiskeyState)
        return WhiskeyState
    }
}
    
export default  GetValidWhiskeys