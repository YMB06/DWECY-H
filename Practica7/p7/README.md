# 💼 Práctica 7: Job Tracker - Gestor de Candidaturas

Aplicación CRUD para gestionar candidaturas de trabajo con API REST simulada, Axios y Pinia.

## 🎯 Objetivo

Simular un entorno de trabajo real donde backend y frontend están separados, trabajando con APIs REST, CORS, y documentación de peticiones.

## 📋 Parte 1: Creación de la API Simulada (Beeceptor)

### Configuración de Beeceptor

1. **Crear endpoint:**
   - Ir a [Beeceptor](https://beeceptor.com/)
   - Crear un nuevo endpoint gratuito (ej: `your-endpoint.free.beeceptor.com`)

2. **Configurar ruta /jobs:**
   - Crear ruta que acepte: GET, POST, PUT, DELETE

3. **Solución CORS:**
   - Ir a "Mocking Rules"
   - Crear regla para interceptar OPTIONS (Preflight)
   - Configurar respuesta:
     ```
     Status: 200
     Headers:
       Access-Control-Allow-Origin: *
       Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
       Access-Control-Allow-Headers: Content-Type, Authorization
     ```

4. **Datos de ejemplo:**
   ```json
   [
     {
       "id": 1,
       "empresa": "Google",
       "puesto": "Frontend Developer",
       "estado": "CV Enviado",
       "fechaEnvio": "2024-01-15"
     },
     {
       "id": 2,
       "empresa": "Microsoft",
       "puesto": "Full Stack Developer",
       "estado": "Entrevista Técnica",
       "fechaEnvio": "2024-01-10"
     }
   ]
   ```

## 📮 Parte 2: Documentación con Postman

### Crear Colección "JobTracker API"

1. **GET /jobs** - Obtener todas las candidaturas
   ```
   Method: GET
   URL: https://your-endpoint.free.beeceptor.com/jobs
   Headers: Content-Type: application/json
   ```

2. **POST /jobs** - Crear nueva candidatura
   ```
   Method: POST
   URL: https://your-endpoint.free.beeceptor.com/jobs
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
     "empresa": "Amazon",
     "puesto": "Backend Developer",
     "estado": "CV Enviado"
   }
   ```

3. **PUT /jobs/:id** - Actualizar estado
   ```
   Method: PUT
   URL: https://your-endpoint.free.beeceptor.com/jobs/1
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
     "estado": "Entrevista Técnica"
   }
   ```

4. **DELETE /jobs/:id** - Eliminar candidatura
   ```
   Method: DELETE
   URL: https://your-endpoint.free.beeceptor.com/jobs/1
   ```

### Exportar Colección
- Clic en los 3 puntos de la colección
- Export → Collection v2.1
- Guardar como `JobTracker_API.postman_collection.json`

## 💻 Parte 3: Frontend (Vue 3 + TypeScript)

### Estructura del Proyecto

```
src/
├── components/
│   └── ej1-job-tracker/        # Ejercicio 1
│       ├── JobTracker.vue      # Componente principal
│       ├── JobList.vue         # Lista de candidaturas
│       ├── JobCard.vue         # Tarjeta individual
│       └── JobForm.vue         # Formulario crear/editar
├── stores/
│   └── ej1/
│       └── jobStore.ts         # Pinia store
├── services/
│   ├── api.ts                  # Instancia Axios
│   └── jobService.ts           # Servicios API
├── types/
│   └── job.ts                  # Interfaces TypeScript
└── views/
    └── Ejercicio1View.vue      # Vista principal
```

### Configuración

1. **Actualizar URL de Beeceptor:**
   Editar `src/services/api.ts`:
   ```typescript
   baseURL: 'https://your-endpoint.free.beeceptor.com'
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar:**
   ```bash
   npm run dev
   ```

## 🎨 Características Implementadas

### ✅ Axios Configurado
- Instancia personalizada con `baseURL` y `timeout`
- Interceptors para manejo de errores
- Headers configurados

### ✅ Pinia Store
- Estado reactivo con `ref()`
- Acciones asíncronas con try/catch
- Gestión de loading y errores
- CRUD completo

### ✅ Componentes Vue
- **JobTracker**: Componente principal con modal
- **JobList**: Grid de candidaturas con estados
- **JobCard**: Tarjeta individual con acciones
- **JobForm**: Formulario reactivo con validación

### ✅ Funcionalidades
- Listar todas las candidaturas
- Crear nueva candidatura
- Actualizar estado (dropdown)
- Eliminar candidatura (con confirmación)
- Estados visuales por tipo
- Loading states
- Error handling

## 🎯 Estados de Candidatura

- 📧 **CV Enviado** - Estado inicial
- 💻 **Entrevista Técnica** - Prueba técnica
- 👔 **Entrevista RRHH** - Entrevista con recursos humanos
- ✅ **Oferta Recibida** - Oferta de trabajo recibida
- ❌ **Rechazado** - Candidatura rechazada

## 🔧 Tecnologías Utilizadas

- **Vue 3** - Composition API
- **TypeScript** - Tipado estático
- **Pinia** - Gestión de estado
- **Axios** - Cliente HTTP
- **Beeceptor** - API simulada
- **Postman** - Documentación API

## 📊 Flujo de Datos

```
Usuario → Componente → Store (Pinia) → Service → Axios → API (Beeceptor)
                                                              ↓
Usuario ← Componente ← Store (Pinia) ← Service ← Axios ← Respuesta
```

## 🐛 Solución de Problemas

### Error CORS
- Verificar configuración en Beeceptor
- Comprobar headers en Mocking Rules
- Revisar que OPTIONS esté permitido

### Error 404
- Verificar URL en `api.ts`
- Comprobar que la ruta `/jobs` existe en Beeceptor

### No se actualizan los datos
- Verificar que el store se está llamando correctamente
- Comprobar respuesta de la API en Network tab
- Revisar que los IDs coinciden

## 📝 Entregables

1. ✅ Código fuente del proyecto Vue
2. ✅ Colección de Postman exportada (.json)
3. ✅ URL del endpoint de Beeceptor
4. ✅ Capturas de pantalla de la aplicación funcionando

## 🎓 Conceptos Aplicados

- Programación asíncrona (async/await)
- Promesas y manejo de errores
- HTTP REST API
- CORS y preflight requests
- Estado global con Pinia
- Composición de componentes
- TypeScript interfaces
- Axios interceptors
