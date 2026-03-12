# DOCUMENTACIÓN TÉCNICA - GitHub DevHub Panel Seguro

## 🔒 Arquitectura de Seguridad

### 1. Autenticación OAuth con Firebase

La autenticación está implementada en [src/stores/auth.ts](src/stores/auth.ts).

#### Flujo de Autenticación GitHub

```typescript
async function loginWithGitHub() {
  const provider = new GithubAuthProvider();
  provider.addScope('user:email');
  
  const result = await signInWithPopup(auth, provider);
  const credential = GithubAuthProvider.credentialFromResult(result);
  const githubToken = credential?.accessToken || '';
  
  // Guardar token en Pinia y localStorage
  setToken(githubToken);
}
```

**Puntos clave:**
- ✅ Usa `signInWithPopup` (más seguro que redirect)
- ✅ Firebase maneja la autenticación securizada
- ✅ Token se extrae automáticamente
- ✅ Se almacena de forma persisten en localStorage

### 2. Interceptores de Axios

Implementados en [src/services/api.ts](src/services/api.ts):

#### Interceptor de Petición (Request)

```typescript
this.instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  
  // Inyectar token en TODAS las peticiones
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  
  return config;
});
```

**Flujo:**
1. Antes de enviar cualquier petición
2. Verifica si existe `token` en el store
3. Agrega header: `Authorization: Bearer <token>`
4. Continúa con la petición

#### Interceptor de Respuesta (Response) - **CRÍTICO**

```typescript
this.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    
    // Capturar errores de autenticación
    if (error.response?.status === 401 || error.response?.status === 403) {
      // 1. Limpiar token
      authStore.logout();
      
      // 2. Emitir evento para notificación
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

**¿Qué sucede en caso de error 401/403?**
1. Se ejecuta automáticamente sin intervención del desarrollador
2. `logout()` es llamada automáticamente:
   - `token` se establece a `null` en Pinia
   - Token se elimina de localStorage
   - Usuario Firebase es desautenticado
3. Se emite un `CustomEvent` con tipo 'error'
4. El Toast escucha este evento y muestra notificación roja
5. Usuario es redirigido a `/` por el router guard

### 3. Almacenamiento de Token

**¿Dónde se almacena el token?**

1. **Pinia Store** (en memoria):
   ```typescript
   const token = ref<string | null>(localStorage.getItem('authToken'));
   ```

2. **localStorage** (persistente):
   ```typescript
   function setToken(newToken: string) {
     token.value = newToken;
     localStorage.setItem('authToken', newToken);
   }
   ```

**Ventajas:**
- ✅ Persiste entre recargas de página
- ✅ Accesible desde cualquier componente a través de Pinia
- ✅ Se limpia automáticamente en logout

**⚠️ Nota de Seguridad:**
En producción, considera usar:
- `sessionStorage` en lugar de `localStorage`
- httpOnly cookies (más seguras)
- Refresh tokens con expiración corta

### 4. Router Guards

Implementado en [src/router/index.ts](src/router/index.ts):

```typescript
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Proteger rutas privadas
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/');  // Redirigir a login
  } 
  // Redirigir a dashboard si está autenticado
  else if (to.path === '/' && authStore.isAuthenticated) {
    next('/dashboard');
  } 
  else {
    next();
  }
});
```

**Rutas necesitadas:**
- `/` - LoginView (acceso público)
- `/dashboard` - DashboardView (requiere autenticación)

## ✅ Pruebas Unitarias

### Configuración de Vitest

**Archivo:** [vitest.config.ts](vitest.config.ts)

```typescript
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
```

**Por qué jsdom?**
- Simula un navegador real
- Permite testing de componentes Vue
- Soporta localStorage (para testing del token)

### Prueba Obligatoria: Error 401 y Limpieza de Token

**Ubicación:** [src/__tests__/api.spec.ts](src/__tests__/api.spec.ts#L62-L76)

```typescript
describe('Response Interceptor - Error Handling (CRITICAL TEST)', () => {
  it('should clear token on 401 Unauthorized error', async () => {
    // SETUP
    const testToken = 'test-token';
    authStore.setToken(testToken);
    
    // Mock de la respuesta de la API
    mockAxios.onGet('/api/protected').reply(401, { error: 'Unauthorized' });
    
    // EXECUTE
    try {
      await apiService.get('/api/protected');
    } catch (error) {
      // Se espera que lance error
    }
    
    // VERIFY
    expect(authStore.token).toBeNull();  // ✅ Token limpiado en Pinia
    expect(localStorage.getItem('authToken')).toBeNull();  // ✅ Token limpiado de localStorage
  });
});
```

**¿Qué se verifica?**
1. Se simula una petición que devuelve 401
2. Se verifica que `authStore.token` sea null
3. Se verifica que localStorage no contenga el token
4. Esto confirma que `logout()` fue llamada automáticamente

### Otras Pruebas Implementadas

#### Request Interceptor
```typescript
it('should inject Authorization header when token exists', async () => {
  authStore.setToken('test-token-123');
  mockAxios.onGet('/api/test').reply(200);
  
  await apiService.get('/api/test');
  
  const request = mockAxios.history.get[0];
  expect(request.headers.Authorization).toBe('Bearer test-token-123');
});
```

#### Error 403 también limpia token
```typescript
it('should clear token on 403 Forbidden error', async () => {
  // Similar al 401
  expect(authStore.token).toBeNull();
});
```

#### No limpia token en otros errores
```typescript
it('should not clear token on 404 or other client errors', async () => {
  const testToken = 'test-token-xyz';
  authStore.setToken(testToken);
  
  mockAxios.onGet('/api/notfound').reply(404);
  
  try {
    await apiService.get('/api/notfound');
  } catch (error) {}
  
  // El token DEBE permanecer
  expect(authStore.token).toBe(testToken);
});
```

### Herramientas de Testing

| Herramienta | Propósito |
|------------|-----------|
| **Vitest** | Test runner compatible con Vite |
| **axios-mock-adapter** | Mock HTTP sin hacer peticiones reales |
| **Pinia** | State testing |
| **jsdom** | DOM virtual |

### Ejecutar Pruebas

```bash
# Una sola ejecución
npm test -- --run

