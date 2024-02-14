import React from "react";
import {
    NavLink,
} from "react-router-dom";
 
function NavBar(props) {
    console.log('props in navbar', props )
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
        {props.showResults ? (
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
        {props.showAdmin ? (
        <div className="navItem">
            <NavLink
                to="/Admin"
                style={({ isActive }) => ({
                    color: isActive
                        ? "Yellow"
                        : "white",
                })}
            >
                Add A Whiskey
            </NavLink>
        </div>):(<div></div>)}
    </div>
    );
}
 
export default NavBar;