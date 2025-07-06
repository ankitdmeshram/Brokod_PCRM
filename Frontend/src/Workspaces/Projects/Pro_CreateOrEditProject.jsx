import React, { useContext, useState } from "react";
import {
    Modal,
    ModalDialog,
    ModalClose,
    Typography,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Option,
    Button,
    Stack,
} from "@mui/joy";
import { AppContext } from "../../Context/AuthContext";

const Pro_CreateOrEditProjectModal = ({ open, onClose, onSubmit, type="new" }) => {

    const { userData } = useContext(AppContext)

    console.log("userData", userData)
    const [projectData, setProjectData] = useState({
        project_name: "",
        project_description: "",
        project_privacy: "public",
        project_status: "active",
        owner: userData?.id,
    });

    const handleChange = (field, value) => {
        setProjectData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!projectData.project_name || !projectData.owner) {
            return alert("Project name and owner are required.");
        }
        console.log("projectData", projectData)
        const response = await onSubmit(projectData);
        if (response?.success) {
            setProjectData({
                project_name: "",
                project_description: "",
                project_privacy: "private",
                project_status: "active",
                owner: "",
            });
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{ width: "35rem", maxWidth: "85%" }}>
                <ModalClose />
                <Typography level="h4" textAlign="center" mb={2}>
                    Create New Project
                </Typography>

                <Stack spacing={2}>
                    <FormControl required>
                        <FormLabel>Project Name</FormLabel>
                        <Input
                            value={projectData.project_name}
                            onChange={(e) => handleChange("project_name", e.target.value)}
                            placeholder="Enter project name"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            minRows={3}
                            placeholder="Enter project description"
                            value={projectData.project_description}
                            onChange={(e) => handleChange("project_description", e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Privacy</FormLabel>
                        <Select
                            value={projectData.project_privacy}
                            onChange={(e, val) => handleChange("project_privacy", val)}
                        >
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Status</FormLabel>
                        <Select
                            value={projectData.project_status}
                            onChange={(e, val) => handleChange("project_status", val)}
                        >
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                            <Option value="archived">Archived</Option>
                        </Select>
                    </FormControl>

                    <FormControl required>
                        <FormLabel>Owner</FormLabel>
                        <Select
                            value={projectData.owner}
                            onChange={(e, val) => handleChange("owner", val)}
                        >
                            <Option value={userData?.id}>{`${userData?.fname} ${userData?.lname}`}</Option>
                        </Select>
                    </FormControl>

                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                        <Button variant="plain" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>Create</Button>
                    </Stack>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}


export default Pro_CreateOrEditProjectModal;