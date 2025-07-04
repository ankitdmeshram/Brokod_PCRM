import React, { useContext, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    FormControl,
    FormLabel,
    Input,
    IconButton,
    Stack,
    CssVarsProvider,
    Checkbox,
} from '@mui/joy';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { SIGNIN } from '../Services/api_services';
import { AppContext } from '../Context/AuthContext';
// import SuccessModal from '../Modals/SuccessModal';
// import AlertModal from '../Modals/AlertModal';
// import ConfirmationModal from '../Modals/ConfirmationModal';

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const { setUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.name != "remember" ? e.target.value : e.target.checked
        });
    };

    const handleSignin = async () => {
        const response = await SIGNIN(form)
        if (response && response.success) {
            setUserData(response.user);
            navigate('/dashboard');
        }
    };

    return (
        <CssVarsProvider>
            {/* <SuccessModal open={true} /> */}
            {/* <AlertModal open={true} /> */}
            {/* <ConfirmationModal open={true} /> */}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}
            >
                <Box
                    sx={{
                        width: 350,
                        borderRadius: 'md',
                        boxShadow: 'lg',
                        p: 4,
                        bgcolor: 'background.surface'
                    }}
                >
                    <Typography level="h4" textAlign="center" mb={2}>
                        Signin
                    </Typography>

                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                endDecorator={
                                    <IconButton
                                        variant="plain"
                                        onClick={() => setShowPassword((show) => !show)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                }
                                required
                            />
                        </FormControl>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 1
                            }}
                        >
                            <Checkbox
                                name="remember"
                                label="Remember me"
                                checked={form.remember}
                                onChange={handleChange}
                                size="sm"
                                value={form.remember}
                            />
                            <Link to={"/reset-password"} level="body-sm" underline="hover">
                                Forgot password?
                            </Link>
                        </Box>

                        <Button onClick={handleSignin} fullWidth color="primary">
                            Sign In
                        </Button>
                    </Stack>
                    <Typography level="body-sm" textAlign="center" mt={2}>
                        Don't have an account?{' '}
                        <Link to={"/signup"} level="body-sm" underline="hover">
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default Signin;