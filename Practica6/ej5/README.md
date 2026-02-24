# 🏗️ Warehouse Simulator - Phaser + Vue

Módulo de gamificación para formar a conductores de carretillas elevadoras mediante un juego interactivo 2D.

## 🎯 Características

### Juego (Phaser)
- ✅ Juego 2D con vista cenital
- ✅ Personaje controlable (carretilla) con flechas del teclado
- ✅ Sistema de recolección de cajas
- ✅ Física arcade simple
- ✅ Respawn automático de cajas

### Integración Híbrida Vue + Phaser
- ✅ Juego renderizado dentro de componente Vue
- ✅ HUD externo con componentes HTML/Vue superpuestos
- ✅ Comunicación mediante eventos personalizados
- ✅ Gestión de memoria: destrucción correcta al desmontar

### UI Externa (Vue)
- ✅ Contador de puntuación (cajas recogidas)
- ✅ Temporizador en tiempo real
- ✅ Botón de reiniciar juego
- ✅ Instrucciones de control

## 🛠️ Stack Tecnológico

- **Vue 3** - Framework frontend (Composition API)
- **Phaser 3** - Motor de juego 2D
- **TypeScript** - Tipado estático
- **Vite** - Build tool

## 📁 Estructura del Proyecto

```
src/
├── game/
│   ├── WarehouseScene.ts    # Escena principal del juego
│   └── config.ts             # Configuración de Phaser
├── components/
│   └── game/
│       ├── WarehouseGame.vue # Componente principal del juego
│       └── GameHUD.vue       # HUD (puntuación, tiempo, botones)
└── views/
    ├── HomeView.vue          # Vista principal con el juego
    └── AboutView.vue         # Información del proyecto
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

## 🎮 Controles

- **⬆️ Flecha Arriba** - Mover hacia arriba
- **⬇️ Flecha Abajo** - Mover hacia abajo
- **⬅️ Flecha Izquierda** - Mover hacia la izquierda
- **➡️ Flecha Derecha** - Mover hacia la derecha

## 🔧 Integración Técnica

### Eventos Phaser → Vue

```typescript
// En Phaser (WarehouseScene.ts)
this.game.events.emit('box-collected')

// En Vue (WarehouseGame.vue)
game.events.on('box-collected', () => {
  score.value++
})
```

### Gestión de Memoria

```typescript
onUnmounted(() => {
  // Destruir instancia de Phaser
  if (game) {
    game.destroy(true)
    game = null
  }
  
  // Limpiar timers
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
```

## 🎨 Elementos del Juego

- **🟨 Cuadrado Amarillo** - Carretilla elevadora (jugador)
- **🟧 Cuadrado Naranja** - Caja para recoger
- **⬜ Fondo Gris** - Suelo del almacén

## 📊 Sistema de Puntuación

- Cada caja recogida suma 1 punto
- El temporizador cuenta el tiempo transcurrido
- El botón de reiniciar resetea puntuación y tiempo

## 🔄 Ciclo de Vida

1. **Montaje**: Se crea la instancia de Phaser
2. **Juego**: El jugador recoge cajas
3. **Eventos**: Phaser emite eventos a Vue
4. **Actualización**: Vue actualiza el HUD
5. **Desmontaje**: Se destruye Phaser correctamente

## 🎓 Conceptos Aplicados

- **Integración de librerías externas** en Vue
- **Comunicación mediante eventos** personalizados
- **Gestión del ciclo de vida** de componentes
- **Limpieza de recursos** para evitar memory leaks
- **Separación de responsabilidades** (lógica del juego vs UI)

## 🐛 Prevención de Memory Leaks

El componente implementa limpieza completa:
- Destrucción de la instancia de Phaser
- Limpieza de event listeners
- Limpieza de intervalos/timers
- Prevención de procesos "zombis"

## 📝 Notas Técnicas

- El canvas de Phaser se renderiza en un `<div>` de Vue
- El HUD está posicionado absolutamente sobre el canvas
- Los eventos de Phaser se propagan al sistema reactivo de Vue
- La navegación entre rutas destruye y recrea el juego correctamente
