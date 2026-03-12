# GitHub DevHub - Panel Seguro

## 📋 Descripción

**GitHub DevHub** es una aplicación Vue 3 que implementa un dashboard privado con autenticación OAuth mediante Firebase. La aplicación demuestra buenas prácticas de seguridad incluyendo:

- ✅ Autenticación OAuth (GitHub y Google)
- ✅ Gestión automática de tokens Bearer
- ✅ Interceptores de Axios para peticiones y respuestas
- ✅ Manejo global de errores de autenticación (401, 403)
- ✅ Sistema de notificaciones Toast
- ✅ Pruebas unitarias con Vitest

## 🚀 Instalación y Setup

### Requisitos
- Node.js >= 16
- npm o yarn

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita autenticación con GitHub y Google
4. Copia tus credenciales

### 3. Crear archivo .env
Crea un archivo `.env` basado en `.env.example`:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Ejecutar la aplicación
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── LoginButton.vue      # Interfaz de login con GitHub y Google
│   └── Toast.vue            # Sistema de notificaciones emergentes
├── config/
│   └── firebase.ts          # Configuración de Firebase
├── services/
│   ├── api.ts              # Servicio Axios con interceptores
│   └── auth.ts             # Capa de servicio de autenticación
├── stores/
│   ├── auth.ts             # Store Pinia para autenticación
│   └── toast.ts            # Store Pinia para notificaciones
├── types/
│   └── auth.ts             # Tipos TypeScript para autenticación
├── views/
│   ├── LoginView.vue       # Página de login
│   └── DashboardView.vue   # Panel privado (requiere autenticación)
├── router/
│   └── index.ts            # Configuración de Vue Router
├── __tests__/
│   ├── api.spec.ts         # Pruebas del servicio Axios
│   ├── auth.spec.ts        # Pruebas del store de autenticación
│   └── toast.spec.ts       # Pruebas del store de notificaciones
└── App.vue                 # Componente raíz
```

## 🔐 Características de Seguridad

### 1. OAuth Simplificado

El flujo de autenticación se realiza mediante Firebase. Se extrae el Bearer Token automáticamente:

```typescript
// Iniciar sesión con GitHub
const result = await authStore.loginWithGitHub();
// El token se almacena en Pinia y localStorage automáticamente
```

**Ubicación:** [src/stores/auth.ts](src/stores/auth.ts)

### 2. Interceptores de Petición

Se inyecta automáticamente el header `Authorization: Bearer <token>` en todas las peticiones:

```typescript
this.instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  
  return config;
});
```

**Ubicación:** [src/services/api.ts](src/services/api.ts)

### 3. Interceptores de Respuesta - **Manejo de Errores 401/403**

Se capturan errores 401 y 403 para manejarlos globalmente:

```typescript
this.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    
    // Se dispara cuando el servidor devuelve 401 o 403
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Automáticamente se limpia el token
      authStore.logout();
      
      // Se emite un evento para mostrar Toast de error
      const event = new CustomEvent('sessionExpired', {
        detail: {
          message: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
          type: 'error',
        },
      });
      window.dispatchEvent(event);
    }
    
    return Promise.reject(error);
  }
);
```

**Ubicación:** [src/services/api.ts](src/services/api.ts)

### 4. Notificaciones Toast

Los errores se muestran mediante notificaciones emergentes rojas:

```typescript
// En el componente Toast.vue
window.addEventListener('sessionExpired', (event: any) => {
  toastStore.addToast(
    event.detail.message || 'Tu sesión ha expirado',
    'error',
    5000  // Durará 5 segundos
  );
});
```

**Ubicación:** [src/components/Toast.vue](src/components/Toast.vue)

## ✅ Pruebas con Vitest

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar en modo watch (desarrollo)
```bash
npm test -- --watch
```

### Pruebas Implementadas

#### 1. **PRUEBA OBLIGATORIA: Error 401 y Limpieza de Token**

Esta es la prueba crítica que verifica todo el flujo de seguridad:

```typescript
// src/__tests__/api.spec.ts
it('should clear token on 401 Unauthorized error', async () => {
  const testToken = 'test-token';
  authStore.setToken(testToken);  // Usuario autenticado
  
  mockAxios.onGet('/api/protected').reply(401);  // API devuelve 401
  
  try {
    await apiService.get('/api/protected');
  } catch (error) {}
  
  // VERIFICAR: El token debe ser limpiado automáticamente
  expect(authStore.token).toBeNull();
  expect(localStorage.getItem('authToken')).toBeNull();
});
```

**¿Qué prueba?**
- ✅ El interceptor de respuesta detecta el error 401
- ✅ Automáticamente limpia el token del store
- ✅ Automáticamente limpia el token de localStorage
- ✅ Llama a la función `logout()` correctamente

#### 2. Interceptor de Petición - Inyección de Token

```typescript
it('should inject Authorization header when token exists', async () => {
  authStore.setToken('test-token-123');
  mockAxios.onGet('/api/test').reply(200);
  
  await apiService.get('/api/test');
  
  const request = mockAxios.history.get[0];
  expect(request.headers.Authorization).toBe('Bearer test-token-123');
});
```

**¿Qué prueba?**
- ✅ El token se inyecta correctamente en el header
- ✅ El formato Bearer está correcto
- ✅ Sin token, el header no se envía

#### 3. Manejo de todos los errores

- ✅ Error 401: Limpia token
- ✅ Error 403: Limpia token
- ✅ Error 404: NO limpia token
- ✅ Error 500: NO limpia token

#### 4. Métodos HTTP

- ✅ GET, POST, PUT, DELETE funcionan correctamente
- ✅ Preservan el token en peticiones exitosas

### Herramientas de Prueba Utilizadas

- **Vitest**: Framework de pruebas basado en Vite
- **axios-mock-adapter**: Simula respuestas HTTP **sin hacer peticiones reales a la red**
- **Pinia**: State management para tests
- **jsdom**: DOM virtual para tests

## 🎯 Flujo Seguro de Uso

1. **Usuario no autenticado**: 
   ```
   ✓ Ve página de login
   ✓ Botones de "GitHub" y "Google"
   ```

2. **Hace clic en un proveedor**:
   ```
   ✓ Se abre diálogo de autenticación de Firebase
   ✓ Usuario ingresa credenciales reales
   ✓ Firebase valida y devuelve token
   ```

3. **Autenticación exitosa**:
   ```
   ✓ Token se guarda en localStorage
   ✓ Token se guarda en Pinia store
   ✓ Se redirige a /dashboard
   ```

4. **Petición de API con interceptor**:
   ```
   GET /api/data
   ↓
   INTERCEPTOR DE PETICIÓN:
     ├─ ✓ Obtiene token de Pinia
     ├─ ✓ Agrega: Authorization: Bearer <token>
     └─ ✓ Envía petición
   ↓
   API responde
   ↓
   INTERCEPTOR DE RESPUESTA:
     ├─ Si 200: ✓ OK, retorna datos
     ├─ Si 401/403: ✗ SESIÓN EXPIRADA
     │   ├─ ✓ Llama logout()
     │   ├─ ✓ Limpia token de Pinia
     │   ├─ ✓ Limpia token de localStorage
     │   ├─ ✓ Emite evento sessionExpired
     │   └─ ✓ Toast rojo aparece
     └─ Si otro error: rechaza promesa
   ```

5. **Si la sesión caduca en medio del uso**:
   ```
   Usuario hace clic en un botón
     ↓
   Petición a API
     ↓
   API devuelve 401 (sesión expirada)
     ↓
   Interceptor captura error
     ↓
   ✓ Token limpiado automáticamente
   ✓ Toast rojo: "Tu sesión ha expirado"
   ✓ Usuario redirigido a login
   ```

## 📝 Configuración de Entorno

Crear archivo `.env` en la raíz:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo (http://localhost:5173)
npm run build    # Compilar para producción
npm run preview  # Vista previa del build
npm test         # Ejecutar pruebas (modo no-watch)
npm test -- --watch  # Ejecutar pruebas en modo watch
npm test -- --ui     # Ver pruebas en interfaz gráfica
```

