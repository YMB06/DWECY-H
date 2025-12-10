# Composable useJuego

## Descripción

El composable `useJuego` encapsula toda la lógica reactiva del juego "El Último Descarte", proporcionando estado reactivo y funciones para manejar la mecánica del juego.

## Definición

```typescript
export function useJuego() {
  // Estado reactivo interno
  const mazo = ref(new Pila<Carta>());
  const descarte = ref(new Pila<Carta>());
  const manoJugador = ref<Carta[]>([]);
  const mensaje = ref<string>('');
  const juegoTerminado = ref(false);

  // API pública
  return {
    iniciarJuego,
    robarCarta,
    jugarCarta,
    manoJugador: computed(() => manoJugador.value),
    cartaSuperiorDescarte: computed(() => descarte.value.peek()),
    cartasEnMazo: computed(() => mazo.value.size()),
    mensaje: readonly(mensaje),
    juegoTerminado: readonly(juegoTerminado)
  };
}
```

## Estado Reactivo Expuesto

### manoJugador: ComputedRef<Carta[]>

Array reactivo con las cartas en la mano del jugador.

**Tipo:** `ComputedRef<Carta[]>`

**Uso:**
```typescript
const { manoJugador } = useJuego();

// En el template
<div v-for="carta in manoJugador" :key="carta.nombre">
  {{ carta.nombre }}
</div>

// En script
console.log(`Cartas en mano: ${manoJugador.value.length}`);
```

### cartaSuperiorDescarte: ComputedRef<Carta | undefined>

Carta superior de la pila de descarte (sobre la que se puede jugar).

**Tipo:** `ComputedRef<Carta | undefined>`

**Uso:**
```typescript
const { cartaSuperiorDescarte } = useJuego();

// En el template
<div v-if="cartaSuperiorDescarte">
  Carta superior: {{ cartaSuperiorDescarte.nombre }}
</div>

// En script
if (cartaSuperiorDescarte.value) {
  console.log(`Puedes jugar sobre: ${cartaSuperiorDescarte.value.nombre}`);
}
```

### cartasEnMazo: ComputedRef<number>

Número de cartas restantes en el mazo.

**Tipo:** `ComputedRef<number>`

**Uso:**
```typescript
const { cartasEnMazo } = useJuego();

// En el template
<div>Cartas en mazo: {{ cartasEnMazo }}</div>

// En script
if (cartasEnMazo.value === 0) {
  console.log('El mazo está vacío');
}
```

### mensaje: Readonly<Ref<string>>

Mensaje informativo sobre la última acción realizada.

**Tipo:** `Readonly<Ref<string>>`

**Valores típicos:**
- `"Robaste: 7 de Corazones"`
- `"Jugaste: A de Picas"`
- `"¡Ganaste! Te quedaste sin cartas."`
- `"Movimiento no válido. La carta no coincide en palo ni valor."`

**Uso:**
```typescript
const { mensaje } = useJuego();

// En el template
<div v-if="mensaje" class="mensaje">
  {{ mensaje }}
</div>
```

### juegoTerminado: Readonly<Ref<boolean>>

Indica si el juego ha terminado (el jugador ganó).

**Tipo:** `Readonly<Ref<boolean>>`

**Uso:**
```typescript
const { juegoTerminado } = useJuego();

// En el template
<button v-if="juegoTerminado" @click="iniciarJuego">
  Jugar de Nuevo
</button>

// Deshabilitar acciones
<div :class="{ disabled: juegoTerminado }">
  <!-- Controles del juego -->
</div>
```

## Funciones Disponibles

### iniciarJuego(): void

Inicia un nuevo juego, reiniciando todo el estado.

**Proceso:**
1. Crea una baraja completa (52 cartas)
2. Baraja las cartas aleatoriamente
3. Reparte 7 cartas al jugador
4. Coloca una carta inicial en el descarte
5. El resto va al mazo

**Uso:**
```typescript
const { iniciarJuego } = useJuego();

// Iniciar nuevo juego
iniciarJuego();

// En el template
<button @click="iniciarJuego">Nuevo Juego</button>
```

### robarCarta(): void

Roba una carta del mazo y la añade a la mano del jugador.

**Comportamiento:**
- Si el mazo está vacío, reconstituye el mazo desde el descarte
- Añade la carta robada a la mano del jugador
- Actualiza el mensaje informativo
- No hace nada si el juego ha terminado

