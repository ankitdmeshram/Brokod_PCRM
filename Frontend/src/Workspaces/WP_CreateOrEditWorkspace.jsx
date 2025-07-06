import React, { memo, useState } from "react";
import {
    Modal,
    ModalDialog,
    ModalClose,
    Typography,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Stack,
} from "@mui/joy";

const WP_CreateOrEditWorkspace = memo(({ open, onClose, onSubmit, type = "new", data = null }) => {

    const [formData, setFormData] = useState(data || {
        name: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitForm = async () => {
        if (formData.name.trim()) {
            const response = await onSubmit(formData);
            console.log("Response from onSubmit:", response);
            if (response && response.success) {
                setFormData({ name: "", description: "" }); // Reset form after submission
                onClose(); // Close the modal
            }
        }
    };

    console.log(1)

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{ width: "30rem", maxWidth: "85%" }}>
                <ModalClose />
                <Typography level="h4" mb={2}>{type == "edit" ? "Edit Workspace" : "Create New Workspace"}</Typography>

                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Workspace Name</FormLabel>
                        <Input
                            placeholder="Enter workspace name"
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                            required
                            name="name"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Optional description"
                            minRows={3}
                            value={formData.description}
                            onChange={(e) => handleChange(e)}
                            name="description"
                        />
                    </FormControl>

                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="plain" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={submitForm} disabled={!formData?.name.trim()}>
                            {type == "edit" ? "Update" : "Add"}
                        </Button>
                    </Stack>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}, [])

export default WP_CreateOrEditWorkspace;