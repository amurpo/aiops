const express = require('express');
const OpenAI = require('openai');
const { validateChatRequest } = require('../middleware/validation');

const router = express.Router();

// Configuración OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * POST /chat - Procesa mensajes con OpenAI
 * @body {string} message - Mensaje del usuario
 * @body {string} [model] - Modelo a usar (opcional)
 */
router.post('/', validateChatRequest, async (req, res) => {
  try {
    const { message, model = 'gpt-3.5-turbo' } = req.body;
    
    console.log(`💬 Procesando mensaje: ${message.substring(0, 50)}...`);
    
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente de DevOps inteligente. Proporciona respuestas técnicas precisas y útiles.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    
    res.json({
      success: true,
      data: {
        message: response,
        model,
        usage: completion.usage,
        timestamp: new Date().toISOString()
      }
    });

    console.log('✅ Respuesta generada exitosamente');
    
  } catch (error) {
    console.error('❌ Error en OpenAI:', error.message);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        success: false,
        error: 'Cuota de API agotada. Intenta más tarde.',
        code: 'QUOTA_EXCEEDED'
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({
        success: false,
        error: 'API Key inválida',
        code: 'INVALID_KEY'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

module.exports = router;