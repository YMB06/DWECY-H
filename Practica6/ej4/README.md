# 📦 Diseñador de Packaging B2B - Three.js + Vue

Herramienta para que empresas diseñen sus cajas de envío personalizadas en tiempo real con visualización 3D.

## 🎯 Características

### Escena 3D (Three.js)
- ✅ Renderizado de caja 3D con textura
- ✅ Iluminación realista (ambiental + direccional)
- ✅ Animación de rotación continua
- ✅ Detección de clics en el modelo 3D

### Comunicación Bidireccional Vue ↔ Three.js
- ✅ **Vue → Three.js**: Sliders actualizan dimensiones en tiempo real
- ✅ **Three.js → Vue**: Clic en la caja muestra toast con dimensiones
- ✅ Selector de color con actualización instantánea
- ✅ Cálculo automático de volumen y área superficial

### Controles Vue
- ✅ Slider de Ancho (5-30 cm)
- ✅ Slider de Alto (5-30 cm)
- ✅ Slider de Profundidad (5-30 cm)
- ✅ Color Picker para personalización
- ✅ Panel de especificaciones técnicas

## 🛠️ Stack Tecnológico

- **Vue 3** - Framework frontend (Composition API)
- **Three.js** - Renderizado 3D WebGL
- **TypeScript** - Tipado estático
- **Vite** - Build tool

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── packaging/
│       ├── BoxViewer3D.vue      # Visor 3D con Three.js
│       ├── ControlPanel.vue     # Panel de controles
│       └── PackagingDesigner.vue # Componente principal
└── views/
    ├── HomeView.vue             # Vista principal
    └── AboutView.vue            # Información
```

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build producción
npm run build
```

## 🎮 Uso de la Aplicación

1. **Ajustar dimensiones**: Usa los sliders para cambiar ancho, alto y profundidad
2. **Cambiar color**: Selecciona un color con el color picker
3. **Ver especificaciones**: El panel muestra volumen y área superficial
4. **Interactuar con 3D**: Haz clic en la caja para ver sus dimensiones

## 🔧 Integración Técnica

### Reactividad Vue → Three.js

```typescript
watch(() => [props.width, props.height, props.depth], ([w, h, d]) => {
  if (box) {
    box.scale.set(w / 10, h / 10, d / 10)
  }
})
```

### Detección de Clics Three.js → Vue

```typescript
const raycaster = new THREE.Raycaster()
raycaster.setFromCamera(mouse, camera)
const intersects = raycaster.intersectObject(box)

if (intersects.length > 0) {
  showToast.value = true
}
```

## 📊 Cálculos Automáticos

- **Volumen**: `ancho × alto × profundidad`
- **Área Superficial**: `2 × (ancho×alto + ancho×profundidad + alto×profundidad)`

## 🎨 Características Visuales

- Iluminación ambiental y direccional
- Material con roughness y metalness
- Rotación automática para mejor visualización
- Sombras y profundidad realistas
- Color personalizable en tiempo real

## 🔄 Gestión de Memoria

El componente limpia correctamente los recursos de Three.js:

```typescript
onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
  container.value?.removeChild(renderer.domElement)
})
```

## 💡 Casos de Uso B2B

- Diseño de packaging personalizado
- Prototipado rápido de cajas
- Cálculo de materiales necesarios
- Presentación a clientes
- Optimización de costos de envío

## 🎓 Conceptos Aplicados

- **Integración de Three.js** en Vue
- **Comunicación bidireccional** entre frameworks
- **Reactividad** con watchers
- **Raycasting** para detección de clics 3D
- **v-model** para binding bidireccional
- **Computed properties** para cálculos derivados

## 📱 Responsive

El diseño se adapta a diferentes tamaños de pantalla con CSS Grid.

## 🎯 Requisitos Cumplidos

✅ Escena 3D con cubo/prisma rectangular  
✅ Textura y material realista  
✅ Iluminación básica  
✅ Sliders para dimensiones  
✅ Selector de color  
✅ Reactividad en tiempo real  
✅ Feedback inverso con toast/alert  
✅ Gestión de memoria correcta
