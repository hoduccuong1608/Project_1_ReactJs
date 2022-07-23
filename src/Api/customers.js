const { default: axiosClient } = require('./axiosClient');

const customersApi = {
    getAll: (params) => {
        const url = '/customers/list';
        return axiosClient.get(url, { params });
    },
};

export default customersApi;
