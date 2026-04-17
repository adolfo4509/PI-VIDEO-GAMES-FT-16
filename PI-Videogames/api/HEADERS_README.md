# Configuración de Headers HTTP - API VideoGames

## 📋 Headers Configurados

### 🔒 Headers de Seguridad

| Header                         | Valor                                      | Propósito                           |
| ------------------------------ | ------------------------------------------ | ----------------------------------- |
| `X-Content-Type-Options`       | `nosniff`                                  | Previene MIME-sniffing attacks      |
| `X-Frame-Options`              | `DENY`                                     | Previene clickjacking               |
| `X-XSS-Protection`             | `1; mode=block`                            | Protección XSS del navegador        |
| `Referrer-Policy`              | `strict-origin-when-cross-origin`          | Controla información del referrer   |
| `Permissions-Policy`           | `camera=(), microphone=(), geolocation=()` | Bloquea acceso a dispositivos       |
| `Cross-Origin-Embedder-Policy` | `require-corp`                             | Protege contra ataques cross-origin |
| `Cross-Origin-Opener-Policy`   | `same-origin`                              | Aísla el contexto de navegación     |
| `Cross-Origin-Resource-Policy` | `same-origin`                              | Protege recursos cross-origin       |

### 🌐 Headers CORS

| Header                             | Valor                                    | Propósito                     |
| ---------------------------------- | ---------------------------------------- | ----------------------------- |
| `Access-Control-Allow-Origin`      | Dinámico                                 | Origen permitido              |
| `Access-Control-Allow-Credentials` | `true`                                   | Permite cookies/autenticación |
| `Access-Control-Allow-Methods`     | `GET, POST, PUT, DELETE, OPTIONS, PATCH` | Métodos HTTP permitidos       |
| `Access-Control-Allow-Headers`     | Lista completa                           | Headers permitidos            |
| `Access-Control-Max-Age`           | `86400`                                  | Cache de preflight (24h)      |

### 📦 Headers de API

| Header                  | Valor         | Propósito                   |
| ----------------------- | ------------- | --------------------------- |
| `X-API-Version`         | `1.0.0`       | Versión de la API           |
| `X-Timestamp`           | Timestamp ISO | Momento de la respuesta     |
| `X-RateLimit-Limit`     | `1000`        | Límite de requests por hora |
| `X-RateLimit-Remaining` | Dinámico      | Requests restantes          |
| `X-RateLimit-Reset`     | Timestamp     | Cuando se resetea el límite |

### 💾 Headers de Caché

| Método            | Header          | Valor                                 |
| ----------------- | --------------- | ------------------------------------- |
| `GET`             | `Cache-Control` | `public, max-age=300` (5 min)         |
| `POST/PUT/DELETE` | `Cache-Control` | `no-cache, no-store, must-revalidate` |

## 🏗️ Arquitectura de Middlewares

### 1. `requestLogger.js`

- **Propósito**: Logging detallado de requests
- **Incluye**: IP, User-Agent, headers importantes
- **Salida**: Logs en consola con timestamps

### 2. `helmet` (Configurado)

- **Propósito**: Headers de seguridad estándar
- **Incluye**: CSP, HSTS, XSS protection
- **Configuración**: Personalizada para la app

### 3. `securityHeaders.js`

- **Propósito**: Headers de seguridad adicionales
- **Incluye**: COEP, COOP, Permissions Policy
- **Configuración**: Centralizada en `config/headers.js`

### 4. `corsConfig.js`

- **Propósito**: Manejo de CORS
- **Incluye**: Validación de orígenes, preflight
- **Configuración**: Lista blanca de orígenes

### 5. `errorHandler.js`

- **Propósito**: Manejo de errores con headers seguros
- **Incluye**: IDs de error, timestamps, logs detallados
- **Seguridad**: No expone información sensible

## 🔧 Configuración Centralizada

Todos los valores de headers están centralizados en:

```
api/src/config/headers.js
```

Para modificar headers, editar este archivo y reiniciar el servidor.

## 🚀 Uso en Producción

### Variables de Entorno

```bash
FRONTEND_URL=https://tu-dominio.com
NODE_ENV=production
```

### Headers Adicionales para Producción

- `Strict-Transport-Security` (configurado en Helmet)
- `Content-Security-Policy` (configurado en Helmet)
- Headers de rate limiting reales (implementar con middleware dedicado)

## 🧪 Testing

Para verificar que los headers funcionan correctamente:

```bash
# Ver headers de respuesta
curl -I http://localhost:3001/api/videogames/videogames

# Ver headers CORS
curl -H "Origin: http://localhost:3000" -I http://localhost:3001/api/videogames/videogames
```

## 📊 Monitoreo

Los logs incluyen información detallada sobre:

- Headers de request
- Headers de response
- Errores con IDs únicos
- Información de seguridad aplicada
