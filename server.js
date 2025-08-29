const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

const chatRoutes = require('./src/routes/chat');
const statusRoutes = require('./src/routes/status');
const { errorHandler } = require('./src/middleware/error');

const app = express();
const PORT = process.env.PORT || 3000;

// Cargar documentación OpenAPI
let swaggerDocument = YAML.load('./docs/openapi.yml');

// Reemplazar variables de entorno en la documentación
const apiBaseUrl = process.env.API_BASE_URL || 'https://aiops-ew1k.onrender.com';
const swaggerString = JSON.stringify(swaggerDocument).replace('${API_BASE_URL}', apiBaseUrl);
swaggerDocument = JSON.parse(swaggerString);

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Documentación Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'AI DevOps API - Documentación'
}));

// Rutas
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/status', statusRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API de IA - DevOps Senior',
    version: '1.0.0',
    endpoints: {
      chat: 'POST /api/v1/chat',
      status: 'GET /api/v1/status',
      docs: 'GET /docs'
    },
    documentation: {
      swagger: '/docs',
      openapi: '/docs/openapi.json'
    }
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

// Solo iniciar servidor si no estamos en tests
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📖 Documentación disponible en http://localhost:${PORT}/`);
  });

  // Manejo graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🔄 Cerrando servidor...');
    server.close(() => {
      console.log('✅ Servidor cerrado correctamente');
    });
  });
}

module.exports = app;