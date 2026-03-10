# 🎮 Ejercicio 3: SpriteSheet AI Forge - Generador y Animador de Sprites

Herramienta para generar sprites de personajes con IA y animarlos automáticamente.

## 🎯 Características

- ✅ Generación de sprites con IA (Hugging Face)
- ✅ Barra de progreso en tiempo real (onDownloadProgress)
- ✅ Manejo de imágenes binarias (Blob + URL.createObjectURL)
- ✅ Animación CSS dinámica con steps()
- ✅ Control de frames y velocidad
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

Obtén tu API key GRATIS:
1. Regístrate en https://huggingface.co
2. Ve a https://huggingface.co/settings/tokens
3. Crea un nuevo token (Read access)
4. Añade en `.env.local`:
```
VITE_HF_API_KEY=hf_...
```

### 3. Ejecutar

```bash
npm run dev
```

## 📖 Uso

1. Escribe una descripción del sprite (ej: "Guerrero pixel art corriendo en 4 fotogramas, sprite sheet")
2. Haz clic en "Generar Sprite"
3. Observa la barra de progreso mientras se descarga
4. Ajusta el número de frames y velocidad
5. El sprite se anima automáticamente

## 🎨 Características Técnicas

### Monitoreo de Progreso
```typescript
onDownloadProgress: (progressEvent) => {
  const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
  onProgress(progress)
}
```

### Manejo de Blobs
```typescript
responseType: 'blob'
spriteUrl.value = URL.createObjectURL(blob)
```

### Animación CSS Dinámica
```css
animation: sprite-animation ${speed}s steps(${frames}) infinite
```

## 🔧 Tecnologías

- Vue 3 + TypeScript
- Pinia (estado)
- Axios (HTTP + progress)
- Hugging Face API
- CSS Animations
- Vite

## 📦 Modelos de IA Recomendados

- **Stable Diffusion 2.1**: stabilityai/stable-diffusion-2-1
- **Stable Diffusion XL**: stabilityai/stable-diffusion-xl-base-1.0
- **Pixel Art**: nerijs/pixel-art-xl
