import React, { useContext } from 'react'
import { WorkSpaceContext } from '../../Context/WorkspaceContext'
import moment from 'moment'
import { Box, Button, Table } from '@mui/joy'
import Pro_AddOrEditUser from './Pro_AddOrEditUser'

const Pro_Users = () => {

    const { workSpaceUsers, addWorkSpaceUser } = useContext(WorkSpaceContext)

    const [addorEditUserModal, setAddorEditUserModal] = React.useState({ open: false, type: "new", data: null });

    const openAddOrEditUserModal = () => {
        setAddorEditUserModal({
            open: true,
            type: "new",
            data: null
        });
    }
    const editAddOrEditUserModal = (user) => {
        setAddorEditUserModal({
            open: true,
            type: "edit",
            data: user
        });
    }

    const closeAddorEditUserModal = () => {
        setAddorEditUserModal({
            open: false,
            type: "new",
            data: null
        });
    }

    return (
        <>
            <Button sx={{ mt: 2 }} onClick={openAddOrEditUserModal}>Add User</Button>

            <Box sx={{ overflow: "scroll", mt: 2, width: "100%" }}>
                <Table aria-label="Users Table">
                    <thead>
                        <tr>
                            <th width="100">Sr. No.</th>
                            <th width="200">Name</th>
                            <th width="200">Email</th>
                            <th width="150">Phone</th>
                            <th width="150">Role</th>
                            <th width="150">Updated At</th>
                            <th width="150">Created At</th>
                            <th width="150">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workSpaceUsers.map((user, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{user?.fname} {user?.lname}</td>
                                <td>{user?.email}</td>
                                <td>{user?.phone}</td>
                                <td>{user?.role}</td>
                                <td>{moment(user?.updated_at).format("DD-MM-YYYY")}</td>
                                <td>{moment(user?.created_at).format("DD-MM-YYYY")}</td>
                                <td>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                                        <Button variant="solid" onClick={() => editAddOrEditUserModal(user)}>Edit</Button>
                                        <Button variant="solid" color='danger' onClick={() => { }}>Delete</Button>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Box>

            {
                addorEditUserModal.open &&
                <Pro_AddOrEditUser open={true} onClose={closeAddorEditUserModal} type={addorEditUserModal?.type} data={addorEditUserModal?.data} onSubmit={addorEditUserModal?.type == "new" ? addWorkSpaceUser : {}} />
            }
        </>
    )
}

export default Pro_Users