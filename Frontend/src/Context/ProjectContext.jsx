import React, { createContext, useState } from 'react'
import { CREATE_PROJECT, DELETE_PROJECT, FETCH_PROJECTS, UPDATE_PROJECT } from '../Services/api_services'

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

    const fetchProjects = async (workspace) => {
        const response = await FETCH_PROJECTS(workspace)
        if (response && response.success) {
            setProjects(response.projects || []);
            return response.projects;
        }
        return [];
    }

    const deleteProject = async (project) => {
        if (confirm(`Are you sure you want to delete project - ${project?.project_name}`)) {
            const response = await DELETE_PROJECT(project?.id)
            if (response && response.success) {
                setProjects(prev => prev.filter(p => p.id != project?.id))
                alert("Project deleted successfully")
                return response.projects;
            }
        }
        return [];
    }

    const updateProject = async (project) => {
        const resposne = await UPDATE_PROJECT(project)
        if (resposne && resposne.success) {
            setProjects(prev => prev.map(p => p.id == project.id ?
                {
                    ...p,
                    project_name: project?.project_name,
                    project_description: project?.project_description,
                    project_privacy: project?.project_privacy,
                    project_status: project?.project_status
                } :
                p
            ))
            alert('Project updated successfully!');
            return resposne;
        }
    }


    const contextValue = {
        projects, setProjects,
        createProject,
        fetchProjects,
        deleteProject,
        updateProject
    }

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider