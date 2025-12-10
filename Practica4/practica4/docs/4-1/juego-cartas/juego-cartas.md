# Componente JuegoCartas.vue

## Propósito

El componente `JuegoCartas.vue` es la interfaz principal del juego "El Último Descarte". Su función es proporcionar una experiencia visual e interactiva completa, integrando toda la lógica del juego a través del composable `useJuego`.

## Responsabilidades

- **Presentación Visual**: Renderizar cartas, mazo y descarte con estilos atractivos
- **Interacción del Usuario**: Manejar clicks en cartas y botones
- **Feedback Visual**: Mostrar mensajes, estados y animaciones
- **Responsive Design**: Adaptarse a diferentes tamaños de pantalla

## Estructura del Componente

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { useJuego } from '@/composables/4-1/useJuego';

// Integración con el composable
const {
  iniciarJuego,
  robarCarta,
  jugarCarta,
  manoJugador,
  cartaSuperiorDescarte,
  cartasEnMazo,
  mensaje,
  juegoTerminado
} = useJuego();

// Funciones auxiliares para la presentación
const obtenerSimbolo = (palo: string): string => { /* ... */ };
const obtenerColor = (palo: string): string => { /* ... */ };
</script>

<template>
  <!-- Interfaz visual del juego -->
</template>

<style scoped>
  /* Estilos específicos del componente */
</style>
```

## Integración con useJuego

### Estado Reactivo Consumido

El componente consume todo el estado reactivo del composable:

```typescript
// Estado del juego
const manoJugador = useJuego().manoJugador;           // Cartas del jugador
const cartaSuperiorDescarte = useJuego().cartaSuperiorDescarte; // Carta superior
const cartasEnMazo = useJuego().cartasEnMazo;         // Contador del mazo
const mensaje = useJuego().mensaje;                   // Mensajes informativos
const juegoTerminado = useJuego().juegoTerminado;     // Estado de fin de juego
```

### Funciones Utilizadas

```typescript
// Acciones del juego
const iniciarJuego = useJuego().iniciarJuego;         // Nuevo juego
const robarCarta = useJuego().robarCarta;             // Robar del mazo
const jugarCarta = useJuego().jugarCarta;             // Jugar carta de la mano
```

## Elementos de la Interfaz

### 1. Cabecera del Juego

```vue
<template>
  <div class="tablero">
    <h1>Juego de Cartas - Uno Solitario</h1>
    
    <div v-if="mensaje" class="mensaje" :class="{ ganaste: juegoTerminado }">
      {{ mensaje }}
    </div>
  </div>
</template>
```

**Características:**
- Título del juego
- Mensajes dinámicos con estilos condicionales
- Destacado especial para mensaje de victoria

### 2. Área de Juego (Mazo y Descarte)

```vue
<template>
  <div class="pilas">
    <!-- Mazo -->
    <div class="mazo" @click="robarCarta" :class="{ disabled: juegoTerminado }">
      <div class="carta-reverso">
        <div class="patron"></div>
        <div class="contador">{{ cartasEnMazo }}</div>
      </div>
      <p>Mazo (Click para robar)</p>
    </div>

    <!-- Descarte -->
    <div class="descarte">
      <div v-if="cartaSuperiorDescarte" class="carta">
        <!-- Carta visible con símbolos y colores -->
      </div>
      <p>Descarte</p>
    </div>
  </div>
</template>
```

**Características:**
- **Mazo**: Carta boca abajo con contador visible
- **Descarte**: Carta superior visible con símbolos reales
- **Interactividad**: Click en mazo para robar
- **Estados**: Deshabilitado cuando el juego termina

### 3. Mano del Jugador

```vue
<template>
  <div class="mano">
    <h2>Tu Mano ({{ manoJugador.length }} cartas)</h2>
    <div class="cartas-mano">
      <div 
        v-for="(carta, index) in manoJugador" 
        :key="index"
        class="carta"
        :style="{ color: obtenerColor(carta.palo) }"
        @click="jugarCarta(carta)"
        :class="{ disabled: juegoTerminado }"
      >
        <!-- Representación visual de la carta -->
      </div>
    </div>
  </div>
</template>
```

**Características:**
- **Contador dinámico**: Muestra número de cartas
- **Cartas interactivas**: Click para jugar
- **Colores reales**: Rojas (Corazones/Diamantes), Negras (Picas/Tréboles)
- **Símbolos**: Representación visual de palos

### 4. Controles del Juego

```vue
<template>
  <button v-if="juegoTerminado" @click="iniciarJuego" class="btn-reiniciar">
    Jugar de Nuevo
  </button>
</template>
```

## Funciones Auxiliares

### obtenerSimbolo(palo: string): string

Convierte el nombre del palo en su símbolo visual.

```typescript
const obtenerSimbolo = (palo: string): string => {
  const simbolos: Record<string, string> = {
    'Picas': '♠️',
    'Corazones': '❤️',
    'Tréboles': '♣️',
    'Diamantes': '♦️'
  };
  return simbolos[palo] || '';
};
```

### obtenerColor(palo: string): string

Determina el color de la carta según el palo.

```typescript
const obtenerColor = (palo: string): string => {
  return palo === 'Corazones' || palo === 'Diamantes' ? 'red' : 'black';
};
```

## Representación Visual de Cartas

### Carta Completa

```vue
<div class="carta" :style="{ color: obtenerColor(carta.palo) }">
  <div class="carta-contenido">
    <!-- Esquina superior izquierda -->
    <div class="esquina-superior">
      <div>{{ carta.valor }}</div>
      <div>{{ obtenerSimbolo(carta.palo) }}</div>
    </div>
    
    <!-- Centro de la carta -->
    <div class="centro">{{ obtenerSimbolo(carta.palo) }}</div>
    
    <!-- Esquina inferior derecha (rotada) -->
    <div class="esquina-inferior">
      <div>{{ obtenerSimbolo(carta.palo) }}</div>
      <div>{{ carta.valor }}</div>
    </div>
  </div>
</div>
```

### Carta Reverso (Mazo)

```vue
<div class="carta-reverso">
  <div class="patron"></div>
  <div class="contador">{{ cartasEnMazo }}</div>
</div>
```

## Estilos y Diseño

### Variables CSS

```css
:root {
  --color-primary: #2c3e50;
  --color-success: #27ae60;
  --color-danger: #e74c3c;
  --color-card-bg: white;
  --color-card-border: #333;
}
```

### Clases Principales

- `.tablero`: Contenedor principal
- `.pilas`: Área de mazo y descarte
- `.carta`: Estilo base para cartas
- `.carta-reverso`: Estilo para cartas boca abajo
- `.mano`: Área de cartas del jugador
- `.disabled`: Estado deshabilitado

### Efectos Visuales

```css
.carta:hover:not(.disabled) {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.carta-reverso:hover:not(.disabled) {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}
```

## Flujo de Interacción

### 1. Inicio del Juego

```typescript
onMounted(iniciarJuego);
```

- Se ejecuta automáticamente al montar el componente
- Inicializa el estado del juego
- Reparte cartas iniciales

### 2. Robar Carta

```vue
<div class="mazo" @click="robarCarta">
```

- Usuario hace click en el mazo
- Se ejecuta `robarCarta()` del composable
- La interfaz se actualiza automáticamente (reactividad)

### 3. Jugar Carta

```vue
<div @click="jugarCarta(carta)">
```

- Usuario hace click en una carta de su mano
- Se ejecuta `jugarCarta(carta)` del composable
- El composable valida la jugada
- La interfaz refleja el resultado

### 4. Fin del Juego

```vue
<button v-if="juegoTerminado" @click="iniciarJuego">
```

- Cuando `juegoTerminado` es `true`
- Aparece botón para reiniciar
- Se deshabilitan las interacciones del juego

## Responsive Design

### Breakpoints

```css
@media (max-width: 768px) {
  .pilas {
    flex-direction: column;
    gap: 20px;
  }
  
  .cartas-mano {
    gap: 10px;
  }
  
  .carta {
    width: 80px;
    height: 110px;
  }
}
```

### Adaptaciones Móviles

- Cartas más pequeñas en pantallas pequeñas
- Layout vertical para mazo y descarte
- Espaciado reducido entre elementos
- Texto más pequeño pero legible

## Ejemplo de Uso

```vue
<template>
  <div id="app">
    <JuegoCartas />
  </div>
</template>

<script setup lang="ts">
import JuegoCartas from '@/components/4-1/JuegoCartas.vue';
</script>
```

## Ventajas del Diseño

### Separación Clara
- **Lógica**: En el composable `useJuego`
- **Presentación**: En el componente `JuegoCartas`
- **Estilos**: Scoped CSS para encapsulación

### Reactividad Automática
- Cambios en el estado se reflejan inmediatamente
- No necesidad de manejo manual del DOM
- Sincronización automática entre lógica y vista

### Mantenibilidad
- Código organizado y modular
- Fácil modificación de estilos
- Lógica testeable por separado