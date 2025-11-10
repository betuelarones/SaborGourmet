// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // ¡DEBE SER 'authorities'!
                const userRole = decodedToken.authorities[0];
                setRole(userRole);
            } catch (e) {
                console.error('Token inválido/expirado, borrando:', e);
                localStorage.removeItem('token');
                setRole(null);
            }
        }
        setIsLoading(false);
    }, []);

    return { role, isLoading };
};