// src/services/apiService.js

import axios from 'axios';

// 1. Crea una "instancia" de Axios con la URL base
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
});

apiClient.interceptors.request.use(
    (config) => {
        // 3. Obtiene el token del localStorage
        const token = localStorage.getItem('token');

        // 4. Si el token existe, lo añade a la cabecera "Authorization"
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;