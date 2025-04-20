// Function to get CSRF token from cookies
export const getCSRFToken = async () => {
    const response = await fetch('/api/csrf/restore');
    const data = await response.json();
    return data.csrf_token;
};
