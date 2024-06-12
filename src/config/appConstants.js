const baseUrl = process.env.REACT_APP_URL;

if (!baseUrl) {
    throw new Error("API Url is not provided.");
}
const API_ROUTE = `${baseUrl}`;

export default API_ROUTE;

