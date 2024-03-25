
const WhiskeysToArray = (obj) => {
    console.log('Props in WhiskeysToArray is ',obj)
    const ConvertedObject=Object.entries(obj)
    var WhiskeyArray=[];
    for (var i=0; i<ConvertedObject.length; i++)
    {
        ConvertedObject[i][1].key=ConvertedObject[i][0];
        WhiskeyArray.push(ConvertedObject[i][1])
        console.log(WhiskeyArray[i])
    }
    // Sort the Whiskeys by Visible Name 
    // This is at the request of Rachel
    const SortedWhiskeys = [...WhiskeyArray].sort((a, b) =>
					a.visibleName > b.visibleName ? 1 : -1
				);
    return(SortedWhiskeys)
}
export default WhiskeysToArray