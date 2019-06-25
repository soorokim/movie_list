import apisauce from 'apisauce'

const api = apisauce.create({
    baseURL: '',
    headers: {
      'Accept': 'application/json',
    },
});

const axiosConfig = {
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    withCredentails: true,
};

const get = (url, params = {}, extraAxiosConfig = {}) => api.get(url, params, {...axiosConfig, ...extraAxiosConfig});
const post = (url, data, extraAxiosConfig = {}) => api.post(url, data, {...axiosConfig, ...extraAxiosConfig});
const put = (url, data = {}, extraAxiosConfig = {}) => api.put(url, data, {...axiosConfig, ...extraAxiosConfig});
const patch = (url, data, extraAxiosConfig = {}) => api.patch(url, data, {...axiosConfig, ...extraAxiosConfig});
const _delete = (url, data, extraAxiosConfig = {}) => api.delete(url, data, {...axiosConfig, ...extraAxiosConfig});

const METHOD_MAP = {
    'add': post,
    'modify': patch,
    'delete': _delete,
    'select': get,
};

api.addResponseTransform(response => {
    if (response.problem === apisauce.SERVER_ERROR || response.problem === apisauce.NETWORK_ERROR || response.problem === apisauce.TIMEOUT_ERROR || response.problem === apisauce.CONNECTION_ERROR) {
        throw response;
    }

    return response
});

export default {
    genericCRUD: (method = 'select', url, data) => {
        const extraHeaders = {
            headers: {
                'Content-Type': (data instanceof FormData) ? 'multipart/form-data' : '*/*',
                'Access-Control-Allow-Origin': '*'
            }
        };
        let request = METHOD_MAP[method](url, data, extraHeaders);
        return request
    },
}