## 📚 Tecnologías Usadas

| Tecnología | Propósito |
|-----------|-----------|
| **Vue 3** | Framework progressive |
| **TypeScript** | Tipado fuerte |
| **Pinia** | State management (autenticación y toasts) |
| **Vue Router** | Enrutamiento y protección de rutas |
| **Firebase Auth** | Autenticación OAuth (GitHub, Google) |
| **Axios** | Cliente HTTP con interceptores |
| **Vitest** | Testing framework |
| **axios-mock-adapter** | Mock de peticiones HTTP |

## 🔗 Archivos Clave

### Autenticación
- [firebase.ts](src/config/firebase.ts) - Configuración de Firebase
- [auth.ts (store)](src/stores/auth.ts) - Store Pinia con métodos de login/logout
- [auth.ts (service)](src/services/auth.ts) - Servicio de autenticación

### API e Interceptores
- [api.ts](src/services/api.ts) - **Archivo crucial**: Contiene ambos interceptores

### Interfaz de Usuario
- [LoginButton.vue](src/components/LoginButton.vue) - Botones de login
- [DashboardView.vue](src/views/DashboardView.vue) - Panel privado
- [Toast.vue](src/components/Toast.vue) - Notificaciones

### Pruebas **OBLIGATORIAS**
- [api.spec.ts](src/__tests__/api.spec.ts) - **Pruebas de interceptores y error 401**
- [auth.spec.ts](src/__tests__/auth.spec.ts) - Pruebas del store
- [toast.spec.ts](src/__tests__/toast.spec.ts) - Pruebas de notificaciones

## ✨ Puntos Destacados

### ✅ Cumple Requisitos de la Actividad

1. **OAuth Simplificado** ✓
   - Firebase con GitHub habilitado
   - Componente LoginButton que usa signInWithPopup
   - Token extraído y almacenado en Pinia

2. **Interceptores de Petición** ✓
   - Inyécta automáticamente `Authorization: Bearer <token>`
   - Se aplica a TODAS las peticiones

3. **Interceptores de Respuesta** ✓
   - Captura 401 y 403
   - Limpia token automáticamente
   - Emite evento para Toast
   - El usuario es redirigido a login

4. **Pruebas con Vitest** ✓
   - Usando axios-mock-adapter para simular respuestas
   - **Prueba obligatoria implementada**: Verifica que token se limpia en 401
   - Resto de pruebas: peticiones, métodos HTTP, toast store

## ⚠️ Notas Importantes

### Para Desarrollo
- Las credenciales de Firebase deben estar en `.env` (no commiteadas)
- El archivo `.env` está en `.gitignore`

### Para Producción
- Considera usar httpOnly cookies en lugar de localStorage
- Implementa refresh tokens para mejorar UX
- Configura CORS correctamente en tu backend
- Usa HTTPS obligatoriamente

## 🤝 Estructura de Commits Recomendada

```
feat: implementar autenticación OAuth con Firebase
feat: agregar interceptores de Axios con manejo de errores 401
feat: crear componente Toast para notificaciones
feat: implementar pruebas Vitest
```

## 📖 Recursos Adicionales

- [Firebase Auth Docs](https://firebase.google.com/docs/auth/)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
- [Pinia Getting Started](https://pinia.vuejs.org/)
- [Vitest Guide](https://vitest.dev/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

