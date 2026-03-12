# ✅ CHECKLIST FINAL - Práctica 7 Consolidada

## 🎯 ANTES DE EMPEZAR A USAR

### Paso 1: Entender Qué Se Hizo
- [ ] Leer `CONSOLIDACION_COMPLETADA.md` (resumen visual, 5 min)
- [ ] Leer `RESUMEN_CAMBIOS.md` (detalles técnicos, 10 min)

### Paso 2: Configuración LOCAL
- [ ] Copiar `.env.example` a `.env.local`
- [ ] Obtener credenciales:
  - [ ] Beeceptor endpoint (https://beeceptor.com)
  - [ ] OpenAI API key (https://platform.openai.com)
  - [ ] Hugging Face token (https://huggingface.co/settings/tokens)
  - [ ] Firebase credenciales (https://console.firebase.google.com)
- [ ] Completer `.env.local` con todos los valores

### Paso 3: Pruebas Locales
- [ ] Ejecutar `npm install` (si no lo hiciste)
- [ ] Ejecutar `npm run dev`
- [ ] Verificar que el servidor inicia en `http://localhost:5173`
- [ ] Probar navegación:
  - [ ] Puedo acceder a `/`
  - [ ] Puedo acceder a `/ej1`
  - [ ] Puedo acceder a `/ej2`
  - [ ] Puedo acceder a `/ej3`
  - [ ] Puedo acceder a `/login`
  - [ ] Puedo acceder a `/dashboard` (requiere auth)

### Paso 4: Probar Funcionalidades
- [ ] **Ej1 (Job Tracker)**
  - [ ] Se carga el formulario
  - [ ] Puedo agregar una candidatura
  - [ ] Se deducir actualiza la lista
  - [ ] Puedo editar estado
  - [ ] Puedo eliminar candidatura

- [ ] **Ej2 (AI-UML)**
  - [ ] Se carga el formulario
  - [ ] Puedo escribir un prompt
  - [ ] Puedo generar diagrama
  - [ ] Se renderiza el SVG
  - [ ] Puedo exportar SVG
  - [ ] Puedo exportar PNG
  - [ ] Función "Cancelar" está disponible

- [ ] **Ej3 (SpriteSheet)**
  - [ ] Se carga la vista
  - [ ] (Componentes aún por implementar)

- [ ] **Ej4 (Auth)**
  - [ ] Puedo ver botón de login
  - [ ] Puedo iniciar sesión con GitHub
  - [ ] Puedo iniciar sesión con Google
  - [ ] Se redirige a `/dashboard`
  - [ ] Dashboard muestra mi info
  - [ ] Puedo cerrar sesión

---

## 🏗️ ANTES DE DESPLEGAR A HOSTING

### Paso 5: Configuración de Servicios Externos

#### Firebase
- [ ] Crear proyecto en https://console.firebase.google.com
- [ ] Habilitar autenticación GitHub
- [ ] Habilitar autenticación Google
- [ ] Copiar credenciales a `.env.local`:
  - [ ] VITE_FIREBASE_API_KEY
  - [ ] VITE_FIREBASE_AUTH_DOMAIN
  - [ ] VITE_FIREBASE_PROJECT_ID
  - [ ] VITE_FIREBASE_STORAGE_BUCKET
  - [ ] VITE_FIREBASE_MESSAGING_SENDER_ID
  - [ ] VITE_FIREBASE_APP_ID

#### Beeceptor
- [ ] Crear endpoint en https://beeceptor.com
- [ ] Copier URL a `VITE_BEECEPTOR_URL`
- [ ] Configurar Mocking Rules para CORS:
  - [ ] URL: **Jaulas
  - [ ] Método: OPTIONS
  - [ ] Respuesta: 200
  - [ ] Headers:
    ```
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
    Access-Control-Allow-Headers: Content-Type, Authorization
    ```

#### OpenAI
- [ ] Crear API key en https://platform.openai.com
- [ ] Verificar saldo suficiente
- [ ] Copiar a `VITE_OPENAI_API_KEY`

#### Hugging Face
- [ ] Crear token en https://huggingface.co/settings/tokens
- [ ] Copiar a `VITE_HUGGINGFACE_API_KEY`

### Paso 6: Build y Prueba Final
- [ ] Ejecutar `npm run build`
- [ ] Verificar que no hay errores
- [ ] Ejecutar `npm run preview`
- [ ] Probar todas las rutas en preview
- [ ] Verificar funcionalidades principales

---

## 🚀 DESPLIEGUE A HOSTING

### Elegir Plataforma
- [ ] **Vercel** (Recomendado)
  - [ ] Leer instrucciones en `DESPLIEGUE.md` sección "Vercel"
  - [ ] Conectar repositorio GitHub
  - [ ] Agregar variables de entorno
  - [ ] Hacer push a main
  
- [ ] **Netlify**
  - [ ] Leer instrucciones en `DESPLIEGUE.md` sección "Netlify"
  - [ ] Conectar repositorio
  - [ ] Configurar build settings
  - [ ] Agregar variables
  - [ ] Deploy automático

- [ ] **Otro hosting** (VPS, Railway, etc.)
  - [ ] Leer instrucciones en `DESPLIEGUE.md`
  - [ ] Seguir pasos según plataforma

### Post-Deployment

#### Firefox
- [ ] Ir a Firebase Console
- [ ] **Authentication → Settings → Authorized domains**
- [ ] Click "+ Add domain"
- [ ] Agregar tu nuevo dominio (ej: `miapp.vercel.app`)

#### Verificaciones Finales
- [ ] Acceder a URL pública
- [ ] Verificar que todos los ejercicios funcionan
- [ ] Probar login/logout
- [ ] Probar generación de diagramas
- [ ] Probar otras funcionalidades
- [ ] Ver consola del navegador (no debe haber errores rojos)

---

## 🐛 TROUBLESHOOTING

### ❌ Error: "Cannot find module..."
- [ ] Verificar rutas de import comienzan con `@/`
- [ ] Verificar que los archivos existen en la ruta correcta
- [ ] Ejecutar `npm install` nuevamente

### ❌ Error de CORS en Beeceptor
- [ ] Verificar Mocking Rules están configuradas
- [ ] Verificar URL del endpoint es correcta
- [ ] Probar endpoint en Postman primero

### ❌ Firebase auth no funciona
- [ ] Verificar dominio está en "Authorized domains"
- [ ] Verificar credenciales son correctas
- [ ] Ver consola del navegador para errores específicos
- [ ] Verificar que OAuth provider es válido

### ❌ OpenAI retorna error
- [ ] Verificar API key es correcta
- [ ] Verificar saldo en cuenta
- [ ] Verificar modelo soportado
- [ ] Ver respuesta exacta en consola

### ❌ Archivos estáticos no cargan
- [ ] Verificar que `dist/` fue generado correctamente
- [ ] Verificar archivos en `public/` si existen
- [ ] Configurar `base` en `vite.config.ts` si es necesario

---

## 📱 VERIFICACIONES FINALES

En producción, probar en:
- [ ] Chrome/Edge Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Chrome Mobile
- [ ] Safari Mobile

Verificar que todas las pantallas sean responsivas y funcionales.

---

## 🎉 ¡LISTO!

Una vez completados todos los pasos anteriores, tu aplicación estará:
- ✅ Desarrollada localmente
- ✅ Compilada sin errores
- ✅ Desplegada en hosting
- ✅ Accesible públicamente
- ✅ Funcional en navegadores

**Comparte el URL con tus compañeros y profesores** 🚀

---

## 📚 Documentación de Referencia

- `CONSOLIDACION_COMPLETADA.md` - Resumen ejecutivo
- `README_CONSOLIDADO.md` - Guía completa del proyecto
- `DESPLIEGUE.md` - Instrucciones por plataforma
- `RESUMEN_CAMBIOS.md` - Cambios técnicos realizados

---

**Última actualización**: Marzo 2026  
**Estado**: ✅ Listo para usar  
**¿Dudas?**: Referencia la sección TROUBLESHOOTING o los archivos de documentación
