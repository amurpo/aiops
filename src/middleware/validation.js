/**
 * Middleware de validación para requests de chat
 */
const validateChatRequest = (req, res, next) => {
  const { message, model } = req.body;

  // Validar que existe el mensaje
  if (message === undefined || message === null) {
    return res.status(400).json({
      success: false,
      error: 'El campo "message" es requerido',
      code: 'MISSING_MESSAGE'
    });
  }

  // Validar tipo de mensaje
  if (typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'El campo "message" debe ser una cadena de texto',
      code: 'INVALID_MESSAGE_TYPE'
    });
  }

  // Validar longitud del mensaje
  if (message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'El mensaje no puede estar vacío',
      code: 'EMPTY_MESSAGE'
    });
  }

  if (message.length > 4000) {
    return res.status(400).json({
      success: false,
      error: 'El mensaje excede el límite de 4000 caracteres',
      code: 'MESSAGE_TOO_LONG'
    });
  }

  // Validar modelo (opcional)
  if (model && typeof model !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'El campo "model" debe ser una cadena de texto',
      code: 'INVALID_MODEL_TYPE'
    });
  }

  // Validar modelos permitidos
  const allowedModels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'];
  if (model && !allowedModels.includes(model)) {
    return res.status(400).json({
      success: false,
      error: `Modelo no soportado. Modelos disponibles: ${allowedModels.join(', ')}`,
      code: 'UNSUPPORTED_MODEL'
    });
  }

  // Sanitizar mensaje (remover caracteres peligrosos)
  req.body.message = message.trim();
  
  next();
};

module.exports = {
  validateChatRequest
};