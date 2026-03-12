# 📦 Guía de Producción - SpriteSheet AI Forge

## 🚀 Preparación para Producción

Esta guía te ayuda a desplegar "SpriteSheet AI Forge" en producción de forma segura con Hugging Face.

## 1️⃣ Configuración de Variables de Entorno (Local)

### Crear archivo .env.local

En la raíz del proyecto crea:

```bash
cp .env.example .env.local
```

Edita `.env.local` e ingresa tu API Key:

```env
# .env.local (NO COMMITEAR ESTE ARCHIVO)
VITE_HF_API_KEY=hf_tuAPIKeyde42CaracteresAqui
```

**¿Dónde obtener la API Key?**
- Ve a: https://huggingface.co/settings/tokens (requiere crear cuenta Free)
- Click "New token"
- Type: "Read" (es suficiente)
- Cópialo a `.env.local`
- **Ventaja**: Hugging Face tiene modelos GRATIS

### ✅ Seguridad Local

- ✅ `.env.local` está en `.gitignore`
- ✅ El archivo NO se commitea a Git
- ✅ Solo funciona en tu máquina local
- ✅ Cada dev debe crear su propio `.env.local`

## 2️⃣ Desplegar en Vercel

### Opción A: Vercel CLI (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Desplegar
vercel

# 3. Vercel te hará preguntas
# Responde "y" a todas excepto "Override settings? (y/N)"
```

### Opción B: GitHub Integration (Automático)

1. Push el proyecto a GitHub (sin `.env.local`)
2. Ve a https://vercel.com/new
3. Conecta tu repo de GitHub
4. **MUY IMPORTANTE**: Añade variables de entorno:
   - Click en "Environment Variables"
   - Añade: `VITE_HF_API_KEY` = Tu Access Token de Hugging Face
5. Click "Deploy"

### URL de Producción
Vercel te dará algo como: `tu-app.vercel.app`

## 3️⃣ Desplegar en Netlify

### Opción A: Netlify CLI

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Desplegar
netlify deploy

# 3. Usa `./dist` como carpeta de deploy
```

### Opción B: GitHub Integration

1. Push a GitHub
2. Ve a https://app.netlify.com
3. Click "New site from Git"
4. Selecciona tu repo
5. **Importante**: Añade en "Build Environment Variables":
   - `VITE_HF_API_KEY` = Tu Access Token
6. "Deploy"

## 4️⃣ Desplegar en VPS Personal

Si tienes tu propio servidor:

```bash
# 1. Build el proyecto
npm run build

# 2. Deploy a tu servidor
scp -r dist/* usuario@tuservidor.com:/var/www/html/
```

Asegúrate de:
- Servir archivos estáticos correctamente
- HTTPS habilitado
- Configurar la variable en el servidor

## 5️⃣ Variables de Entorno en Producción

### En Vercel

```
Dashboard → Settings → Environment Variables
├─ VITE_HF_API_KEY = hf_...
├─ Environment: Production
└─ Save
```

### En Netlify

```
Site Settings → Build & Deploy → Environment
├─ Edit variables
├─ VITE_HF_API_KEY = hf_...
└─ Deploy
```

### En tu VPS

```bash
# Crear archivo .env.production en tu servidor
VITE_HF_API_KEY=hf_tutoken
```

## 6️⃣ Verificar Despliegue

### Test local primero

```bash
# Build
npm run build

# Sirve localmente
npm run preview

# Abre http://localhost:4173
```

### Test en producción

1. Abre tu URL (ej: `miapp-sprites.vercel.app`)
2. Intenta generar un sprite
3. Verifica que se descarga la imagen correctamente
4. Revisa F12 Console para errores

### Debug en Producción

```javascript
// En F12 Console
console.log(import.meta.env.VITE_HF_API_KEY)  // Debe mostrar tu key
```

## 7️⃣ Checklist de Seguridad

- [ ] `.env.local` NO está en Git
- [ ] API Key **NO** está hardcodeada en código
- [ ] Usas `import.meta.env.VITE_HF_API_KEY` para leer
- [ ] Variables configuradas en la plataforma
- [ ] Build NO incluye la API Key expuesta
- [ ] Probaste con `npm run preview`
- [ ] Probaste en URL de producción
- [ ] Monitoreaste F12 Console

## 🔧 Troubleshooting

### "Error 401: Invalid token"

**Solución**:
1. Verifica que tu token de HF es válido
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" https://huggingface.co/api/whoami
   ```
2. Regenera el token en https://huggingface.co/settings/tokens
3. Actualiza en Vercel/Netlify

### "Preflight CORS error"

Hugging Face API soporta CORS, pero asegúrate:
1. ✅ Token correcto
2. ✅ Request tiene header correcto
3. ✅ Todo está en `import.meta.env`

### "Imagen no se descarga"

**Debug**:
```javascript
// En F12 Console
console.log(import.meta.env.VITE_HF_API_KEY)  // Debe tener valor
```

Revisa Network tab para ver:
- Status de la respuesta
- Headers enviados

## 📋 Flujo de Despliegue Completo

```
1. Local (desarrollo)
   ├─ Crea .env.local
   ├─ npm run dev
   └─ Tesea que funciona

2. Pre-producción
   ├─ npm run build
   ├─ npm run preview
   └─ Verifica en http://localhost:4173

3. Producción
   ├─ Push a GitHub
   ├─ Vercel/Netlify detecta cambios
   ├─ Ejecuta: npm install && npm run build
   ├─ Sirve la carpeta dist/
   └─ Variables de entorno se inyectan durante build

4. Post-Deploy
   ├─ Abre https://miapp.vercel.app
   ├─ Intenta generar sprite
   ├─ Revisa F12 Console
   └─ Verifica que descargó correctamente
```

## ✅ Ventajas de Vercel/Netlify

✅ **Gratis** para proyectos públicos
✅ **Dominio gratis** (miapp.vercel.app)
✅ **SSL gratis** (HTTPS)
✅ **Deploys automáticos** desde Git
✅ **Manejo seguro** de variables secretas
✅ **CDN global** (rápido para todos)
✅ **Build automático** y previews

## 🎯 Próximos Pasos

Una vez desplegada:

1. **Compartir URL** (`miapp.vercel.app`) con amigos/familia
2. **Monitore errores** en dashboard de Vercel/Netlify
3. **Actualiza API Key** si es necesario
4. **Escala recursos** si es necesario

## 📚 Más Información

- [Hugging Face API Docs](https://huggingface.co/docs/inference-api)
- [Hugging Face Tokens](https://huggingface.co/settings/tokens)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/deploying-sites/overview/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)

---

**¡Listo para producción!** 🚀

Cualquier duda, revisa el archivo `.env.example` o la documentación oficial de Hugging Face.
