const { default: axiosClient } = require('./axiosClient');

const staffsApi = {
    getAll: (params) => {
        const url = '/staffs';
        return axiosClient.get(url, { params });
    },
};

export default staffsApi;
