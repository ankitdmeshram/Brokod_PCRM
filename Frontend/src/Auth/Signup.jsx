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
    Checkbox,
    Link,
    CssVarsProvider
} from '@mui/joy';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRegister = () => {

        if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!form.agree) {
            alert('Please accept terms and conditions');
            return;
        }

        console.log('Register form submitted:', form);
        // Add registration logic here
    };

    console.log('Form state:', form);

    return (
        <CssVarsProvider>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', sm: 400, md: 700 },
                        borderRadius: 'md',
                        boxShadow: 'lg',
                        p: 4,
                        bgcolor: 'background.surface'
                    }}
                >
                    <Typography level="h4" textAlign="center" mb={2}>
                        Create Account
                    </Typography>

                    <Stack
                        direction={{ md: "row", sm: 'column' }}
                        spacing={{ md: 2, sm: 0 }}
                        flex={1}
                    >
                        <FormControl sx={{ flex: 1, paddingTop: "1.25rem" }}>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                name="firstName"
                                placeholder="John"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <FormControl sx={{ flex: 1, paddingTop: "1.25rem" }}>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                name="lastName"
                                placeholder="Doe"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                    </Stack>
                    <Stack
                        direction={{ md: "row", sm: 'column' }}
                        spacing={{ md: 2, sm: 0 }}
                        flex={1}
                    >
                        <FormControl sx={{ flex: 1, paddingTop: "1.25rem" }}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1, paddingTop: "1.25rem" }}>
                            <FormLabel>Phone</FormLabel>
                            <Input
                                type="tel"
                                name="phone"
                                placeholder="1234567890"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                    </Stack>
                    <Stack
                        direction={{ md: "row", sm: 'column' }}
                        spacing={{ md: 2, sm: 0 }}
                        flex={1}
                    >
                        <FormControl sx={{ flex: 1, paddingTop: "1.25rem" }}>
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
                                        onClick={() => setShowPassword((v) => !v)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                }
                                required
                            />
                        </FormControl>

                        <FormControl sx={{ flex: 1, paddingTop: "1.25rem" }}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="••••••••"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                endDecorator={
                                    <IconButton
                                        variant="plain"
                                        onClick={() => setShowPassword((v) => !v)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                }
                                required
                            />
                        </FormControl>

                    </Stack>

                    {/* Agreement and Button */}
                    <Stack spacing={2} mt={3}>
                        <Checkbox
                            name="agree"
                            checked={form.agree}
                            onChange={handleChange}
                            label="I agree to the terms and conditions"
                            size="sm"
                        />

                        <Button fullWidth color="primary" onClick={handleRegister}>
                            Sign Up
                        </Button>
                    </Stack>

                    <Typography level="body-sm" textAlign="center" mt={2}>
                        Already have an account?{' '}
                        <Link href="#" level="body-sm" underline="hover">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}


export default Signup;