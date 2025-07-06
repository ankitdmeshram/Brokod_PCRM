import React, { createContext, useState } from 'react'
import { CREATE_PROJECT } from '../Services/api_services'

export const ProjectContext = createContext()

const ProjectProvider = ({ children }) => {

    const [projects, setProjects] = useState([])

    const createProject = async (project) => {
        const response = await CREATE_PROJECT(project)
        if (response && response.success) {
            alert('Project created successfully!');
            setProjects([...projects, {
                id: response?.projectId,
                ...project
            }])
            return response;
        }
        alert(response?.message || 'Project creation failed. Please try again.');
        return null;
    }

    const contextValue = {
        projects, setProjects,
        createProject
    }

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider