import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import WP_Workspaces from './WP_Workspaces.jsx';
import { Box } from '@mui/joy';

import "./WP_Styles.css";
import WorkSpaceContext from '../Context/WorkspaceContext.jsx';

const WP_Dashboard = () => {
    return (
        <>
            <WorkSpaceContext>
                <Box className="workspaces-container">
                    <h1> Workspaces</h1>
                    <WP_Workspaces />
                </Box>
                <Outlet />
            </WorkSpaceContext>
        </>
    )
}

export default WP_Dashboard