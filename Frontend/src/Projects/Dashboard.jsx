import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from '../Context/AuthContext';

const Dashboard = () => {

    const { userData, setUserData } = useContext(AppContext);

    useEffect(() => {
        // import('./Test1.jsx');
        // import('./Test2.jsx');
    }, []);

    return (
        <>
            <h1> Dashboard</h1>
            <Outlet />
        </>
    )
}

export default Dashboard