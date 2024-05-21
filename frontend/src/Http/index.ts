import axios from "axios";

const $api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})


$api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const tokenSession = sessionStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }
        else if(tokenSession){
            config.headers.Authorization = `Bearer ${tokenSession}`;
            return config;
        }
        config.headers.Authorization = `Bearer 333`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {
    $api,
    $host
}