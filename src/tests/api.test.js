const request = require('supertest');
const app = require('../../server');

describe('API Tests', () => {
  
  // Test para la ruta raíz
  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
        
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  // Tests para el endpoint de status
  describe('GET /api/v1/status', () => {
    it('should return status information', async () => {
      const response = await request(app)
        .get('/api/v1/status')
        .expect(200);
        
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('status');
      expect(response.body.data).toHaveProperty('timestamp');
      expect(response.body.data).toHaveProperty('uptime');
    });
  });

  describe('GET /api/v1/status/health', () => {
    it('should return health check', async () => {
      const response = await request(app)
        .get('/api/v1/status/health')
        .expect(200);
        
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  // Tests para el endpoint de chat
  describe('POST /api/v1/chat', () => {
    it('should reject request without message', async () => {
      const response = await request(app)
        .post('/api/v1/chat')
        .send({})
        .expect(400);
        
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('El campo "message" es requerido');
    });

    it('should reject empty message', async () => {
      const response = await request(app)
        .post('/api/v1/chat')
        .send({ message: '' })
        .expect(400);
        
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('El mensaje no puede estar vacío');
    });

    it('should reject message that is too long', async () => {
      const longMessage = 'a'.repeat(4001);
      const response = await request(app)
        .post('/api/v1/chat')
        .send({ message: longMessage })
        .expect(400);
        
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('El mensaje excede el límite de 4000 caracteres');
    });

    it('should reject non-string message', async () => {
      const response = await request(app)
        .post('/api/v1/chat')
        .send({ message: 123 })
        .expect(400);
        
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('El campo "message" debe ser una cadena de texto');
    });

    it('should reject non-string model', async () => {
      const response = await request(app)
        .post('/api/v1/chat')
        .send({ 
          message: 'Hello',
          model: 123
        })
        .expect(400);
        
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('El campo "model" debe ser una cadena de texto');
    });

    it('should reject invalid model', async () => {
      const response = await request(app)
        .post('/api/v1/chat')
        .send({ 
          message: 'Hello', 
          model: 'invalid-model' 
        })
        .expect(400);
        
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Modelo no soportado');
    });

    // Este test necesita una API key válida para funcionar
    it('should handle missing OpenAI API key', async () => {
      // Temporarily remove API key
      const originalKey = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;
      
      const response = await request(app)
        .post('/api/v1/chat')
        .send({ message: 'Hello world' });
        
      // Restore API key
      process.env.OPENAI_API_KEY = originalKey;
      
      // Should handle the error gracefully
      expect([401, 429, 500]).toContain(response.status);
      expect(response.body.success).toBe(false);
    });
  });

  // Tests para rutas no encontradas
  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/non-existent')
        .expect(404);
        
      expect(response.body.error).toBe('Endpoint no encontrado');
      expect(response.body.path).toBe('/api/non-existent');
    });
  });

  // Tests para manejo de errores
  describe('Error Handling', () => {
    it('should handle invalid JSON', async () => {
      const response = await request(app)
        .post('/api/v1/chat')
        .set('Content-Type', 'application/json')
        .send('{"invalid": json}')
        .expect(400);
        
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('JSON inválido en el cuerpo de la petición');
    });

    it('should handle large payloads', async () => {
      const largePayload = JSON.stringify({
        message: 'a'.repeat(15 * 1024 * 1024) // 15MB payload
      });

      const response = await request(app)
        .post('/api/v1/chat')
        .set('Content-Type', 'application/json')
        .send(largePayload)
        .expect(413);
        
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('El cuerpo de la petición es demasiado grande');
    });
  });

  // Tests adicionales para coverage
  describe('Status Error Handling', () => {
    it('should handle OpenAI connection errors gracefully', async () => {
      // Mock OpenAI to throw connection error
      const originalApiKey = process.env.OPENAI_API_KEY;
      process.env.OPENAI_API_KEY = 'invalid-key-format';
      
      const response = await request(app)
        .get('/api/v1/status')
        .expect(200);
        
      expect(response.body.success).toBe(true);
      expect(response.body.data.services.openai).toBe('error');
      
      // Restore API key
      process.env.OPENAI_API_KEY = originalApiKey;
    });
  });
});