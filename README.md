
[![Deploy Status](https://img.shields.io/badge/deploy-active-brightgreen)](https://aiops-ew1k.onrender.com)
[![Tests](https://github.com/amurpo/aiops/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/amurpo/aiops/actions)
# 🤖 API DevOps Inteligente

Una API REST desarrollada con Express.js que integra OpenAI para crear flujos inteligentes de DevOps con CI/CD automatizado.

## 🎯 Características

- **Integración OpenAI**: Endpoint `/chat` para generar respuestas inteligentes
- **Monitoreo**: Endpoint `/status` para verificar la salud de la API
- **Validación robusta**: Middleware de validación y manejo de errores
- **CI/CD automatizado**: Pipeline completo con GitHub Actions
- **Testing**: Suite de tests con Jest y Supertest
- **Código limpio**: Configuración ESLint y mejores prácticas

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.0.0
- npm o yarn
- Cuenta de OpenAI con API key

### Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repo>
cd ai-devops-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`

## 📚 API Endpoints

### 🏠 Endpoint Principal
```
GET /
```
Información general de la API y endpoints disponibles.

### 📖 Documentación Interactiva
```
GET /docs
```
Documentación Swagger UI interactiva donde puedes:
- Ver todos los endpoints disponibles
- Probar las APIs directamente desde el navegador
- Ver ejemplos de requests y responses
- Entender todos los parámetros y schemas

**URLs disponibles:**
- **Local**: `http://localhost:3000/docs`
- **Producción**: `https://tu-servicio.onrender.com/docs`

### 💬 Chat con IA
```
POST /api/v1/chat
```

**Cuerpo de la petición:**
```json
{
  "message": "¿Cómo configurar un pipeline de CI/CD?",
  "model": "gpt-3.5-turbo"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "message": "Para configurar un pipeline de CI/CD...",
    "model": "gpt-3.5-turbo",
    "usage": {...},
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### 📊 Estado de la API
```
GET /api/v1/status
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "status": "active",
    "timestamp": "2024-01-15T10:30:00Z",
    "uptime": 3600,
    "services": {
      "openai": "connected"
    }
  }
}
```

### 🏥 Health Check
```
GET /api/v1/status/health
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm test -- --coverage
```

## 🔍 Linting

```bash
# Verificar código
npm run lint

# Corregir automáticamente
npm run lint:fix
```

## 🚢 Deployment

### Con Render.com

1. **Crear cuenta en [Render.com](https://render.com)**
2. **Conectar tu repositorio de GitHub**
3. **Crear un Web Service:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: `18` o superior
4. **Configurar variables de entorno:**
   - `OPENAI_API_KEY=tu-openai-api-key`
   - `NODE_ENV=production`
   - `PORT=10000` (Render usa puerto 10000)
5. **El deployment es automático** cuando se hace push a `main`

### Variables de entorno requeridas

| Variable | Descripción | Requerido | Default |
|----------|-------------|-----------|---------|
| `OPENAI_API_KEY` | API Key de OpenAI | ✅ | - |
| `PORT` | Puerto del servidor | ❌ | 3000 |
| `NODE_ENV` | Entorno de ejecución | ❌ | development |
| `LOG_LEVEL` | Nivel de logging | ❌ | info |

## 🔄 Pipeline CI/CD

El pipeline incluye:

1. **🧪 Testing**: Ejecuta tests unitarios
2. **🔍 Linting**: Valida calidad de código con ESLint
3. **🏗️ Build**: Verifica que la aplicación construye correctamente
4. **🚀 Deploy**: Despliega automáticamente a producción (solo desde `main`)

### Configuración de Secrets

En tu repositorio de GitHub, configura estos secrets:

- `RENDER_API_KEY`: API key de Render
- `RENDER_SERVICE_ID`: ID del servicio en Render

## 🏗️ Estructura del Proyecto

```
├── src/
│   ├── routes/          # Rutas de la API
│   ├── middleware/      # Middlewares personalizados
│   └── tests/          # Tests unitarios
├── docs/
│   └── openapi.yml      # Documentación OpenAPI/Swagger
├── .github/workflows/  # GitHub Actions
├── server.js          # Servidor principal
├── .env.example       # Ejemplo de variables
├── package.json       # Dependencias del proyecto
└── README.md         # Esta documentación
```

## 🛡️ Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Control de acceso de origen cruzado
- **Validación**: Sanitización de inputs
- **Rate limiting**: Prevención de abuso de API
- **Error handling**: No exposición de información sensible

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Ejecuta la aplicación en producción |
| `npm run dev` | Ejecuta con nodemon para desarrollo |
| `npm test` | Ejecuta la suite de tests |
| `npm run test:watch` | Ejecuta tests en modo watch |
| `npm run test:coverage` | Ejecuta tests con reporte de cobertura |
| `npm run lint` | Verifica el código con ESLint |
| `npm run lint:fix` | Corrige automáticamente errores de ESLint |

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🔗 Enlaces Útiles

- [Documentación de OpenAI](https://platform.openai.com/docs)
- [Express.js](https://expressjs.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Render.com](https://render.com/)

---

⭐ **¡No olvides dar una estrella al proyecto si te fue útil!**
