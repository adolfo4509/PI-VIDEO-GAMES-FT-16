/**
 * Middleware para configurar CORS (Cross-Origin Resource Sharing)
 * Maneja solicitudes desde diferentes orígenes de manera segura
 */
const HEADER_CONFIG = require("../config/headers");

const corsConfig = (req, res, next) => {
    // Orígenes permitidos (configurables por entorno)
    const allowedOrigins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://192.168.80.18:3000',
        process.env.FRONTEND_URL // Para producción
    ].filter(Boolean); // Filtrar valores undefined

    const origin = req.headers.origin;

    // Verificar si el origen está permitido
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Headers CORS desde configuración centralizada
    Object.entries(HEADER_CONFIG.CORS).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    next();
};

module.exports = corsConfig;