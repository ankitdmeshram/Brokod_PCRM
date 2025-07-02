import * as React from 'react';
import {
    Modal,
    ModalDialog,
    Typography,
    ModalClose,
    Button,
    Sheet,
    Box,
    Stack
} from '@mui/joy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SuccessModal({ open, onClose, message = "Action completed successfully!" }) {
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
                    <CheckCircleIcon sx={{ fontSize: "5rem", color: 'success.500' }} />
                </Box>
                <Typography level="h2" color="success" sx={{ mb: 2 }}>
                    Success
                </Typography>
                <Typography level="body-lg" sx={{ mb: 3 }}>
                    {message}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="solid" sx={{ width: 100 }} color="success" onClick={onClose}>
                        Okay
                    </Button>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}