# Modo watch (desarrollo)
npm test

# Con UI interactiva
npm test -- --ui

# Con cobertura
npm test -- --coverage
```

## 🔄 Flujo Completo de Seguridad

### Escenario: Usuario intenta acceder a recurso protegido

```
1. Usuario hace clic en "Cargar Datos"
   ↓
2. DashboardView llama: apiService.get('/api/user/profile')
   ↓
3. INTERCEPTOR DE PETICIÓN ejecuta:
   ├─ Obtiene token de Pinia: "eyJhbG..."
   ├─ Agrega a headers: Authorization: Bearer eyJhbG...
   └─ Envía petición GET /api/user/profile
   ↓
4. API remota recibe petición
   ├─ Verifica header Authorization
   ├─ Token es inválido/expirado
   └─ Devuelve: HTTP 401
   ↓
5. INTERCEPTOR DE RESPUESTA captura error:
   ├─ Detecta error.response.status === 401
   ├─ Llama: authStore.logout()
   │  ├─ token.value = null (Pinia)
   │  └─ localStorage.removeItem('authToken')
   ├─ Emite CustomEvent 'sessionExpired'
   └─ Rechaza promesa con error
   ↓
6. Toast.vue escucha 'sessionExpired':
   ├─ Llama: toastStore.addToast('Tu sesión ha expirado', 'error')
   └─ Muestra notificación roja durante 5 segundos
   ↓
7. Router guard detecta cambio de autenticación:
   ├─ isAuthenticated es ahora false
   └─ Redirige a: /
   ↓
8. Usuario regresa a LoginView
```

### Escenario: Usuario intenta acceder a ruta privada sin autenticación

```
1. URL: http://localhost:5173/dashboard
   ↓
2. Router.beforeEach() ejecuta:
   ├─ to.path === '/dashboard'
   ├─ to.meta.requiresAuth === true
   ├─ authStore.isAuthenticated === false
   └─ next('/') // Redirigir a login
   ↓
