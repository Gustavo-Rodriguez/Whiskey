import React from "react";
import {
    NavLink,
} from "react-router-dom";
 
function NavBar() {
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
    </div>
    );
}
 
export default NavBar;