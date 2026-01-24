import AuthToken from "../types/AuthToken";
import { getToken } from "../auth/tokenStorage";

import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:8000"; // CHANGE THIS if needed!

type ErrorResponse = {
    errMsg: string;
};

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

api.interceptors.request.use((config) => {
    const token: AuthToken | null = getToken();
    if (token === null) {
        return config;
    }
    config.headers.Authorization = "Bearer " + token;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (err: AxiosError<ErrorResponse>) => {
        let msg = "";
        if (err.response && err.response.data && err.response.data.errMsg) {
            // server did respond
            msg = err.response.data.errMsg;
        } else {
            msg = err.message;
        }
        return Promise.reject(msg);
    },
);

export default api;
