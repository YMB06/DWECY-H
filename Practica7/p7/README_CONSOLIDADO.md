# 🚀 Práctica 7 - Async JS Consolidado

## 📋 Descripción

Este proyecto es una consolidación de 4 ejercicios prácticos de Programación Asíncrona en JavaScript utilizando Vue 3 + TypeScript + Vite. Todos los ejercicios están integrados en una única aplicación web con navegación centralizada.

## 🎯 Ejercicios Incluidos

### 1. 💼 **Ejercicio 1: Job Tracker - Gestor de Candidaturas**
- **Ruta**: `/ej1`
- **Descripción**: Panel CRUD para gestionar candidaturas a ofertas de trabajo
- **Tecnologías**:
  - API simulada con Beeceptor
  - Gestión CRUD completa
  - Sincronización con base de datos simulada
  - Pinia store para estado global

### 2. 🤖 **Ejercicio 2: AI-UML Architect - Generador de Diagramas**
- **Ruta**: `/ej2`
- **Descripción**: Herramienta IA para generar diagramas Mermaid automáticamente
- **Tecnologías**:
  - Integración con API de OpenAI
  - AbortController para cancelación de peticiones
  - Biblioteca Mermaid para renderizado de diagramas
  - Exportación a SVG y PNG
  - Barra de carga en tiempo real

### 3. 🎮 **Ejercicio 3: SpriteSheet AI Forge - Generador de Sprites**
- **Ruta**: `/ej3`
- **Descripción**: Utilidad para generar y animar sprites pixel art con IA
- **Tecnologías**:
  - Integración con API de Hugging Face
  - Monitorización de descarga con Axios
  - Barra de progreso visual
  - Animación CSS dinámica con `steps()`
  - Manejo de blobs y URLs de objetos

### 4. 🔐 **Ejercicio 4: GitHub DevHub - Panel Seguro**
- **Ruta**: `/login` y `/dashboard`
- **Descripción**: Área privada con autenticación OAuth y gestión de sesiones
- **Tecnologías**:
  - Autenticación Firebase con GitHub y Google
  - Interceptores de petición/respuesta personalizados
  - Gestión de tokens Bearer
  - Sistema de notificaciones Toast
  - Pruebas unitarias con Vitest

## 🛠️ Instalación

### Prerequisitos
- Node.js 20+ o 22+
- npm 10+

