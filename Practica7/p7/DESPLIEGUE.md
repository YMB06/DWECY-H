# 🌐 Guía de Despliegue en Hosting - Práctica 7 Consolidada

## ✅ Estado Actual

**Proyecto consolidado**: Todos los 4 ejercicios están integrados en la carpeta `p7/`

**Archivos preparados**:
- ✅ package.json actualizado con todas las dependencias
- ✅ .env.example con variables necesarias
- ✅ Router configurado con todas las rutas
- ✅ Tests de compilación sin errores

## 🚀 Pasos para Despliegue

### 1. Preparar Variables de Entorno

Antes de hacer el build final, asegúrate de tener un `.env.local` en la raíz del proyecto:

```bash
# .env.local
VITE_BEECEPTOR_URL=https://tu-endpoint.free.beeceptor.com
VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxx
VITE_HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxx
VITE_FIREBASE_API_KEY=AIzaSyxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxxxx
```

### 2. Build Local de Prueba

```bash
cd Practica7/p7
npm install  # Si aún no lo has hecho
npm run build
npm run preview
```

Deberías poder acceder en `http://localhost:4173`

### 3. Elegir Plataforma de Hosting

#### Opción A: Vercel (Recomendado - Más Fácil)

1. Ve a https://vercel.com
2. Conecta tu repositorio GitHub
3. En "Environment Variables", agrega:
   - `VITE_BEECEPTOR_URL`
   - `VITE_OPENAI_API_KEY`
   - `VITE_HUGGINGFACE_API_KEY`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. Click en "Deploy"

La app se desplegará automáticamente en cada push.

#### Opción B: Netlify

1. Ve a https://app.netlify.com
2. Click "New site from Git"
3. Selecciona tu repositorio GitHub
4. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. En "Site settings" → "Build & deploy" → "Environment", agrega las variables
6. Haz un push a GitHub para triggear el deploy

#### Opción C: Railway

1. Ve a https://railway.app
2. Nueva proyecto, conecta GitHub
3. Selecciona la rama y repositorio
4. Variables de entorno:
   - `VITE_BEECEPTOR_URL`
   - `VITE_OPENAI_API_KEY`
   - etc.
5. Deploy automático al hacer push

#### Opción D: VPS Propio (DigitalOcean, Linode, etc.)

1. Conexión SSH a tu VPS
2. Instala Node.js y npm
3. Clona el repositorio
4. Configura `.env.local` con tus credenciales
5. Ejecuta:
```bash
cd Practica7/p7
npm install
npm run build
npx serve -s dist -p 3000  # O usa pm2
```
6. Configura Nginx como proxy reverso (opcional)

### 4. Configuración Post-Deployment

#### A. Firebase - Whitelist de Dominios

1. Ve a Firebase Console
2. **Authentication** → **Settings** → **Authorized domains**
3. Agrega tu dominio de despliegue (ej: `miapp.vercel.app`)

#### B. CORS en Beeceptor

1. Ve a tu endpoint de Beeceptor
2. **Mocking Rules** → Agrega regla para `OPTIONS`:
   - Path: `/jobs`
   - Response: 200
   - Headers:
     ```
     Access-Control-Allow-Origin: *
     Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
     Access-Control-Allow-Headers: Content-Type, Authorization
     ```

#### C. URLs de APIs

Verifica que las URLs de APIs estén correctamente configuradas:

- **Beeceptor**: `https://tuendpoint.free.beeceptor.com`
- **OpenAI**: Se configura automáticamente en `aiService.ts`
- **Hugging Face**: Se configura automáticamente en `imageService.ts`
- **Firebase**: Se configura en `config/firebase.ts`

## 📊 Checklist de Despliegue

- [ ] `.env.local` completado con todas las variables
- [ ] `npm run build` ejecutado sin errores
- [ ] `npm run preview` funciona localmente
- [ ] Plataforma de hosting elegida
- [ ] Variables de entorno configuradas en hosting
- [ ] Dominio whitelisteado en Firebase
- [ ] CORS configurado en Beeceptor
- [ ] Primera ejecución en hosting - ¡TODO FUNCIONA!

## 🔍 Testing Post-Deployment

Después de desplegar, verifica cada ejercicio:

### Ej1 - Job Tracker ✅
- [ ] Acceso a `/ej1`
- [ ] Se cargan candidaturas (si hay datos en Beeceptor)
- [ ] Formulario funciona
- [ ] CRUD completo funciona

### Ej2 - AI-UML ✅
- [ ] Acceso a `/ej2`
- [ ] Input de prompt funciona
- [ ] Generación de diagrama funciona
- [ ] Cancelación de generación funciona
- [ ] Exportar SVG/PNG funciona

### Ej3 - SpriteSheet ⚠️
- [ ] Acceso a `/ej3`
- [ ] (Nota: Este ejercicio aún necesita componentes implementados)

### Ej4 - GitHub DevHub 🔐
- [ ] Acceso a `/login`
- [ ] Login con GitHub funciona
- [ ] Login con Google funciona
- [ ] Redirige a `/dashboard` tras login
- [ ] Dashboard muestra información del usuario
- [ ] Logout funciona

## 🛠️ Troubleshooting en Hosting

### Problema: CORS Error en Beeceptor

**Solución**: 
1. Verifica que Beeceptor tiene las Mocking Rules correctas
2. Intenta hacer una petición con Postman para verificar
3. Asegúrate de usar `http://` o `https://` correctamente

### Problema: Firebase Auth no funciona

**Solución**:
1. Verifica que el dominio está en la whitelist
2. Comprueba consola del navegador para ver errores específicos
3. Verifica que `VITE_FIREBASE_*` variables estén todas correctas

### Problema: OpenAI returns error

**Solución**:
1. Verifica que `VITE_OPENAI_API_KEY` es correcta
2. Verifica que tu API key tiene suficiente saldo
3. Comprueba que no hay rate limiting

### Problema: Variables de entorno no se cargan

**Solución**:
1. Todas deben comenzar con `VITE_`
2. Reinicia el servidor después de cambiar
3. Verifica sintaxis de `.env.local`

## 📱 URLs Útiles

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Netlify Dashboard**: https://app.netlify.com
- **Firebase Console**: https://console.firebase.google.com
- **Beeceptor Dashboard**: https://beeceptor.com
- **OpenAI API Dashboard**: https://platform.openai.com/account/api-keys
- **Hugging Face Tokens**: https://huggingface.co/settings/tokens

## ✨ Tips Finales

1. **DNS**: Si usas dominio propio, configura DNS según tu proveedor de hosting
2. **SSL/TLS**: La mayoría de plataformas lo ofrecen gratis
3. **Monitoreo**: Configura logs y monitoreo en tu hosting
4. **Backups**: Haz backups regulares de tu código
5. **Versioning**: Usa git tags para versiones de producción

## 🎉 ¡Listo!

Una vez completos estos pasos, tu aplicación Práctica 7 consolidada estará accesible públicamente desde Internet.

**URL Final**: `https://tu-dominio.vercel.app` (o según tu hosting)

---

**Última actualización**: Marzo 2026
**Próximos pasos**: Implementar Ej3 (SpriteSheet), agregar más tests, optimizar rendimiento
