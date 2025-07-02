import { domainName, postAPI, setCookie, validateEmail } from "../Utils/Common";

export const SIGNUP = async (body) => {
    try {
        if (!body.fname || !body.lname || !body.email || !body.phone || !body.password || !body.confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (body.password !== body.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!body.agree) {
            alert('Please agree to the terms and conditions');
            return;
        }

        if (!validateEmail(body.email)) {
            alert('Please enter a valid email address');
            return;
        }

        const response = await postAPI(`${domainName()}/api/auth/signup`, body)

        if (!response || !response.success) {
            alert(response?.message || 'Signup failed. Please try again.');
            return;
        }

        if (response.success) {
            alert('Signup successful!');
            setCookie('ud', response.token, 30); // Set cookie for 30 days
            setCookie('udd', JSON.stringify(response.user), 30); // Set cookie for 30 days
        }

        return response
    } catch (error) {
        console.error("Error during signup:", error);
        throw error; // Re-throw the error for further handling
    }
}

export const SIGNIN = async (body) => {
    try {
        if (!body.email || !body.password) {
            alert('Please fill in all fields');
            return;
        }

        if (!validateEmail(body.email)) {
            alert('Please enter a valid email address');
            return;
        }

        const response = await postAPI(`${domainName()}/api/auth/signin`, body)

        if (!response || !response.success) {
            alert(response?.message || 'Login failed. Please try again.');
            return;
        }

        if (response.success) {
            alert('Login successful!');
            setCookie('ud', response.token, 30); // Set cookie for 30 days
            setCookie('udd', JSON.stringify(response.user), 30); // Set cookie for 30 days
        }

        return response
    } catch (error) {
        console.error("Error during signin:", error);
        throw error; // Re-throw the error for further handling
    }
}