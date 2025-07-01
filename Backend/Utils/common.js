exports.domain = 'http://localhost:5000'; // Update this to your actual domain if needed

exports.validateEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};