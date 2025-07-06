import React, { useContext, useState } from 'react'
import { Button, Table } from "@mui/joy"
import Pro_CreateOrEditProjectModal from './Pro_CreateOrEditProject';
import { ProjectContext } from '../../Context/ProjectContext';

const Pro_Projects = () => {

    const { createProject } = useContext(ProjectContext)

    const [openProjectModal, setOpenProjectModal] = useState({ open: false });

    const openAddProjectModal = () => {
        setOpenProjectModal({ open: true, type: "new" });
    }
    const openEditProjectModal = (Project) => {
        setOpenProjectModal({ open: true, type: "edit" });
    }
    const closeAddProjectModal = () => {
        setOpenProjectModal({ open: false });
    }

    return <>
        <Button sx={{ mt: 2 }} onClick={openAddProjectModal}>Add Project</Button>
        {
            openProjectModal?.open &&
            <Pro_CreateOrEditProjectModal open={true} onClose={closeAddProjectModal} onSubmit={createProject} />
        }
    </>

}

export default Pro_Projects