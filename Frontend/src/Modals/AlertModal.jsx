import * as React from 'react';
import {
    Modal,
    ModalDialog,
    Typography,
    ModalClose,
    Button,
    Box,
    Stack
} from '@mui/joy';
import WarningIcon from '@mui/icons-material/Warning';

export default function AlertModal({ open, onClose, title = "Alert", message = "Something went wrong!" }) {
    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                variant="outlined"
                role="alertdialog"
                sx={{
                    borderRadius: 'lg',
                    textAlign: 'center',
                    maxWidth: "90%",
                    minWidth: 600,
                }}
            >
                <ModalClose />
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <WarningIcon sx={{ fontSize: "5rem", color: 'warning.500' }} />
                </Box>
                <Typography level="h2" color="warning" sx={{ mb: 2 }}>
                    {title}
                </Typography>
                <Typography level="body-lg" sx={{ mb: 3 }}>
                    {message}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="solid" sx={{ width: 100 }} color="warning" onClick={onClose}>
                        Close
                    </Button>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}
