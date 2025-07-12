import { Button, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog, Option, Select, Stack, Typography } from '@mui/joy'
import React, { useState } from 'react'

const Pro_AddOrEditUser = ({ open, onClose, onSubmit, type = "new", data = null }) => {

    const [userData, setUserData] = useState(data || {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        role: "viewer",
    })

    const handleChange = (field, value) => {
        type == "new" ?
            setUserData((prev) => ({ ...prev, [field]: value }))
            :
            (field == "role") &&
            setUserData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (!userData.fname || !userData.lname || !userData.email || !userData.role) {
            return alert("First name, Last name, Email and Role are required.");
        }

        const response = await onSubmit(userData);
        if (response?.success) {
            setUserData({
                fname: "",
                lname: "",
                email: "",
                phone: "",
                role: "viewer",
            });
            onClose();
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <ModalDialog sx={{ width: "35rem", maxWidth: "85%" }}>
                    <ModalClose />
                    <Typography level="h4" textAlign="center" mb={2}>
                        {
                            type == "new" ?
                                "Add New User"
                                : "Edit User"
                        }
                    </Typography>

                    <Stack spacing={2}>
                        <FormControl required>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                value={userData.fname}
                                onChange={(e) => handleChange("fname", e.target.value)}
                                placeholder="Enter First name"
                            />
                        </FormControl>

                        <FormControl required>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                value={userData.lname}
                                onChange={(e) => handleChange("lname", e.target.value)}
                                placeholder="Enter Last name"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input
                                value={userData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="Enter Email"
                            />
                        </FormControl>
                        {
                            type == "edit" &&
                            <FormControl required>
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    value={userData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    placeholder="Enter Phone"
                                />
                            </FormControl>
                        }

                        <FormControl required>
                            <FormLabel>Role</FormLabel>
                            <Select
                                value={userData.role}
                                onChange={(e, val) => handleChange("role", val)}
                                placeholder="Select Role"
                            >
                                <Option value="admin">Admin</Option>
                                <Option value="editor">Editor</Option>
                                <Option value="viewer">Viewer</Option>
                            </Select>
                        </FormControl>


                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                            <Button variant="plain" onClick={onClose}>
                                Cancel
                            </Button>
                            {
                                type == "new" ?
                                    <Button onClick={handleSubmit}>Create</Button>
                                    :
                                    <Button onClick={handleSubmit}>Update</Button>
                            }
                        </Stack>
                    </Stack>
                </ModalDialog>
            </Modal>


        </>
    )
}

export default Pro_AddOrEditUser