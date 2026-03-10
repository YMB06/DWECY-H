# 🤖 Ejercicio 2: AI-UML Architect - Generador de Diagramas con IA

Herramienta de diseño asistida por Inteligencia Artificial para generar diagramas UML/Mermaid.

## 🎯 Características

- ✅ Generación de diagramas con IA (OpenAI/Groq)
- ✅ Cancelación de peticiones con AbortController
- ✅ Renderizado dinámico con Mermaid.js
- ✅ Exportación en formatos SVG y PNG
- ✅ Gestión de estado con Pinia
- ✅ TypeScript + Vue 3 Composition API

## 🚀 Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar API Key

Copia `.env.example` a `.env.local`:

```bash
copy .env.example .env.local
```

Edita `.env.local` y añade tu API key:

**Opción A: OpenAI** (requiere pago)
```
VITE_OPENAI_API_KEY=sk-...
```

**Opción B: Groq** (GRATIS - Recomendado)
1. Regístrate en https://console.groq.com
2. Crea una API key
3. Añade en `.env.local`:
```
VITE_OPENAI_API_KEY=gsk_...
```
4. Cambia en `src/services/api.ts`:
```typescript
baseURL: 'https://api.groq.com/openai/v1'
```

### 3. Ejecutar

```bash
npm run dev
```

## 📖 Uso

1. Escribe una descripción del diagrama (ej: "Diagrama de flujo de login")
2. Haz clic en "Generar Diagrama"
3. Espera a que la IA genere el código Mermaid
4. El diagrama se renderiza automáticamente
5. Exporta como SVG o PNG

## 🛑 Cancelar Generación

Si la IA tarda mucho, usa el botón "Cancelar Generación" para abortar la petición.

## 🔧 Tecnologías

- Vue 3 + TypeScript
- Pinia (estado)
- Axios (HTTP + AbortController)
- Mermaid.js (renderizado)
- Vite

## 📦 APIs Gratuitas Alternativas

- **Groq**: https://console.groq.com (Recomendado - Rápido y gratis)
- **Hugging Face**: https://huggingface.co/inference-api
- **Together AI**: https://api.together.xyz
