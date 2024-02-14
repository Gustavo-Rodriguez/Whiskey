import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function App(props) {
    const storedProfile = JSON.parse(sessionStorage.getItem('profile'))
    console.log('in Login my props are ',props)

    const [ user, setUser ] = useState('');
    const [ profile, setProfile ] = useState(storedProfile);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                console.log('in LoginUseEffect')
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
                        props.refresh('after we write to Session Storage in Login')
                    })
                    .catch((err) => console.log(err));
            }
            else {
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        sessionStorage.removeItem('profile')
        props.refresh('in logout')
    };


    console.log('User is '+user)
    console.log('profile is '+profile)

    return (
        <div className='center-me'>

           
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="Profile " />
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