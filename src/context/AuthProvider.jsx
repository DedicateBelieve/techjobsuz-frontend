/* eslint-disable react/prop-types */
import React from 'react';
import { createContext } from 'react';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import app from '../firebase/firebase.config';
import userService from '../services/user-service';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    /**
     * User sign up with google account.
     * @param {"hr" | "candidate"} type
     */
    const signUpWithGmail = async (type) => {
        setLoading(true);
        const resultFromGoogle = await signInWithPopup(auth, googleProvider);

        if(!resultFromGoogle.user) {
            return resultFromGoogle
        }

        const resultFromServer = await userService.singUpWithGoogle({
            username: resultFromGoogle.user.email,
            fullName: resultFromGoogle.user.displayName,
            accessToken: resultFromGoogle.user.accessToken,
            type: type
        })
        
        if(resultFromServer.success) {
            localStorage.setItem("token", resultFromServer.data.access_token)
            resultFromGoogle.user.token = resultFromServer.data.access_token
            await authStateChanged(resultFromGoogle.user)
        }
        
        return resultFromGoogle
    }

    const logOut = () =>{
        localStorage.removeItem('genius-token');
        return signOut(auth);
    }

    const authStateChanged = async (currentUser) => {
        let isAuthorized = false;
        if(currentUser) {
            const token = localStorage.getItem("token");

            const user = await userService.getMe({
                accessToken: token
            });

            if(user.success) {
                currentUser.type = user.data.type;
                isAuthorized = true;
            }

        }

        if(isAuthorized) {
            setUser(currentUser);
        } else {
            setUser(null)
        }

        setLoading(false);
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);

        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user, 
        loading,
        logOut,
        signUpWithGmail
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;