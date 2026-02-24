# 📦 Práctica 6: Vue Avanzado - Integración de Librerías Externas

Proyecto unificado que integra Three.js y Phaser con Vue 3, demostrando comunicación bidireccional y gestión de memoria.

## 🎯 Ejercicios Incluidos

### 📦 Ejercicio 4: Diseñador de Packaging B2B (Three.js)
Herramienta 3D para diseñar cajas de envío personalizadas en tiempo real.

**Características:**
- ✅ Escena 3D con Three.js
- ✅ Comunicación bidireccional Vue ↔ Three.js
- ✅ Sliders reactivos para dimensiones
- ✅ Color picker con actualización instantánea
- ✅ Detección de clics en modelo 3D
- ✅ Cálculo automático de volumen y área

**Ubicación:** `src/components/ej4-packaging/`

### 🏗️ Ejercicio 5: Warehouse Simulator (Phaser)
Juego 2D para formar conductores de carretillas elevadoras.

**Características:**
- ✅ Juego 2D con Phaser
- ✅ Integración híbrida Vue + Phaser
- ✅ HUD externo con componentes Vue
- ✅ Eventos personalizados Phaser → Vue
- ✅ Gestión de memoria correcta
- ✅ Control con teclado

**Ubicación:** `src/components/ej5-warehouse/` y `src/game/`

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ej4-packaging/          # Ejercicio 4: Three.js
│   │   ├── BoxViewer3D.vue     # Visor 3D
│   │   ├── ControlPanel.vue    # Panel de controles
│   │   └── PackagingDesigner.vue
│   └── ej5-warehouse/          # Ejercicio 5: Phaser
│       ├── GameHUD.vue         # HUD del juego
│       └── WarehouseGame.vue   # Componente principal
├── game/                       # Lógica de Phaser
│   ├── WarehouseScene.ts       # Escena del juego
│   └── config.ts               # Configuración
├── views/
│   ├── HomeView.vue            # Página principal
│   ├── Ejercicio4View.vue      # Vista Ejercicio 4
│   └── Ejercicio5View.vue      # Vista Ejercicio 5
├── router/
│   └── index.ts                # Rutas
├── App.vue                     # App principal
└── main.ts
```

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build producción
npm run build

# Tests
npm run test:unit
```

## 🎮 Navegación

- **/** - Página principal con descripción de ejercicios
- **/ej4** - Diseñador de Packaging (Three.js)
- **/ej5** - Warehouse Simulator (Phaser)

## 🛠️ Stack Tecnológico

- **Vue 3** - Framework frontend (Composition API)
- **Three.js** - Renderizado 3D WebGL
- **Phaser 3** - Motor de juego 2D
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Pinia** - Gestión de estado
- **Vue Router** - Enrutamiento

## 🔧 Conceptos Aplicados

### Ejercicio 4 (Three.js)
- Integración de Three.js en Vue
- Comunicación bidireccional con watchers
- Raycasting para detección de clics
- v-model para binding bidireccional
- Gestión de recursos WebGL

### Ejercicio 5 (Phaser)
- Integración de Phaser en Vue
- Eventos personalizados entre frameworks
- HUD externo con componentes Vue
- Gestión del ciclo de vida
- Prevención de memory leaks

## 📊 Características Técnicas

### Comunicación Vue ↔ Librerías Externas

**Vue → Three.js/Phaser:**
```typescript
watch(() => props.dimensions, (newDims) => {
  // Actualizar objeto 3D/juego
})
```

**Three.js/Phaser → Vue:**
```typescript
game.events.emit('custom-event')
// Vue escucha y actualiza estado reactivo
```

### Gestión de Memoria

```typescript
onUnmounted(() => {
  // Limpiar recursos
  renderer.dispose()
  game.destroy(true)
  clearInterval(timers)
})
```

## 🎓 Objetivos de Aprendizaje

1. ✅ Integrar librerías externas en Vue
2. ✅ Comunicación bidireccional entre frameworks
3. ✅ Gestión correcta del ciclo de vida
4. ✅ Prevención de memory leaks
5. ✅ Separación de responsabilidades
6. ✅ Arquitectura modular y escalable

## 📝 Notas de Desarrollo

- Cada ejercicio está completamente aislado en su carpeta
- Los componentes son reutilizables y modulares
- La navegación permite cambiar entre ejercicios sin conflictos
- La gestión de memoria previene procesos "zombis"
- El código está tipado con TypeScript

## 🎯 Casos de Uso

**Ejercicio 4:**
- Diseño de packaging personalizado
- Prototipado rápido
- Presentación a clientes
- Cálculo de materiales

**Ejercicio 5:**
- Formación de conductores
- Gamificación educativa
- Simulación de tareas
- Evaluación de habilidades
