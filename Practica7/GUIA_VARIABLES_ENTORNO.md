# 🔐 Guía Completa: Variables de Entorno en Producción

## Tabla de Contenidos
1. [¿Qué son las variables de entorno?](#qué-son)
2. [Configuración Local](#configuración-local)
3. [Despliegue en Vercel](#despliegue-vercel)
4. [Despliegue en Netlify](#despliegue-netlify)
5. [Flujo Visual](#flujo-visual)

---

## <a name="qué-son"></a>1️⃣ ¿Qué son las Variables de Entorno?

Son valores secretos (API Keys) que:
- 🔒 **NO se hardcodean** en el código
- 🔒 **NO se suben a Git**
- 🔒 **Solo existen en tu equipo o servidor**
- ✅ Se leen mediante `import.meta.env.VITE_*` en Vite

### Ejemplo Real

```javascript
// ❌ NUNCA HAGAS ESTO (Hardcodeado - INSEGURO)
const API_KEY = "sk-proj-12345abcde";

// ✅ SIEMPRE HAZ ESTO (Variable de Entorno - SEGURO)
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
// Vite busca la variable en: .env.local (dev) o plataforma (prod)
```

---

## <a name="configuración-local"></a>2️⃣ Configuración Local (Desarrollo)

### Paso 1: Crear .env.local

```bash
# En la raíz del proyecto
cp .env.example .env.local
```

### Paso 2: Editar .env.local

**Para p7-ej2 (AI-UML Architect):**

```env
# .env.local
VITE_OPENAI_API_KEY=sk-proj-Tu-Key-De-45-Caracteres-Aqui
```

**Para p7-ej3 (SpriteSheet AI Forge):**

```env
# .env.local
VITE_HF_API_KEY=hf_Tu-Key-De-Hugging-Face-Aqui
```

### Paso 3: Obtener API Keys

#### OpenAI (para p7-ej2)

```bash
1. Ve a: https://platform.openai.com/api-keys
2. Click "+ Create new secret key"
3. Dale un nombre (ej: "Mi Proyecto")
4. Copia el valor que empieza con sk-proj-
5. Pegalo en .env.local
```

#### Hugging Face (para p7-ej3)

```bash
1. Crea cuenta Free en: https://huggingface.co
2. Ve a: https://huggingface.co/settings/tokens
3. Click "New token"
4. Type: "Read" (es suficiente)
5. Dale un nombre (ej: "Mi App")
6. Copia el valor que empieza con hf_
7. Pegalo en .env.local
```

### Paso 4: Verificar que funciona

```bash
# Terminal
npm run dev

# En tu navegador, abre Developer Tools (F12)
# Consola y ejecuta:
console.log(import.meta.env.VITE_OPENAI_API_KEY)
// Debería mostrar tu API Key
```

### ⚠️ Importante: .env.local en .gitignore

```bash
# Verificar que está protegido
git status | grep '.env'
# NO debe mostrar: ".env.local"

# Si lo muestra, algo está mal:
echo ".env.local" >> .gitignore
git rm --cached .env.local  # Si ya fue commitido
```

---

## <a name="despliegue-vercel"></a>3️⃣ Despliegue en Vercel

### Opción A: Vercel CLI (La más rápida)

```bash
# 1. Instalar Vercel CLI (una sola vez)
npm install -g vercel

# 2. Hacer login
vercel login

# 3. Desplegar
cd p7-ej2  # o p7-ej3
vercel

# 4. Responder preguntas:
# ? Set up and deploy "~/p7-ej2"? (y/N) → y
# ? Which scope do you want to deploy to? → Tu cuenta
# ? Link to existing project? (y/N) → N
# ? What's your project's name? (p7-ej2) → Enter
# ? In which directory is your code? (.) → Enter
# ? Want to modify these settings before deploying? (y/N) → y

# 5. IMPORTANTE: Agregar variables de entorno
# En la interfaz que se abre:
# "Build & Development Settings"
# Scroll down a "Environment Variables"
# Agrega:
#  VITE_OPENAI_API_KEY = sk-proj-...
#  o
#  VITE_HF_API_KEY = hf_...
```

**URLs Resultantes:**
- p7-ej2: `https://p7-ej2.vercel.app`
- p7-ej3: `https://p7-ej3.vercel.app`

---

### Opción B: GitHub Integration (Automático)

```bash
# 1. Pushear el código a GitHub (sin .env.local)
git add .
git commit -m "feat: preparar para producción"
git push origin main

# 2. Ir a https://vercel.com/new
# 3. Click "Continue with GitHub"
# 4. Seleccionar el repo
# 5. Click "Import"
# 6. En "Build and Output Settings":
#    - Framework: Vite
#    - Build Command: npm run build
#    - Output Directory: dist
# 7. Click "Environment Variables"
# 8. Agregar:
#    VITE_OPENAI_API_KEY = sk-proj-...
# 9. Click "Deploy"
```

**Resultado:**
- Vercel creará un dominio automático
- Cada `git push` redeploy automático
- SIN necesidad de CLI

---

## <a name="despliegue-netlify"></a>4️⃣ Despliegue en Netlify

### Opción A: Netlify CLI

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Hacer login
netlify login

# 3. Desplegar
cd p7-ej2  # o p7-ej3
netlify deploy

# Te preguntará:
# Publish directory: ./dist
```

### Opción B: Netlify UI (Más simple)

```
1. Ve a https://app.netlify.com
2. Click "New site from Git"
3. Elige GitHub
4. Busca tu repo
5. Click "Deploy site"
6. En Site Settings → Build & Deploy → Environment
7. Click "Edit variables"
8. Agrega:
   VITE_OPENAI_API_KEY = sk-proj-...
   o
   VITE_HF_API_KEY = hf_...
9. Trigger new deploy
```

---

## <a name="flujo-visual"></a>5️⃣ Flujo Visual Completo

### Desarrollo Local

```
┌─────────────────────────────────────────────────┐
│              TU COMPUTADORA                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  p7-ej2/                                       │
│  ├── .env.local                                │
│  │   └─ VITE_OPENAI_API_KEY=sk-proj-...       │
│  ├── src/services/aiService.ts                 │
│  │   └─ Authorization: Bearer ${             │
│  │              import.meta.env.VITE_      │
│  │              OPENAI_API_KEY}               │
│  │                                             │
│  └─ npm run dev                                │
│     └─ Lee .env.local                          │
│        └─ API Key inyectado en memoria         │
│           └─ ✅ Funcionando                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Producción en Vercel

```
┌──────────────────────────────────────────────────┐
│              GITHUB REPOSITORY                   │
├──────────────────────────────────────────────────┤
│                                                  │
│  p7-ej2/                                        │
│  ├── .env.example (COMMITTED)                  │
│  │   └─ VITE_OPENAI_API_KEY=sk-proj-tu-...    │
│  ├── .gitignore (COMMITTED)                    │
│  │   └─ *.local (protege .env.local)           │
│  ├── .env.local (NO COMMITTED)                 │
│  │   └─ Solo en tu máquina 🔒                  │
│  │                                              │
│  └─ git push                                    │
│     └─ triggers Vercel webhook                 │
│                                                  │
└──────────────────────────────────────────────────┘
          │
          │ git push detected
          ↓
┌──────────────────────────────────────────────────┐
│              VERCEL DASHBOARD                    │
├──────────────────────────────────────────────────┤
│                                                  │
│  1. Clone repo desde GitHub                     │
│  2. Ejecuta: npm install && npm run build      │
│  3. Lee Environment Variables:                  │
│     VITE_OPENAI_API_KEY = sk-proj-...🔒       │
│  4. Inyecta variables en build                  │
│     $ npm run build                             │
│       └─ Compila código                         │
│         └─ Reemplaza import.meta.env.*         │
│           └─ API Key se inyecta segura 🔒      │
│  5. Sirve dist/ en CDN global                   │
│                                                  │
└──────────────────────────────────────────────────┘
          │
          ↓
┌──────────────────────────────────────────────────┐
│        https://p7-ej2.vercel.app (HTTPS)       │
├──────────────────────────────────────────────────┤
│                                                  │
│  1. Usuario abre app en navegador               │
│  2. Browser descarga archivos estáticos         │
│  3. JavaScript ejecuta                          │
│  4. Petición a OpenAI                           │
│     └─ Authorization: Bearer sk-proj-...       │
│        (fue inyectado en build) ✅             │
│  5. Diagrama Mermaid generado                   │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🔄 Resumen del Flujo

### Local (npm run dev)

```
.env.local (API Key)
    ↓
import.meta.env.VITE_OPENAI_API_KEY
    ↓
Código accede al valor
    ↓
API Key disponible en runtime
```

### Producción (Vercel)

```
Vercel Dashboard (API Key configurada)
    ↓
npm run build (Vite reemplaza variables)
    ↓
Código compilado incluye valor inyectado
    ↓
dist/ subido a CDN
    ↓
Usuario descarga dist/ compilado
    ↓
API Key ya está incluido en el bundle
```

---

## 🎯 Checklist de Seguridad

### Antes de commitear a Git

- [ ] `.env.local` existe solo en tu máquina
- [ ] `.env.local` está en `.gitignore`
- [ ] `.env.example` está en el repo (SIN valores reales)
- [ ] `.private.env` o `.secrets` NO existen
- [ ] `git status` NO muestra archivos `.env.*`

### Antes de desplegar

- [ ] Variables están configuradas en Vercel/Netlify
- [ ] `npm run build` ejecuta sin errores
- [ ] `npm run preview` funciona correctamente
- [ ] F12 Console muestra `undefined` (nunca el valor real)
- [ ] Peticiones a API funcionan correctamente

### Después de desplegar

- [ ] App en https://tu-dominio.vercel.app funciona
- [ ] Funcionalidad de IA genera resultados
- [ ] F12 Network muestra bearer token inyectado
- [ ] F12 Console NO expone el valor crudo

---

## 🚨 Problemas Comunes

### "Error: VITE_OPENAI_API_KEY is undefined"

```
Causa: Variables no configuradas en Vercel
Solución:
1. Ve a Vercel Dashboard
2. Project Settings → Environment Variables
3. Agrega: VITE_OPENAI_API_KEY = sk-proj-...
4. Trigger new deployment
5. Espera a que compile
```

### "Puedo ver mi API Key en el código compilado"

```
Causa: Variable SIN prefijo VITE_ en Vite
Solución:
1. Asegúrate de usar: VITE_*
2. NO uses: VITE_PRIVATE_* (nunca se inyecta)
3. Rebuild: npm run build
4. Verifica: npm run preview
```

### ".env.local fue commitido accidentalmente"

```
Paso 1: Borrar de Git
$ git rm --cached .env.local
$ git commit -m "remove .env.local"
$ git push

Paso 2: Regenerar API Key (por seguridad)
$ Abre https://platform.openai.com/api-keys
$ Delete la vieja key
$ Create nueva key
$ Actualiza en Vercel

Paso 3: Agregar a .gitignore
$ echo ".env.local" >> .gitignore
$ git add .gitignore
$ git commit -m "add .env.local to gitignore"
$ git push
```

---

## ✅ Estado Actual

Ambos proyectos están completamente configurados y listos para:

### p7-ej2 (AI-UML Architect)
- ✅ `.env.example` con `VITE_OPENAI_API_KEY`
- ✅ `src/services/aiService.ts` usa `import.meta.env`
- ✅ Documentación en `PRODUCCION.md`
- ✅ Listo para Vercel/Netlify

### p7-ej3 (SpriteSheet AI Forge)
- ✅ `.env.example` con `VITE_HF_API_KEY`
- ✅ `src/services/imageService.ts` usa `import.meta.env`
- ✅ Documentación en `PRODUCCION.md`
- ✅ Listo para Vercel/Netlify

---

## 📚 Referencias

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)
- [Vercel Environment Variables](https://vercel.com/docs/environments/environment-variables)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [Hugging Face Tokens](https://huggingface.co/settings/tokens)

---

**¡Listo para pasar a producción de forma segura!** 🚀