### Pasos

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar variables de entorno**:
```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega:
- `VITE_BEECEPTOR_URL`: Tu endpoint de Beeceptor
- `VITE_OPENAI_API_KEY`: Tu clave de API de OpenAI
- `VITE_HUGGINGFACE_API_KEY`: Tu clave de API de Hugging Face  
- `VITE_FIREBASE_*`: Credenciales de Firebase

## 🚀 Desarrollo

### Iniciar servidor dev
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

### Verificación de tipos
```bash
npm run type-check
```

### Linting
```bash
npm run lint
npm run format
```

### Tests
```bash
npm run test:unit
npm run test:e2e
```

## 📦 Estructura del Proyecto

```
src/
├── components/
│   ├── ej1-job-tracker/      # Componentes para Job Tracker
│   │   ├── JobTracker.vue
│   │   ├── JobList.vue
│   │   ├── JobCard.vue
│   │   └── JobForm.vue
│   ├── ej2-ai-uml/           # Componentes para AI-UML
│   │   ├── AIUMLArchitect.vue
│   │   ├── DiagramForm.vue
│   │   └── DiagramViewer.vue
│   ├── ej3-sprite/           # Componentes para SpriteSheet (a completar)
│   ├── LoginButton.vue       # Auth de Ej4
│   └── Toast.vue             # Notificaciones de Ej4
├── services/
│   ├── api.ts                # Cliente Axios configurado
│   ├── aiService.ts          # Servicio para IA-UML
│   ├── imageService.ts       # Servicio para generación de sprites
│   └── jobService.ts         # Servicio para Job Tracker
├── stores/
│   ├── ej1/
│   │   └── jobStore.ts       # Store de Job Tracker
│   ├── ej2/
│   │   └── diagramStore.ts   # Store de AI-UML
│   ├── ej3/
│   │   └── spriteStore.ts    # Store de SpriteSheet
│   ├── ej4/
│   │   ├── auth.ts           # Store de autenticación
│   │   └── toast.ts          # Store de notificaciones
│   ├── auth.ts               # (Copia accesible de ej4/auth.ts)
│   └── toast.ts              # (Copia accesible de ej4/toast.ts)
├── types/
│   ├── auth.ts               # Tipos para autenticación
│   └── job.ts                # Tipos para Job Tracker
├── config/
│   └── firebase.ts           # Configuración de Firebase
├── router/
│   └── index.ts              # Rutas de la aplicación
├── views/
│   ├── HomeView.vue          # Página de inicio
│   ├── Ejercicio1View.vue    # Vista de Job Tracker
│   ├── Ejercicio2View.vue    # Vista de AI-UML
│   ├── Ejercicio3View.vue    # Vista de SpriteSheet
│   ├── LoginView.vue         # Vista de login
│   └── DashboardView.vue     # Vista de dashboard
├── App.vue                   # Componente raíz
└── main.ts                   # Punto de entrada
```

## 🔗 Rutas de la Aplicación

| Ruta | Ejercicio | Descripción |
|------|-----------|-------------|
| `/` | - | Página de inicio |
| `/ej1` | 1 | Job Tracker |
| `/ej2` | 2 | AI-UML Architect |
| `/ej3` | 3 | SpriteSheet AI Forge |
| `/login` | 4 | Autenticación GitHub/Google |
| `/dashboard` | 4 | Panel de control protegido |

## 🌐 Despliegue en Producción

### Variables de Entorno para Producción

Asegúrate de crear un archivo `.env.local` (o similar según tu plataforma) con:

```env
VITE_BEECEPTOR_URL=https://tu-endpoint.free.beeceptor.com
VITE_OPENAI_API_KEY=sk-xxxxx
VITE_HUGGINGFACE_API_KEY=hf_xxxxx
VITE_FIREBASE_API_KEY=AIzaSyxxxxx
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=1:xxxxx:web:xxxxx
```

### Build para Producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para desplegar.

### Opciones de Despliegue

1. **Vercel** (Recomendado)
   - Conecta tu repositorio y despliega automáticamente
   - Soporta Variables de Entorno fácilmente

2. **Netlify**
   - Conecta tu repositorio
   - Configura variables de entorno en settings

3. **GitHub Pages**
   - Configura en `vite.config.ts` el `base`
   - Deploy automático con GitHub Actions

4. **VPS Propio**
   - Sube `dist/` a tu servidor
   - Sirve con Nginx o Apache

## 📚 Dependencias Principales

- **Vue 3**: Framework progresivo
- **Vite**: Bundler muy rápido
- **Typescript**: Tipado estático
- **Pinia**: Gestión de estado
- **Vue Router**: Enrutamiento
- **Axios**: HTTP client
- **Mermaid**: Renderizado de diagramas
- **Firebase**: Autenticación
- **Vitest**: Testing
- **Playwright**: E2E Testing

## ✅ Checklist de Completitud

- [x] Consolidación de 4 ejercicios en 1 proyecto
- [x] Configuración de package.json con todas las dependencias
- [x] Migración de componentes
- [x] Migración de servicios
- [x] Migración de stores
- [x] Actualización de router
- [x] Rutas absolutas (@/) en importaciones
- [x] Variables de entorno documentadas
- [x] Type-checking sin errores
- [x] Linting y formatting
- [ ] Tests unitarios completos
- [ ] Tests E2E completos
- [ ] Despliegue en producción

## 🔄 Continuación de Ejercicios No Completados

### Ej3 - SpriteSheet (Pendiente):
- Crear componentes en `/src/components/ej3-sprite/`
- Implementar lógica de generación y animación
- Crear store en `/src/stores/ej3/spriteStore.ts`

## 📝 Notas Importantes

1. **Archivos duplicados**: Los archivos auth.ts y toast.ts existen tanto en `stores/ej4/` como en `stores/` para compatibilidad de rutas
2. **Estructura de Pinia**: Los stores desestructurados se desenvuelven automáticamente en Composition API
3. **CORS**: Asegúrate de que tus APIs de terceros estén configuradas correctamente (Beeceptor, OpenAI, etc.)
4. **Firebase**: Las credenciales estáticas son OK en el `.env.local` de desarrollo, pero usa variables de entorno seguras en producción

## 🆘 Troubleshooting

### Error: "Cannot find module '@/'"
- Verifica que `vite.config.ts` tenga el alias `@` configurado

### Error: "Variables de entorno no funciona"
- Asegúrate de usar prefijo `VITE_` en las variables
- Reinicia el servidor después de cambiar `.env.local`

### Firebase auth no funciona
- Verifica que los dominios estén whitelisteados en Firebase Console
- Comprueba que las claves son correctas en `.env.local`

## 📧 Contacto

Para preguntas sobre este proyecto consolidado, contacta al instructor.

---

**Última actualización**: Marzo 2026
**Versión del Proyecto**: 1.0
**Estado**: ✅ Listo para despliegue
