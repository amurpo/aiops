const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

/**
 * GET /status - Verifica el estado de la API
 */
router.get('/', async (req, res) => {
  const startTime = Date.now();
  
  try {
    // Verificar estado básico
    const basicStatus = {
      status: 'active',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    };

    // Verificar conexión OpenAI si la key está disponible
    let openaiStatus = 'not_configured';
    if (process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY
        });
        
        // Test simple para verificar conectividad
        await openai.models.list();
        openaiStatus = 'connected';
      } catch (error) {
        openaiStatus = 'error';
        console.warn('⚠️  OpenAI connection test failed:', error.message);
      }
    }

    const responseTime = Date.now() - startTime;

    res.json({
      success: true,
      data: {
        ...basicStatus,
        services: {
          openai: openaiStatus,
          database: 'not_required',
          external_apis: 'healthy'
        },
        performance: {
          response_time_ms: responseTime,
          cpu_usage: process.cpuUsage(),
          load_average: require('os').loadavg()
        }
      }
    });

  } catch (error) {
    console.error('❌ Error en status check:', error.message);
    
    res.status(500).json({
      success: false,
      error: 'Error verificando el estado del sistema',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /status/health - Health check simple
 */
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});

module.exports = router;