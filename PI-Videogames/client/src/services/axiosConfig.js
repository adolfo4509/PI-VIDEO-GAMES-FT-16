import axios from "axios";
import { BASE_URL } from "../Constantes/Constans";

/**
 * Configuración centralizada de axios con todos los headers de seguridad
 */
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true, // Envía cookies si existen
});

/**
 * Headers configurados (SOLO headers de REQUEST válidos para CORS):
 * 1. Content-Type - Tipo de contenido
 * 2. Accept - Qué formatos acepta
 * 3. X-Requested-With - Identifica solicitudes AJAX
 * 4. Cache-Control - Control de caché
 * 5. User-Agent - Identifica el cliente
 * 6. Authorization - Token JWT (si existe)
 * 7. X-CSRF-Token - Protección CSRF
 */

// Headers por defecto para todas las solicitudes
apiClient.defaults.headers.common = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Cache-Control": "no-cache",


};

/**
 * Interceptor de REQUEST - Agrega headers dinámicos
 */
apiClient.interceptors.request.use(
    (config) => {
        // Agregar token JWT si existe en localStorage
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Agregar CSRF token si existe
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
        if (csrfToken) {
            config.headers["X-CSRF-Token"] = csrfToken;
        }


        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);

/**
 * Interceptor de RESPONSE - Maneja respuestas y errores
 */
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {


        // Manejar errores comunes
        if (error.response?.status === 401) {
            // No autorizado - limpiar token
            localStorage.removeItem("authToken");
            window.location.href = "/login";
        } else if (error.response?.status === 403) {
            console.error("🔒 Acceso Prohibido - CSRF o Permisos insuficientes");
        } else if (error.response?.status === 404) {
            console.error("🔍 Recurso no encontrado");
        } else if (error.response?.status === 500) {
            console.error("⚠️ Error en servidor");
        }

        return Promise.reject(error);
    }
);

export default apiClient;
