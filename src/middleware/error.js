/**
 * Middleware global para manejo de errores
 */
const errorHandler = (err, req, res, _next) => {
  console.error('🔥 Error capturado:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Error de validación de JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'JSON inválido en el cuerpo de la petición',
      code: 'INVALID_JSON'
    });
  }

  // Error de payload demasiado grande
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: 'El cuerpo de la petición es demasiado grande',
      code: 'PAYLOAD_TOO_LARGE'
    });
  }

  // Error de timeout
  if (err.code === 'ETIMEDOUT') {
    return res.status(504).json({
      success: false,
      error: 'Timeout en la petición',
      code: 'TIMEOUT'
    });
  }

  // Error de conexión
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      error: 'Servicio no disponible temporalmente',
      code: 'SERVICE_UNAVAILABLE'
    });
  }

  // Error genérico del servidor
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : err.message,
    code: 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = {
  errorHandler
};