import React from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import './Login.css';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }
    return (
        <div className='login' >
            <h1>Sign Up</h1>
            <div className="login__logo">
                <img src="https://www.signupsoftware.com/assets/signup-logotype-web-2.jpg" alt="Sign Up"/>
            </div>
            <Button onClick={signIn}>Sign Up</Button>
        </div>
    )
}

export default Login
