import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import NavBar from './NavBar.js'

function App({givenuser, givenprofile}) {
    const storedProfile = JSON.parse(sessionStorage.getItem('profile'))

    const [ user, setUser ] = useState(givenuser);
    const [ profile, setProfile ] = useState(storedProfile);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                console.log('in useEffect, user is ',user)
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        console.log(res.data)
                        sessionStorage.setItem('profile',JSON.stringify(res.data))
                        console.log('SessionStorage in useEffect profile is ',JSON.parse(sessionStorage.getItem('profile')))
                    })
                    .catch((err) => console.log(err));
            }
            else {
                console.log('in useEffect no user',user)
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        sessionStorage.removeItem('profile')
    };


    console.log('User is '+user)
    console.log('profile is '+profile)

    return (
        <div className='center-me'>

           
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="Picture" />
                    <h3>Welcome {profile.name}</h3>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <div>
                <h2>Log In to Vote</h2>
                <br></br>
                <button onClick={() => login()}>Let me Vote! <span role='img' aria-label='whiskey'> 🥃 </span></button>
                </div>
            )}
        </div>
    );
}
export default App;