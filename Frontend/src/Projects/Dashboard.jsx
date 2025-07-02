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
        <div>
            <h1> Dashboard</h1>
            {/* <Link to="/dashboard/test1">Test1</Link>
            <Link to="/dashboard/test2">Test2</Link> */}
            <Outlet />
        </div>
    )
}

export default Dashboard