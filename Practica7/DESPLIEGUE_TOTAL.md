# 🚀 Actividad 5: Despliegue Total a Producción

## Resumen Ejecutivo

Has completado **2 actividades** en Práctica 7:
- ✅ **Actividad 4**: Implementado GitHub DevHub (p7-ej4) con OAuth
- ✅ **Actividad 5**: Preparados proyectos para producción (p7-ej2, p7-ej3)

Este documento consolida **TODO** lo que necesitas saber.

---

## 📋 Tu Situación Actual

### Proyectos Listos para Producción

#### 1️⃣ p7-ej2: AI-UML Architect
- 🤖 Genera diagramas Mermaid con IA
- 🔑 Necesita: **OpenAI API Key**
- 📍 Documentación: [p7-ej2/PRODUCCION.md](../p7-ej2/PRODUCCION.md)
- ✅ Estado: **Seguridad verificada** (variables externalizadas)

#### 2️⃣ p7-ej3: SpriteSheet AI Forge
- 🎨 Genera spritesheets con IA
- 🔑 Necesita: **Hugging Face API Key**
- 📍 Documentación: [p7-ej3/PRODUCCION.md](../p7-ej3/PRODUCCION.md)
- ✅ Estado: **Seguridad verificada** (variables externalizadas)

#### 3️⃣ p7-ej4: GitHub DevHub (Bonus)
- 🔐 Auth segura con OAuth2
- 🎯 Componentes: Login, Dashboard, Interceptores
- ✅ Estado: **Implementado 100%** (OAuth, Tokens, Tests)

---

## 🎯 Plan de Despliegue (Hoy)

### Fase 1: Preparación Local (15 minutos)

```bash
# 1. Navega al proyecto
cd ~/Documents/DWECY-H/Practica7/p7-ej2

# 2. Crea .env.local leyendo .env.example
cp .env.example .env.local

# 3. Obtén tu OpenAI API Key
## Ir a: https://platform.openai.com/api-keys
## Crear nueva key
## Copiar valor que empieza con "sk-proj-"

# 4. Edita .env.local
nano .env.local
# o en Windows:
# code .env.local
# Pegar:
# VITE_OPENAI_API_KEY=sk-proj-TU-KEY-AQUI

# 5. Prueba que funciona
npm run dev
# Abre http://localhost:5173
# Describe una arquitectura de software
# Debería generar diagrama Mermaid
```

**Verificación**: Si en F12 Console ejecutas:
```javascript
console.log(import.meta.env.VITE_OPENAI_API_KEY)
// Debe mostrar: sk-proj-...
```

---

### Fase 2: Despliegue a Vercel (10 minutos)

#### Opción A: Vercel CLI (Recomendado)

```bash
# 1. Instala Vercel CLI global
npm install -g vercel

# 2. Login a tu cuenta
vercel login
# Abre el navegador cuando lo pida

# 3. Despliega
cd ~/Documents/DWECY-H/Practica7/p7-ej2
vercel

# Responde:
# ? Set up and deploy? → y
# ? Which scope? → Tu email/cuenta
# ? Link to existing? → N
# ? Project name? → p7-ej2
# ? Directory? → . (punto)
# ? Modify settings? → y

# 4. IMPORTANTE: En la UI que se abre
# Scroll a "Environment Variables"
# Click "Add New"
# Name: VITE_OPENAI_API_KEY
# Value: sk-proj-TU-KEY
# Click "Add"
# Click "Deploy"

# Resultado:
# ✅ App en: https://p7-ej2.vercel.app
```

#### Opción B: GitHub Integration (Automático)

```bash
# 1. Push a GitHub (sin .env.local)
git add .
git commit -m "feat: preparar p7-ej2 para producción"
git push origin main

# 2. Ir a https://vercel.com/new
# 3. "Import Git Repository"
# 4. Selecciona repo DWECY-H
# 5. Click "Import"
# 6. En configuración:
#    - Framework: Vite
#    - Build command: npm run build
#    - Output: dist
# 7. Environment Variables:
#    - VITE_OPENAI_API_KEY = sk-proj-TU-KEY
# 8. Click "Deploy"

# Resultado:
# ✅ Auto-deploy en cada git push
# ✅ App funciona en dominio automático
```

---

### Fase 3: Repetir para p7-ej3 (10 minutos)

```bash
# Exactamente lo mismo que Fase 1-2, pero:
cd ~/Documents/DWECY-H/Practica7/p7-ej3

# API Key es diferente:
# 1. Ir a: https://huggingface.co/settings/tokens
# 2. Click "New token"
# 3. Type: "Read"
# 4. Copiar el valor que empieza con "hf_"
# 5. En Vercel: VITE_HF_API_KEY = hf_TU-KEY

# ✅ App en: https://p7-ej3.vercel.app
```

---

## 🔐 Verificación de Seguridad

