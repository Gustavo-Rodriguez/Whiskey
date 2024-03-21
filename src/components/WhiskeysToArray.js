
const WhiskeysToArray = (obj) => {
    console.log('Props in WhiskeysToArray is ',obj)
    const ConvertedObject=Object.entries(obj)
    var WhiskeyArray=[];
    for (var i=0; i<ConvertedObject.length; i++)
    {
        WhiskeyArray.push(ConvertedObject[i][1])
    }
    return(WhiskeyArray)
}
export default WhiskeysToArray