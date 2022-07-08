const { default: axiosClient } = require('./axiosClient');

const customersApi = {
    getAll: (params) => {
        const url = '/customers';
        return axiosClient.get(url, { params });
    },
};

export default customersApi;
