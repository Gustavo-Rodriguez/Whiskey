import React, { useState, useEffect } from 'react';
import {
    NavLink,
} from "react-router-dom";
import { ref, onValue } from 'firebase/database';
import db from '../utils/firebase';
 
function NavBar( props ) {
    const [ admin, setAdmin ] = useState(false);
    const [ results, setResults ] = useState(false);
    const storedProfile = JSON.parse(sessionStorage.getItem('profile'))
    useEffect(
        () => {
            const adminRef = ref(db, 'Admin/');
            let results;
            onValue(adminRef, (snapshot) => {
               results=snapshot.val();
            //    console.log('admin lookup',results)
               if (results.ResultsVisible){
                setResults(true)
                // console.log('results is true')
               }
               else {
                // No Results page
                setResults(false)
               }
               if (storedProfile){
                if (results.Admins.includes(storedProfile.email)){
                    // console.log('admin is true')
                    setAdmin(true)
                  }
               }
               else {
                //not an admin, no adminpage
                setAdmin(false)
               }
              })
    });

    return (

    <div className='navBar'>
        <div className="navItem">
            <NavLink
                to="/Vote"
                style={({ isActive }) => ({
                    color: isActive
                        ? "yellow"
                        : "white",
                })}
            >
                Vote
            </NavLink>
        </div>
        <div className="navItem">
            <NavLink
                to="/Login"
                style={({ isActive }) => ({
                    color: isActive
                        ? "Yellow"
                        : "white",
                })}
            >
                Profile
            </NavLink>
        </div>
        <div className="navItem">
            <NavLink
                to="/Privacy"
                style={({ isActive }) => ({
                    color: isActive
                        ? "Yellow"
                        : "white",
                })}
            >
                PrivacyPolicy
            </NavLink>
        </div>
        <div className="navItem">
            <NavLink
                to="/Add"
                style={({ isActive }) => ({
                    color: isActive
                        ? "Yellow"
                        : "white",
                })}
            >
                Add A Whiskey
            </NavLink>
        </div>
        {results ? (
        <div className="navItem">
            <NavLink
                to="/Results"
                style={({ isActive }) => ({
                    color: isActive
                        ? "Yellow"
                        : "white",
                })}
            >
                Results
            </NavLink>
        </div>):(<div></div>)}
        {admin ? (
        <div className="navItem">
            <NavLink
                to="/Admin"
                style={({ isActive }) => ({
                    color: isActive
                        ? "Yellow"
                        : "white",
                })}
            >
                Admin
            </NavLink>
        </div>):(<div></div>)}
    </div>
    );
}
 
export default NavBar;