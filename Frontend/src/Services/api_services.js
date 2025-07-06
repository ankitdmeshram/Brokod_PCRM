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

export const LOGOUT = async () => {
    try {
        // const response = await postAPI(`${domainName()}/api/auth/logout`, {})

        // if (!response || !response.success) {
        //     alert(response?.message || 'Logout failed. Please try again.');
        //     return;
        // }

        // if (response.success) {
        alert('Logout successful!');
        setCookie('ud', '', -1); // Delete cookie
        setCookie('udd', '', -1); // Delete cookie
        // }
        const response = await postAPI(`${domainName()}/api/auth/logout`, {})

        window.location.href = '/signin'; // Redirect to signin page

        // return response
    } catch (error) {
        console.error("Error during logout:", error);
        throw error; // Re-throw the error for further handling
    }
}

export const CREATE_WORKSPACE = async (workspaceData) => {
    try {
        if (!workspaceData.name) {
            alert('Please enter a workspace name');
            return;
        }

        const response = await postAPI(`${domainName()}/api/workspace/create`, workspaceData)

        if (!response || !response.success) {
            alert(response?.message);
            return;
        }

        return response
    } catch (error) {
        console.error("Error during workspace creation:", error);
        throw error; // Re-throw the error for further handling
    }
}

export const UPDATE_WORKSPACE = async (workspaceData) => {
    try {

        if (!workspaceData?.id) {
            alert("Refresh page and please try again!")
        }

        if (!workspaceData.name) {
            alert('Please enter a workspace name');
            return;
        }

        const response = await postAPI(`${domainName()}/api/workspace/update`, workspaceData)

        if (!response || !response.success) {
            alert(response?.message);
            return;
        }

        return response
    } catch (error) {
        console.error("Error during workspace updation:", error);
        throw error; // Re-throw the error for further handling
    }
}

export const GET_WORKSPACES = async () => {
    try {
        const response = await postAPI(`${domainName()}/api/workspace/all`, {})

        if (!response || !response.success) {
            alert(response?.message);
            return;
        }

        return response || [];
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        throw error; // Re-throw the error for further handling
    }
}
export const DELETE_WORKSPACES = async (id) => {
    try {
        const response = await postAPI(`${domainName()}/api/workspace/delete`, { id })

        if (!response || !response.success) {
            alert(response?.message);
            return;
        }

        return response || [];
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        throw error; // Re-throw the error for further handling
    }
}

export const CREATE_PROJECT = async (project) => {
    try {
        if (!project.project_name || !project.owner) {
            alert("Project name and owner are required.");
            return;
        }

        const response = await postAPI(`${domainName()}/api/project/create`, project)

        if (!response || !response.success) {
            alert(response?.message);
            return;
        }

        return response
    } catch (error) {
        console.error("Error during project creation:", error);
        throw error; // Re-throw the error for further handling
    }
}