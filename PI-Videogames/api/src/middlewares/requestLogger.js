/**
 * Middleware para logging detallado de requests HTTP
 * Incluye información de headers, método, URL y timestamp
 */
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';



    // Loggear respuesta cuando termine
    const originalSend = res.send;
    res.send = function (data) {

        originalSend.call(this, data);
    };

    next();
};

module.exports = requestLogger;