import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase.config';
import { Helmet } from "react-helmet";
export const AuthContext = createContext();
function UserContext({ children }) {
    const [dark, setDark] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateState, setUpdateState] = useState(false);
    const [dbUser, setDbUser] = useState({});
    const auth = getAuth(app);
    const userinfo = { dark, setDark, user, setUser, loading, setLoading, updateState, setUpdateState, auth, dbUser, setDbUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        fetch(`https://dev-soft-task.vercel.app/user/${user?.uid}`)
            .then(res => res.json())
            .then(data => {
                setDbUser(data)
            })
            .catch(err => { console.log(err) })
    }, [user])


    return (
        <AuthContext.Provider value={userinfo}>
            <Helmet>
                <title>Schedule</title>
            </Helmet>
            {children}
        </AuthContext.Provider>
    )
}

export default UserContext;