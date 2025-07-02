import { Box, Typography, Button, Sheet } from '@mui/joy';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();

    let title = "Unexpected Error";
    let message = "Something went wrong. Please try again later.";

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;
        message = error.data?.message || message;
    } else if (error instanceof Error) {
        message = error.message;
    }

    return (
        <Sheet
            sx={{
                minHeight: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'transparent',
            }}
        >
            <Box
                sx={{
                    maxWidth: 480,
                    textAlign: 'center',
                    p: 4,
                    borderRadius: 'xl',
                    boxShadow: 'lg',
                    backgroundColor: 'background.body',
                }}
            >
                <Typography level="h1" fontSize="xl3" sx={{ mb: 1 }}>
                    {title}
                </Typography>

                <Typography level="body-lg" sx={{ mb: 3 }}>
                    {message}
                </Typography>

                <Button
                    variant="solid"
                    color="primary"
                    onClick={() => window.history.back()}
                >
                    Go Back
                </Button>
                <Button
                    sx={{ ml: 2 }}
                    variant="solid"
                    color="primary"
                    onClick={() => window.location.href = '/'}
                >
                    Go Home
                </Button>
            </Box>
        </Sheet>
    );
}
