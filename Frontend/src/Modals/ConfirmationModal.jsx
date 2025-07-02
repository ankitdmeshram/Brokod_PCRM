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

export default function ConfirmationModal({
    open,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    color = "danger" // Can be "warning" or "danger"
}) {
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
                    <WarningIcon sx={{ fontSize: "5rem", color: `${color}.500` }} />
                </Box>
                <Typography level="h2" color={color} sx={{ mb: 2 }}>
                    {title}
                </Typography>
                <Typography level="body-lg" sx={{ mb: 3 }}>
                    {message}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="outlined"
                        color="neutral"
                        onClick={onClose}
                        sx={{ width: 100 }}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant="solid"
                        color={color}
                        onClick={onConfirm}
                        sx={{ width: 100 }}
                    >
                        {confirmText}
                    </Button>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}
