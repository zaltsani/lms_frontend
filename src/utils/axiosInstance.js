import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Token ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default AxiosInstance