export const domainName = () => {
    console.log(window.location.hostname);
    return window.location.hostname == 'localhost' ? 'http://localhost:5000' : 'https://pcrm-back.brokod.com';
}

export const validateEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const getCookie = async (name) => {
    const cookies = await document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
};

export const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const postAPI = async (url, data) => {
    try {
        const userDataCookie = await getCookie('ud');
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userDataCookie,
            },
            body: JSON.stringify(data),
        });
        return response.json().then((res) => res)
    } catch (error) {
        alert("Failed to connect to the server. Please try again later.");
        return error
    }
}