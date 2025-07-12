import React, { useContext, useState } from 'react'
import { Box, Typography } from '@mui/joy';
import WP_CreateOrEditWorkspace from './WP_CreateOrEditWorkspace';
import { WorkSpaceContext } from '../Context/WorkspaceContext';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ForwardIcon from '@mui/icons-material/Forward';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const WP_Workspaces = () => {

    const [openWorkSpaceModal, setOpenWorkspaceModal] = useState({ open: false });

    const navigate = useNavigate()

    const { createWorkSpace, workspaces, fetchWorkSpaces, updateWorkSpace, deleteWorkspace } = useContext(WorkSpaceContext);

    const openAddWorkspaceModal = () => {
        setOpenWorkspaceModal({ open: true, type: "new" });
    }
    const openEditWorkspaceModal = (workspace) => {
        setOpenWorkspaceModal({ open: true, type: "edit", data: { id: workspace?.id, name: workspace?.workspace_name, description: workspace?.workspace_description } });
    }
    const closeAddWorkspaceModal = () => {
        setOpenWorkspaceModal({ open: false });
    }

    useEffect(() => {
        fetchWorkSpaces()
    }, [])

    return (
        <>
            <h2>Workspaces</h2>
            <Box className="workspaces-list">
                <Box className="workspace-item" onClick={() => openAddWorkspaceModal()}
                    sx={{ textAlign: 'center', alignItems: 'center', justifyContent: "center", height: "100%", fontSize: "7rem" }}
                >
                    <Typography sx={{ fontSize: "5rem", margin: 0, padding: 0, lineHeight: 1 }}
                    >+</Typography>
                    <Typography level='h4' >Add New Workspace</Typography>
                </Box>
                {
                    workspaces.map((workspace, index) => (
                        <Box key={index} className="workspace-item">
                            <Typography level='h4' >{workspace.workspace_name}</Typography>
                            <Typography>{workspace.workspace_description || 'No description available.'}</Typography>
                            <Typography textAlign={'right'} marginTop={'auto'} >Last updated: {workspace.updated_at && moment(workspace.updated_at).format("DD-MM-YYYY")}</Typography>
                            <Box className="workspace-dev-options">
                                {
                                    workspace?.role == "admin" &&
                                    <>
                                        <EditIcon
                                            onClick={() => openEditWorkspaceModal(workspace)} />
                                        <DeleteIcon
                                            onClick={() => deleteWorkspace(workspace)}
                                        />
                                    </>
                                }
                                <ForwardIcon
                                    onClick={() => { navigate(workspace?.workspace_slug) }}
                                />
                            </Box>
                        </Box>
                    ))
                }
            </Box >

            {
                openWorkSpaceModal.open && openWorkSpaceModal.type == "new" && (
                    <WP_CreateOrEditWorkspace open={true} onClose={closeAddWorkspaceModal} onSubmit={createWorkSpace} />
                )
            }
            {
                openWorkSpaceModal.open && openWorkSpaceModal.type == "edit" && (
                    <WP_CreateOrEditWorkspace
                        open={true}
                        type={"edit"}
                        onClose={closeAddWorkspaceModal}
                        onSubmit={updateWorkSpace}
                        data={openWorkSpaceModal?.data}
                    />
                )
            }
        </>
    )
}

export default WP_Workspaces