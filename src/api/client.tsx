import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API,
    headers: {
        "Content-Type": "application/json",
    },
})