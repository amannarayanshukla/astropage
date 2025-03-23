import { BACKEND_API_URL } from '../../config';
/**
 * 
 * @param {string: URL to hit} url 
 * @param {string: GET, POST, PUT, PATCH, DELETE} method 
 * @param {any: Data to send along with POST OR PUT reqeust} data 
 * @param {boolean: If function is called for user endpoint or admin} isAdmin 
 * @returns 
 */
const apiClient = async (url, method, data = null, isAdmin = false) => {
    // Set up the headers with authorization only
    const headers = {
        'Authorization': isAdmin
            ? `Bearer ${localStorage.getItem("adminToken")}`
            : `Bearer ${localStorage.getItem("token")}`,
    };

    // If data is not a FormData instance, set Content-Type to application/json
    if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const options = {
        method,
        headers,
    };

    if (data) {
        // For FormData, the browser will handle serialization; otherwise, stringify it.
        options.body = data instanceof FormData ? data : JSON.stringify(data);
    }

    try {
        const response = await fetch(`${BACKEND_API_URL + 'api' + url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};


export default apiClient;