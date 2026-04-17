/**
 * Middleware para configurar headers de seguridad HTTP
 * Incluye protección contra ataques comunes y mejores prácticas de seguridad
 */
const HEADER_CONFIG = require("../config/headers");

const securityHeaders = (req, res, next) => {
    // Headers de seguridad básicos
    Object.entries(HEADER_CONFIG.SECURITY).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    // Headers a remover
    HEADER_CONFIG.REMOVE.forEach(header => {
        res.removeHeader("X-Powered-By Express");
        res.removeHeader("Server");
    });

    // Headers de control de caché
    if (req.method === 'GET') {
        res.setHeader('Cache-Control', HEADER_CONFIG.CACHE.GET);
    } else {
        res.setHeader('Cache-Control', HEADER_CONFIG.CACHE.MUTATING);
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }

    // Headers de rate limiting
    Object.entries(HEADER_CONFIG.RATE_LIMIT).forEach(([key, value]) => {
        res.setHeader(key, typeof value === 'function' ? value() : value);
    });

    // Headers de API
    Object.entries(HEADER_CONFIG.API).forEach(([key, value]) => {
        res.setHeader(key, typeof value === 'function' ? value() : value);
    });

    next();
};

module.exports = securityHeaders;