/**
 * Configuración centralizada de headers HTTP para la API
 * Valores por defecto y configuraciones de seguridad
 */

const HEADER_CONFIG = {
    // Headers de seguridad
    SECURITY: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'same-origin'
    },

    // Headers CORS
    CORS: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token, Cache-Control, User-Agent, X-API-Key',
        'Access-Control-Max-Age': '86400', // 24 horas,

    },

    // Headers de caché
    CACHE: {
        GET: 'public, max-age=300', // 5 minutos
        MUTATING: 'no-cache, no-store, must-revalidate'
    },

    // Headers de rate limiting
    RATE_LIMIT: {
        'X-RateLimit-Limit': '1000',
        'X-RateLimit-Remaining': '999',
        'X-RateLimit-Reset': () => new Date(Date.now() + 3600000).toISOString() // 1 hora
    },

    // Headers de API
    API: {
        'X-API-Version': '1.0.0',
        'X-Timestamp': () => new Date().toISOString()
    },

    // Headers a remover
    REMOVE: [
        'X-Powered-By',
        'Server'
    ]
};

module.exports = HEADER_CONFIG;