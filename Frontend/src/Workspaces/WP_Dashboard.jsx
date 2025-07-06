import { Outlet } from 'react-router-dom';
import { Box } from '@mui/joy';

import "./WP_Styles.css";
import WorkSpaceContext from '../Context/WorkspaceContext.jsx';

const WP_Dashboard = () => {
    return (
        <>
            <WorkSpaceContext>
                <Box className="workspaces-container">
                    <Outlet />
                </Box>
            </WorkSpaceContext>
        </>
    )
}

export default WP_Dashboard