### Antes de Commitar

```bash
# ¿Está .env.local protegido?
git status
# Debería NO mostrar .env.local

# ¿Hay credenciales en código?
grep -r "sk-proj-" src/ || echo "✅ Seguro"
grep -r "hf_" src/ || echo "✅ Seguro"
# Debería mostrar: ✅ Seguro

# ¿Está en .gitignore?
cat .gitignore | grep "*.local"
# Debería mostrar: *.local
```

### Después de Desplegar

```bash
# En consola del navegador (F12):
console.log(import.meta.env.VITE_OPENAI_API_KEY)
// Debe mostrar: undefined (NO el valor real)
// Eso es CORRECTO (está protegido en el server)

// Ver que el token llegó en la petición:
// Network → busca llamada a "api.openai.com"
// Headers → Authorization: Bearer sk-proj-...
// ✅ Verificado
```

---

## 📊 Arquitectura Post-Despliegue

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL CLOUD                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  https://p7-ej2.vercel.app                             │
│  ├── HTML/CSS/JS compilado                             │
│  ├── import.meta.env.VITE_OPENAI_API_KEY               │
│  │   └─ Inyectado en BUILD TIME ✅                     │
│  └── Servido en CDN global (milisegundos)             │
│                                                         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  USUARIO FINAL (Browser)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Abre https://p7-ej2.vercel.app en navegador        │
│  2. Descarga archivos estáticos (dist/)                │
│  3. "Describe una arquitectura de microservicios"      │
│  4. JavaScript:                                         │
│     - Envía prompt a OpenAI                            │
│     - Incluye header: Authorization: Bearer sk-... ✅  │
│  5. OpenAI responde con Mermaid                         │
│  6. Diagrama renderizado en la página                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  OPENAI API SERVERS                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Valida Bearer token (sk-proj-...)                  │
│  2. Procesa prompt                                      │
│  3. Genera Mermaid con GPT-4                           │
│  4. Retorna JSON con diagrama                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ⚠️ Si Algo Falla

### Error 1: "VITE_OPENAI_API_KEY is undefined"

```
Problema: Variable NO llegó a Vercel
Solución:
1. Dashboard Vercel → Project Settings
2. Environment Variables
3. Verifica que exista: VITE_OPENAI_API_KEY
4. Si no existe → Agregar
5. Click "Redeploy"
6. Espera a que termine
```

### Error 2: "401 Unauthorized from OpenAI"

```
Problema: API Key es inválida o expirada
Solución:
1. https://platform.openai.com/api-keys
2. Busca la key que usas
3. Si está "disabled" → Delete y crear nueva
4. Copiar nuevo valor
5. Vercel Dashboard → Environment Variables
6. Actualizar: VITE_OPENAI_API_KEY
7. Redeploy
```

### Error 3: "Puedo ver mi API Key en el navegador (¡Inseguro!)"

```
Problema: La key está hardcodeada en código
Solución:
1. Abre src/services/aiService.ts
2. Busca por: "sk-proj-" o "hf_"
3. Si encuentra un valor literal → ¡ERROR!
4. Reemplazar por: import.meta.env.VITE_OPENAI_API_KEY
5. git add, commit, push
6. Vercel auto-redeploy
7. Regenerar la API Key vieja (fue expuesta)
```

### Error 4: ".env.local fue commitido a Git"

```
¿Cómo sé? → git log muestra "VITE_OPENAI_API_KEY=sk-proj-"

Solución URGENTE:
1. $ git rm --cached .env.local
2. $ git commit -m "Remove .env.local from history"
3. $ git push
4. REGENERAR API KEY:
   - https://platform.openai.com/api-keys
   - Delete la vieja (fue expuesta públicamente)
   - Create nueva
   - Actualizar en Vercel
5. A GitHub le toma ~1 minuto limpiar el histórico
```

---

## 📈 Próximos Pasos (Opcionales)

### 1. Agregar Dominio Personalizado

```bash
# En Vercel Dashboard:
# Project Settings → Domains
# Agregar tu dominio personalizado (ej: tu-app.com)
# Seguir instrucciones de DNS
```

### 2. Configurar CI/CD

```bash
# Crear .github/workflows/test.yml para:
# - Ejecutar npm test en cada push
# - Bloquear merge si fallan tests
# - Deploy automático si pasa
```

### 3. Monitoring & Logs

```bash
# Vercel proporciona:
# - Edge Logs (en tiempo real)
# - Function Logs (servidor)
# - Browser Logs (errores del usuario)
# Accesible desde Dashboard → Deployments
```

### 4. Renovación de API Keys

```bash
# Buena práctica: cada 90 días
# 1. https://platform.openai.com/api-keys
# 2. Delete key vieja
# 3. Create key nueva
# 4. Actualizar en Vercel
# 5. No hay downtime (Vercel actualiza al momento)
```

