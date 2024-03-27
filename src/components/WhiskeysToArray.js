
const WhiskeysToArray = (obj) => {
    if (!obj){
        return []
    }
    console.log('Props in WhiskeysToArray is ',obj)
    const ConvertedObject=Object.entries(obj)
    var WhiskeyArray=[];
    for (var i=0; i<ConvertedObject.length; i++)
    {
        ConvertedObject[i][1].key=ConvertedObject[i][0];
        WhiskeyArray.push(ConvertedObject[i][1])
        // console.log(WhiskeyArray[i])
    }
    // Sort the Whiskeys by Visible Name 
    // This is at the request of Rachel
    // console.log('WhiskeyArray is',WhiskeyArray)
    const SortedWhiskeys = [...WhiskeyArray].sort((a, b) =>
					Number(a.visibleName.slice(8)) > Number(b.visibleName.slice(8)) ? 1 : -1
				);
    return(SortedWhiskeys)
}
export default WhiskeysToArray