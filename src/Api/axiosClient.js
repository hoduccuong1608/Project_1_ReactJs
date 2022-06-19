import axios from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSeriaLizer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.request.use(
    async (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    },
);
export default axiosClient;
