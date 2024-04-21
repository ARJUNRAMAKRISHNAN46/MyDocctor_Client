import axios from "axios";
export const authbaseUrl = String(import.meta.env.VITE_AUTHENTICATION_SERVICE_URI);

export const AuthAxios = axios.create({
    baseURL: authbaseUrl,
    withCredentials: true
});