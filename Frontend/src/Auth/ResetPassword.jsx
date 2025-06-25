import React, { useState } from 'react';
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
} from '@mui/joy';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

export default function ForgotResetPassword() {
    const [step, setStep] = useState(1); // 1: email, 2: otp & reset
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        email: '',
        otp: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = () => {
        if (!form.email.includes('@')) {
            alert('Please enter a valid email');
            return;
        }

        console.log('Sending OTP to:', form.email);
        // API call to send OTP here
        alert(`OTP sent to ${form.email}`);
        setStep(2);
    };

    const handleResetPassword = () => {
        const { otp, password, confirmPassword } = form;

        if (!otp) {
            alert('Please enter the OTP');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        console.log('Resetting password:', form);
        // API call to reset password
        alert('Password reset successful!');
    };

    return (
        <CssVarsProvider>
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
                        width: { xs: '100%', sm: 400 },
                        borderRadius: 'md',
                        boxShadow: 'lg',
                        p: 4,
                        bgcolor: 'background.surface'
                    }}
                >
                    <Typography level="h4" textAlign="center" mb={2}>
                        {step === 1 ? 'Forgot Password' : 'Reset Password'}
                    </Typography>

                    <Stack spacing={2}>
                        {step === 1 ? (
                            <>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                <Button onClick={handleSendOtp} fullWidth color="primary">
                                    Send OTP
                                </Button>
                            </>
                        ) : (
                            <>
                                <FormControl>
                                    <FormLabel>OTP</FormLabel>
                                    <Input
                                        type="text"
                                        name="otp"
                                        placeholder="Enter OTP"
                                        value={form.otp}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>New Password</FormLabel>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="New password"
                                        value={form.password}
                                        onChange={handleChange}
                                        endDecorator={
                                            <IconButton onClick={() => setShowPassword((v) => !v)}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        }
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input
                                        type={showConfirm ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        endDecorator={
                                            <IconButton onClick={() => setShowConfirm((v) => !v)}>
                                                {showConfirm ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        }
                                    />
                                </FormControl>

                                <Button onClick={handleResetPassword} fullWidth color="primary">
                                    Reset Password
                                </Button>
                            </>
                        )}

                        <Typography level="body-sm" textAlign="center">
                            Back to{' '}
                            <Link to={"/signin"} underline="hover">
                                Login
                            </Link>
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
