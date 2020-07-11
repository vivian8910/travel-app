const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:1337' : 'https://travel-app-seven.vercel.app';

export const listLogEntries = async () => {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export const createLogEntry = async (entry) => {
    const apiKey = entry.apiKey;
    delete entry.apiKey;
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-API-KEY': apiKey
        },
        body: JSON.stringify(entry)
    });
    const json = await response.json();
    if (response.ok) {
        return json;
    }
    const error = new Error(json.message);
    error.response = json;
    throw error;
}