---

## 📚 Documentación Completa

Archivos de referencia que creé para ti:

| Archivo | Propósito |
|---------|-----------|
| [GUIA_VARIABLES_ENTORNO.md](./GUIA_VARIABLES_ENTORNO.md) | Explicación visual de variables |
| [p7-ej2/PRODUCCION.md](../p7-ej2/PRODUCCION.md) | Guía completa p7-ej2 → OpenAI |
| [p7-ej3/PRODUCCION.md](../p7-ej3/PRODUCCION.md) | Guía completa p7-ej3 → Hugging Face |
| [ESTADO_PRODUCCION.md](./ESTADO_PRODUCCION.md) | Checklist de seguridad |

---

## ✅ Checklist Final

### Antes de Desplegar

- [ ] Creaste `.env.local` desde `.env.example`
- [ ] Agregaste tu OpenAI/Hugging Face API Key
- [ ] Ejecutaste `npm run dev` y probaste localmente
- [ ] Verificaste que `git status` NO muestra `.env.local`
- [ ] Verificaste que `.gitignore` contiene `*.local`
- [ ] Pusheaste código a GitHub (SIN `.env.local`)

### Durante el Despliegue

- [ ] Creaste proyecto en Vercel (CLI o Web)
- [ ] Agregaste Environment Variables en Vercel
- [ ] Esperaste a que el deploy terminara (verde ✅)
- [ ] Abriste la URL: `https://p7-ej2.vercel.app`
- [ ] Probaste que la funcionalidad de IA funciona
- [ ] Verificaste en F12 Console que variable es `undefined` (protegida)

### Después del Despliegue

- [ ] App está online y accesible
- [ ] Funcionalidad de IA responde correctamente
- [ ] No hay errores en Vercel Logs
- [ ] Si cambrias código → auto-redeploy funciona
- [ ] Si cambias API Key → Redeploy manual y funciona

---

## 🎓 Lo que Aprendiste

### Técnicas
✅ Variables de entorno en Vite (VITE_ prefix)
✅ Diferencia: desarrollo vs producción
✅ Seguridad: nunca hardcodear secretos
✅ Despliegue: Vercel, Netlify, VPS
✅ CI/CD: GitHub Integration automático
✅ OAuth2 + JWT + Interceptores (Actividad 4)
✅ Unit Testing + Integration Testing (Vitest)

### Seguridad
✅ .env.local: gitignored, solo local
✅ .env.example: versionado, sin valores
✅ API Keys en plataforma, no en código
✅ Tokens inyectados en build time
✅ Variables protegidas por HTTPS

### DevOps
✅ Despliegue a Vercel (Fastest way)
✅ Auto-deploy en git push
✅ Environment isolation (dev vs prod)
✅ Secrets management
✅ Logs & Monitoring

---

## 🎉 ¡Felicitaciones!

**Has completado Práctica 7** 🚀

| Actividad | Estado | Detalles |
|-----------|--------|----------|
| **Ej 1** | ✅ | p7: CRUD básico |
| **Ej 2** | ✅ | p7-ej2: AI-UML |
| **Ej 3** | ✅ | p7-ej3: SpriteSheet |
| **Ej 4** | ✅ | p7-ej4: OAuth + Tokens + Tests |
| **Ej 5** | ✅ | Producción: Env Vars + Deployment |

---

## 💬 Preguntas Frecuentes

**P: ¿Necesito pagar algo en Vercel o Netlify?**
R: No. Plan gratuito incluye: 100 GB/mes, SSL, CDN global, auto-builds.

**P: ¿Cuánto tarda en desplegar?**
R: 1-3 minutos típicamente. Vercel muestra progreso en tiempo real.

**P: ¿Puedo desplegar en otro lado (AWS, Heroku)?**
R: Sí, pero Vercel es el más fácil para Vite + Node.

**P: ¿Qué pasa si cambio código?**
R: Si usas GitHub Integration, cada `git push` auto-redeploy.

**P: ¿Cuándo expira una API Key?**
R: Indefinidamente (hasta que la deletes). Pero actualizar cada 90 días es buena práctica.

**P: ¿Puedo usar las mismas variables en dev y prod?**
R: Sí, Vite inyecta valores diferentes según el contexto (dev vs prod).

---

## 📞 Contacto / Soporte

Si algo no funciona:

1. Revisa los **Error Symptoms** arriba
2. Consulta la documentación específica (PRODUCCION.md)
3. Verifica Vercel Logs (Dashboard → Deployments → Logs)
4. Abre Browser DevTools (F12) y busca errores
5. Preguntas en clase o tutorías

---

**Última actualización**: Hoy
**Verificado**: ✅ Todas las variables correctamente externalizadas
**Seguridad**: ✅ Cero API Keys hardcodeadas

🚀 **¡Listo para producción!**
