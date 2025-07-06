import axios from "axios";
import { API } from "./config";


// There is a standart Axios request that does not require token
export const axiosStandart = axios.create({
    baseURL: API
})


export const axiosRequest = axios.create({
    baseURL: API,
    // headers: {'Authorization' : `Bearer ${localStorage.getItem('tokenForAdmin')}`}

})

axiosRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('tokenForAdmin')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)

