
import { ref, onValue } from 'firebase/database';
import db from '../utils/firebase';
 


const CheckAdmin = (email) => {
    const adminRef = ref(db, 'Admin/');
    let results;
    let returnValue=false;
    onValue(adminRef, (snapshot) => {
        results=snapshot.val();
    //    console.log('admin lookup',results)
        if (results.Admins.includes(email)){
            // console.log('admin is true')
            returnValue=true
        }
    })
    return (returnValue);
} 
export default CheckAdmin