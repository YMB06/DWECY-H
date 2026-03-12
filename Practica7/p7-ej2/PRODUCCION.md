# 📦 Guía de Producción - AI-UML Architect

## 🚀 Preparación para Producción

Esta guía te ayuda a desplegar "AI-UML Architect" en producción de forma segura.

## 1️⃣ Configuración de Variables de Entorno (Local)

### Crear archivo .env.local

En la raíz del proyecto crea:

```bash
cp .env.example .env.local
```

Edita `.env.local` e ingresa tu API Key:

```env
# .env.local (NO COMMITEAR ESTE ARCHIVO)
VITE_OPENAI_API_KEY=sk-proj-tu-api-key-aqui
```

**¿Dónde obtener la API Key?**
- Ve a: https://platform.openai.com/api-keys
- Crea una nueva API Key
- Cópiala a `.env.local`

### ✅ Seguridad Local

- ✅ `.env.local` está en `.gitignore`
- ✅ El archivo NO se commitea a Git
- ✅ Solo funciona en tu máquina local
- ✅ Cada dev debe crear su propio `.env.local`

## 2️⃣ Alternativa: Usar Groq (API Gratuita)

Si quieres una alternativa gratuita a OpenAI:

```env
# .env.local
VITE_GROQ_API_KEY=gsk-tu-groq-api-key-aqui
```

Después cambia en `src/services/api.ts`:

```typescript
const api = axios.create({
  // Cambiar esta línea:
  baseURL: 'https://api.groq.com/openai/v1'  // ← Para Groq
  // De esto:
  // baseURL: 'https://api.openai.com/v1'     // ← Para OpenAI
})
```

## 3️⃣ Desplegar en Vercel

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
4. Vercel detectará que es un proyecto Vite
5. **MUY IMPORTANTE**: Añade variables de entorno:
   - Click en "Environment Variables"
   - Añade: `VITE_OPENAI_API_KEY` = Tu API Key
6. Click "Deploy"

### ¿Por qué Vercel?
- ✅ Gratis para proyectos públicos
- ✅ Deploys automáticos cuando haces push a Git
- ✅ CLI intuitiva
- ✅ Manejo seguro de variables secretas
- ✅ Dominio gratis: `tu-app.vercel.app`

## 4️⃣ Desplegar en Netlify

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
5. **Importante**: Añade en "Environment Variables":
   - `VITE_OPENAI_API_KEY` = Tu API Key
6. "Deploy"

## 5️⃣ Desplegar en VPS Personal

Si tienes tu propio servidor:

```bash
# 1. Build el proyecto
npm run build

# 2. Esto genera la carpeta 'dist'

# 3. Deploy a tu servidor
# Opción A: Usando SCP
scp -r dist/* usuario@tuservidor.com:/var/www/html/

# Opción B: Con GitHub Actions
# Crea .github/workflows/deploy.yml
```

**Archivo deploy.yml de ejemplo:**

```yaml
name: Deploy to VPS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - name: Deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/html/
            rm -rf *
            # Copiar archivos
```

## 6️⃣ Verificar Despliegue

### Test local (antes de desplegar)

```bash
# Build
npm run build

# Sirve localmente
npm run preview

# Abre http://localhost:4173
```

### Test en producción (después de desplegar)

1. Abre tu URL de producción (ej: `miapp-ia.vercel.app`)
2. Intenta usar la app
3. Verifica que se genera correctamente el diagrama Mermaid
4. Revisa la consola (F12) para errores

## 7️⃣ Variables de Entorno en Producción

### En Vercel

```
Dashboard → Settings → Environment Variables
├─ VITE_OPENAI_API_KEY = sk-proj-...
├─ Environment: Production
└─ Save
```

### En Netlify

```
Site Settings → Build & Deploy → Environment
├─ Edit variables
├─ VITE_OPENAI_API_KEY = sk-proj-...
└─ Deploy
```

### En tu VPS

Crea `.env.production`:

```bash
# En tu servidor
cat > /var/www/html/.env.production << EOF
VITE_OPENAI_API_KEY=sk-proj-tu-key
EOF
```

## 8️⃣ Checklist de Seguridad

- [ ] `.env.local` NO está en Git (verifica `.gitignore`)
- [ ] API Key **NO** está hardcodeada en el código
- [ ] Usas `import.meta.env.VITE_*` para leer variables
- [ ] Las variables en producción están configuradas en la plataforma
- [ ] El build de producción NO incluye la variable en el código
- [ ] Probaste en `npm run preview` antes de desplegar
- [ ] Probaste en la URL de producción después de desplegar
- [ ] Monitoreaste la consola (F12) para errores

## ✅ Build Seguro

### ¿Cómo Vite maneja las variables?

Durante el build (`npm run build`):
- Vite reemplaza `import.meta.env.VITE_*` con el valor actual
- **IMPORTANTE**: Solo las variables definidas en `.env.local` o plataforma se incluyen
- Las variables NO usadas en el código se ignoran
- El archivo `.env.local` NO se sube al servidor

### Verificar Build

```bash
# Build
npm run build

# Revisar el archivo final
cat dist/index.html | grep -i "sk-"  # NO debe encontrar nada
cat dist/assets/*.js | grep -i "sk-"  # NO debe encontrar nada
```

Si aparece tu API Key expuesta, significa que la variable no estaba correctamente prefijada con `VITE_`.

## 🔧 Troubleshooting

### "api.openai.com not responding" error

**Posible causa**: `VITE_OPENAI_API_KEY` no está configurada

**Solución**:
1. Verifica que `.env.local` existe
2. Abre Developer Tools (F12)
3. Revisa Network → POST `/chat/completions`
4. Verifica que Authorization header tiene el token

### "CORS error"

**Posible causa**: La plataforma bloquea peticiones cross-origin a OpenAI

**Solución**:
1. Usa un proxy backend en tu servidor
2. O cambia a una API que soporte CORS (como Groq)

### "Diagrama no aparece"

**Debug**:
```javascript
// En console (F12)
console.log(import.meta.env.VITE_OPENAI_API_KEY)  // Debe mostrar tu key
```

## 📚 Más Información

- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [Vite Env Variables](https://vitejs.dev/guide/env-and-modes.html)

---

**¿Necesitas ayuda?** Revisa esta guía o contacta al administrador del proyecto.
