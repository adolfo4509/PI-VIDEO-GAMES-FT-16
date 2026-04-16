/**
 * Middleware para manejo de errores con headers de seguridad
 */
const errorHandler = (err, req, res, next) => {
    const timestamp = new Date().toISOString();
    const errorId = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;



    // Determinar código de estado
    const statusCode = err.status || err.statusCode || 500;

    // Headers de seguridad para respuestas de error
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // No exponer información sensible en producción
    const isDevelopment = process.env.NODE_ENV !== 'production';

    const errorResponse = {
        error: {
            id: errorId,
            timestamp,
            message: isDevelopment ? err.message : 'Internal Server Error',
            ...(isDevelopment && { stack: err.stack })
        }
    };

    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;