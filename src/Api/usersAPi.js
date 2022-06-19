const { default: axiosClient } = require('./axiosClient');

const usersApi = {
    getAll: (params) => {
        const url = '/users';
        return axiosClient.get(url, { params });
    },
};

export default usersApi;