**Uso:**
```typescript
const { robarCarta } = useJuego();

// Robar carta
robarCarta();

// En el template
<div @click="robarCarta" class="mazo">
  Click para robar
</div>
```

### jugarCarta(carta: Carta): void

Intenta jugar una carta de la mano sobre la pila de descarte.

**Parámetros:**
- `carta: Carta` - La carta que se quiere jugar

**Comportamiento:**
- Verifica si la carta puede jugarse (usando `carta.esJugableSobre()`)
- Si es válida:
  - Remueve la carta de la mano
  - La coloca en el descarte
  - Verifica si el jugador ganó (mano vacía)
- Si no es válida:
  - Muestra mensaje de error
- No hace nada si el juego ha terminado

**Uso:**
```typescript
const { jugarCarta } = useJuego();

// Jugar una carta específica
const carta = new Carta('Corazones', 'A');
jugarCarta(carta);

// En el template
<div 
  v-for="carta in manoJugador" 
  @click="jugarCarta(carta)"
  class="carta"
>
  {{ carta.nombre }}
</div>
```

## Funciones Internas

### crearBaraja(): Carta[]

Crea una baraja completa de 52 cartas.

```typescript
function crearBaraja(): Carta[] {
  const palos: Palo[] = ['Picas', 'Corazones', 'Tréboles', 'Diamantes'];
  const valores: Valor[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const baraja: Carta[] = [];

  for (const palo of palos) {
    for (const valor of valores) {
      baraja.push(new Carta(palo, valor));
    }
  }

  return baraja;
}
```

### barajar(cartas: Carta[]): Carta[]

Baraja un array de cartas usando el algoritmo Fisher-Yates.

```typescript
function barajar(cartas: Carta[]): Carta[] {
  const barajadas = [...cartas];
  for (let i = barajadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [barajadas[i], barajadas[j]] = [barajadas[j], barajadas[i]];
  }
  return barajadas;
}
```

### reconstituirMazo(): void

Reconstituye el mazo cuando se queda vacío.

**Proceso:**
1. Guarda la carta superior del descarte
2. Toma todas las demás cartas del descarte
3. Las baraja
4. Las coloca en el mazo
5. Deja solo la carta superior en el descarte

## Ejemplo de Uso Completo

```typescript
// En un componente Vue
<script setup lang="ts">
import { useJuego } from '@/composables/4-1/useJuego';

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

// Iniciar juego al montar el componente
onMounted(iniciarJuego);

// Función para manejar click en carta
function handleCartaClick(carta: Carta) {
  if (!juegoTerminado.value) {
    jugarCarta(carta);
  }
}

// Función para robar carta
function handleRobarCarta() {
  if (!juegoTerminado.value) {
    robarCarta();
  }
}
</script>

<template>
  <div class="juego">
    <!-- Información del juego -->
    <div class="info">
      <p>Cartas en mazo: {{ cartasEnMazo }}</p>
      <p>Cartas en mano: {{ manoJugador.length }}</p>
      <p v-if="mensaje">{{ mensaje }}</p>
    </div>

    <!-- Mazo y descarte -->
    <div class="tablero">
      <div @click="handleRobarCarta" class="mazo">
        Mazo ({{ cartasEnMazo }})
      </div>
      
      <div class="descarte">
        <div v-if="cartaSuperiorDescarte">
          {{ cartaSuperiorDescarte.nombre }}
        </div>
      </div>
    </div>

    <!-- Mano del jugador -->
    <div class="mano">
      <div 
        v-for="carta in manoJugador"
        :key="carta.nombre"
        @click="handleCartaClick(carta)"
        class="carta"
      >
        {{ carta.nombre }}
      </div>
    </div>

    <!-- Botón reiniciar -->
    <button v-if="juegoTerminado" @click="iniciarJuego">
      Jugar de Nuevo
    </button>
  </div>
</template>
```

## Ventajas del Composable

### Separación de Responsabilidades
- **Lógica**: Encapsulada en el composable
- **Vista**: Solo se encarga de la presentación
- **Reactividad**: Automática gracias a Vue 3

### Reutilización
- Puede usarse en múltiples componentes
- Fácil testing de la lógica por separado
- Composición flexible

### Mantenibilidad
- Código organizado y modular
- Estado centralizado
- Funciones bien definidas