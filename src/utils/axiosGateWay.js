import axios from "axios";

/**
 * Axios Interceptor docs - https://axios-http.com/docs/interceptors
 */

const BASE_URL = process.env.REACT_APP_URL;
const apiGateWay = axios.create({
    baseURL: BASE_URL
});

apiGateWay.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error?.response && [401, 498].includes(error.response.status)) {
            window.location.reload()
        }
        const errorObj = {
            message: error?.response?.data?.message,
            error: error?.response?.data?.error,
            status: error?.response?.status
        }
        throw errorObj
    }
);

apiGateWay.interceptors.request.use((config) => {
    try {
        const local = localStorage.getItem("isloggedin") || false;
        const data = JSON.parse(local)
        const tempConfig = {
            ...config,
            // headers: {
            //     ...config.headers,
            //     Authorization: `Bearer ${data.token}`,
            // },
        };
        tempConfig.headers = data.token ? {
            ...config.headers,
            Authorization: `Bearer ${data.token}`,
        } : {
            ...config.headers,
        };
        return tempConfig;
    } catch (error) {
        console.log(error)
        // console.error(`apiGateWay.interceptors.request Error : -`, error);
    }
});

export default apiGateWay;
