import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import image from '../../asset/images/dbimage.gif'
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import { AuthContext } from '../../UserContext/UserContext';
function DashboardWellcome() {
    const { dbUser, setDbUser, user, loading } = useContext(AuthContext);
    const [dataLoading, setDataLoading] = useState(true);
    useEffect(() => {
        fetch(`https://dev-soft-task.vercel.app/user/${user?.uid}`)
            .then(res => res.json())
            .then(data => {
                setDbUser(data)
                setDataLoading(false)
            })
            .catch(err => { console.log(err) })
    }, [user])

    if (dataLoading) {
        return <DataLoadingSpinner />
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <Helmet>
                <title>Schedule - Dashboard</title>
            </Helmet>
            <p className='pt-[150px] text-center text-3xl font-extrabold text-black dark:text-slate-200'>Wellcome <span className='text-amber-400 capitalize'>{dbUser?.displayName}</span></p>
            <img src={image} className='lg:w-[600px]' />
        </div>

    )
}

export default DashboardWellcome;