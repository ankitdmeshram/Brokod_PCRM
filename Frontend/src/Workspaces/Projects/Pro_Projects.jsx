import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Table, Typography } from "@mui/joy"
import Pro_CreateOrEditProjectModal from './Pro_CreateOrEditProject';
import { ProjectContext } from '../../Context/ProjectContext';
import moment from "moment";
import { Link } from 'react-router-dom';

const Pro_Projects = () => {

    const { projects, createProject, fetchProjects, deleteProject, updateProject } = useContext(ProjectContext)

    const [openProjectModal, setOpenProjectModal] = useState({ open: false });

    const openAddProjectModal = () => {
        setOpenProjectModal({ open: true, type: "new" });
    }
    const openEditProjectModal = (Project) => {
        setOpenProjectModal({ open: true, type: "edit", data: Project });
    }
    const closeAddProjectModal = () => {
        setOpenProjectModal({ open: false });
    }

    useEffect(() => {
        fetchProjects(window.location.pathname.split('/')[2]);
    }, []);

    return <>
        <Button sx={{ mt: 2 }} onClick={openAddProjectModal}>Add Project</Button>
        {
            openProjectModal?.open &&
            <Pro_CreateOrEditProjectModal open={true} onClose={closeAddProjectModal} onSubmit={openProjectModal?.type == "new" ? createProject : updateProject} type={openProjectModal?.type} data={openProjectModal?.data} />
        }
        {
            projects.length > 0 ?
                window.screen.width > 768 ?
                    <Box sx={{ overflow: "scroll", mt: 2, width: "100%" }}>
                        <Table aria-label="Projects Table">
                            <thead>
                                <tr>
                                    <th width="70">Sr. No.</th>
                                    <th width="200">Project Name</th>
                                    <th width="200"></th>
                                    <th width="150">Status</th>
                                    <th width="150">Owner</th>
                                    <th width="150">Privacy</th>
                                    <th width="150">Updated At</th>
                                    <th width="150">Created At</th>
                                    <th width="150">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{project?.project_name}</td>
                                        <td>
                                            <Button variant="solid" sx={{ ml: 1 }} onClick={() => openEditProjectModal(project)}>Access Project</Button>
                                        </td>
                                        <td>{project?.project_status}</td>
                                        <td>{project?.owner?.fname} {project?.owner?.lname}</td>
                                        <td>{project?.project_privacy}</td>
                                        <td>{moment(project?.updated_at).format("DD-MM-YYYY")}</td>
                                        <td>{moment(project?.created_at).format("DD-MM-YYYY")}</td>
                                        <td>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                                                <Button variant="solid" onClick={() => openEditProjectModal(project)}>Edit</Button>
                                                <Button variant="solid" color='danger' onClick={() => deleteProject(project)}>Delete</Button>
                                            </Box>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Box>
                    :
                    <Box sx={{ overflow: "scroll", mt: 1, width: "100%" }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{ padding: "14px", width: "50px" }}>#</th>
                                    <th style={{ padding: "14px" }}>
                                        Projects
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={index + 1} >
                                        <td style={{ padding: "14px" }}>{index + 1}</td>
                                        <td>
                                            <Box>
                                                {project?.project_name}
                                                <Box className="quick-links" >
                                                    <Link>Access Project</Link>
                                                    <Link variant="solid" onClick={() => openEditProjectModal(project)}>Edit</Link>
                                                    <Link variant="solid" color='danger' onClick={() => deleteProject(project)}>Delete</Link>
                                                </Box>
                                            </Box>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Box>
                :
                <p>No projects found.</p>
        }
    </>

}

export default Pro_Projects