3. Usuario ve LoginView
```

## 🚀 Deployment Considerations

### Before Going to Production

1. **Seguridad del Token**
   ```typescript
   // ❌ NO HACER: localStorage es vulnerable a XSS
   localStorage.setItem('authToken', token);
   
   // ✅ MEJOR: httpOnly cookie (desde servidor)
   // El servidor setea: Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict
   ```

2. **CORS Configuration**
   ```
   En tu backend, configura CORS para permitir:
   - Origin: https://yourdomain.com
   - Métodos: GET, POST, PUT, DELETE
   - Headers: Authorization, Content-Type
   ```

3. **Refresh Tokens**
   ```typescript
   // Implementar lógica de refresh token
   // Cuando recibas 401, intenta con un refresh token
   // Si el refresh falla, redirige a login
   ```

4. **HTTPS Obligatorio**
   ```
   Configura en .env:
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

5. **Rate Limiting**
   ```
   Implementar en el interceptor:
   - Máximo 10 intentos de login por minuto
   - Máximo 100 peticiones por minuto por usuario
   ```

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        VUE APPLICATION                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Vue Components & Views                   │   │
│  │  - LoginButton.vue  → display login options          │   │
│  │  - DashboardView.vue → protected content             │   │
│  │  - Toast.vue → notifications                         │   │
│  └───────────────────┬──────────────────────────────────┘   │
│                      │                                        │
│                      ↓                                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        PINIA STORES (State Management)               │   │
│  │  ┌─────────────────────────┐                         │   │
│  │  │  useAuthStore (auth.ts) │                         │   │
│  │  │  - user, token          │                         │   │
│  │  │  - isAuthenticated      │                         │   │
│  │  │  - logout()          ◄──┼─── calls on 401/403    │   │
│  │  └─────────────────────────┘                         │   │
│  │  ┌─────────────────────────┐                         │   │
│  │  │  useToastStore          │                         │   │
│  │  │  - toasts[]             │                         │   │
│  │  │  - addToast()        ◄──┼─── called on error      │   │
│  │  └─────────────────────────┘                         │   │
│  └───────────────────┬──────────────────────────────────┘   │
│                      │                                        │
│                      ↓                                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           AXIOS INSTANCE (api.ts)                    │   │
│  │                                                       │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │  REQUEST INTERCEPTOR                           │ │   │
│  │  │  1. Get token from authStore                   │ │   │
│  │  │  2. Add: Authorization: Bearer <token>         │ │   │
│  │  │  3. Continue request                           │ │   │
│  │  └────────┬───────────────────────────────────────┘ │   │
│  │           │                                          │   │
│  │           ↓                                          │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │  RESPONSE INTERCEPTOR                          │ │   │
│  │  │  if (status === 401 || 403) {                  │ │   │
│  │  │    - authStore.logout()                        │ │   │
│  │  │    - Emit 'sessionExpired' event               │ │   │
│  │  │  }                                              │ │   │
│  │  └────────┬───────────────────────────────────────┘ │   │
│  └───────────┼───────────────────────────────────────────┘   │
│              │                                                │
└──────────────┼────────────────────────────────────────────────┘
               │
               ↓
        ┌─────────────────┐
        │  FIREBASE AUTH  │
        │  - GitHub OAuth │
        │  - Google OAuth │
        │  - Token Mgmt   │
        └─────────────────┘
               │
               ↓
        ┌─────────────────┐
        │  REMOTE API     │
        │  - Protected    │
        │  - Validates    │
        │    Bearer token │
        │  - Returns 401  │
        │    if invalid   │
        └─────────────────┘
```

## 🧪 Checklist de Testing

- [x] Token se inyecta correctamente en peticiones
- [x] Error 401 limpia el token automáticamente
- [x] Error 403 limpia el token automáticamente
- [x] Error 404 NO limpia el token
- [x] Evento 'sessionExpired' se emite en 401/403
- [x] Logout es llamada automáticamente
- [x] GET, POST, PUT, DELETE funcionan
- [x] Toast store maneja notificaciones

## 📚 Archivos Relacionados

| Función | Archivo |
|---------|---------|
| Autenticación | `src/stores/auth.ts` |
| Interceptores | `src/services/api.ts` |
| Notificaciones | `src/components/Toast.vue` |
| Router Guards | `src/router/index.ts` |
| Pruebas (401) | `src/__tests__/api.spec.ts` |
| Firebase Config | `src/config/firebase.ts` |

---

*Documentación actualizada para Práctica 7, Ejercicio 4*
*Última actualización: 2026-03-12*
