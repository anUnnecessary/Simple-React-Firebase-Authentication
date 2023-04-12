import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from '../../Firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('404 page not found', error.message);
            })
    }


    const handleSignOut = () => {

   
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser(null);
        })
        .catch(error => {
            console.log('404 page not found');
        })

    }
    return (

        //{user ? logout:  sign in}
        <div>{
            user ? 
            <button onClick={handleSignOut}>Sign Out</button> :
            <button onClick={handleGoogleSignIn}>Google Login</button>}
            <br />
            <br />
            <br />
            {user && <div>
                <img src={user.photoURL} alt="" />
                <h3>User: {user?.displayName}</h3>
                <p>Email: {user.email}</p>
            </div>}
        </div>
    );
};

export default Login;