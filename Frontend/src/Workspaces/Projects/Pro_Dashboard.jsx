import { Box } from '@mui/joy'
import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import "./Pro_Styles.css"
import ProjectContext from '../../Context/ProjectContext'
import { useContext } from 'react'
import { WorkSpaceContext } from '../../Context/WorkspaceContext'
import { useEffect } from 'react'
const Dashboard = () => {

    const { ws_code } = useParams()

    const { fetchWorkSpaceUsers } = useContext(WorkSpaceContext)

    useEffect(() => {
        fetchWorkSpaceUsers(ws_code)
    }, [ws_code])

    return (
        <>
            <ProjectContext>
                <Box className="pro-navs">
                    <Link to={""}>Dashboard</Link>
                    <Link to={"projects"}>Projects</Link>
                    <Link to={"users"}>Users</Link>
                    <Link to={"settings"}>Settings</Link>
                </Box>
                <Outlet />
            </ProjectContext>
        </>
    )
}

export default Dashboard
