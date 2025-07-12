import React, { createContext, useState } from 'react'
import { CREATE_WORKSPACE, DELETE_WORKSPACES, GET_WORKSPACE_USERS, GET_WORKSPACES, UPDATE_WORKSPACE } from '../Services/api_services';

export const WorkSpaceContext = createContext()

const WorkSpaceProvider = ({ children }) => {

    const [workspaces, setWorkspaces] = useState([])
    const [workSpaceUsers, setWorkSpaceUsers] = useState([])

    const fetchWorkSpaces = async () => {
        const response = await GET_WORKSPACES()
        if (response && response.success) {
            setWorkspaces(response.workspaces || []);
            return response.workspaces;
        }
        return [];
    }

    const createWorkSpace = async (workspaceData) => {
        const response = await CREATE_WORKSPACE(workspaceData)
        if (response && response.success) {
            alert('Workspace created successfully!');
            setWorkspaces([...workspaces, {
                id: response?.workspaceId,
                workspace_name: workspaceData?.name,
                workspace_description: workspaceData?.description,
                role: "admin"
            }])
            return response;
        }
        alert(response?.message || 'Workspace creation failed. Please try again.');
        return null;
    }

    const updateWorkSpace = async (workspaceData) => {
        const response = await UPDATE_WORKSPACE(workspaceData)
        if (response && response.success) {

            setWorkspaces(prev => prev.map(p => p.id == workspaceData.id ?
                {
                    ...p,
                    workspace_name: workspaceData?.name,
                    workspace_description: workspaceData?.description
                } :
                p
            ))

            alert('Workspace updated successfully!');
            return response;
        }
        alert(response?.message || 'Workspace updation failed. Please try again.');
        return null;
    }

    const deleteWorkspace = async (workspace) => {
        if (confirm(`Are you sure you want to delete workspace - ${workspace?.workspace_name}`)) {
            const response = await DELETE_WORKSPACES(workspace?.id)
            if (response && response.success) {
                setWorkspaces(prev => prev.filter(p => p.id != workspace?.id))
                alert("Workspace deleted successfully")
                return response.workspaces;
            }
        }
        return [];
    }

    const fetchWorkSpaceUsers = async (workspace) => {
        const response = await GET_WORKSPACE_USERS(workspace)
        if (response && response.success) {
            setWorkSpaceUsers(response.users || []);
            return response.users;
        }
    }

    const contextValue = {
        workspaces, setWorkspaces,
        createWorkSpace,
        updateWorkSpace,
        fetchWorkSpaces,
        deleteWorkspace,

        workSpaceUsers, setWorkSpaceUsers,
        fetchWorkSpaceUsers
    }

    return (
        <WorkSpaceContext.Provider value={contextValue}>
            {children}
        </WorkSpaceContext.Provider>
    )
}

export default WorkSpaceProvider