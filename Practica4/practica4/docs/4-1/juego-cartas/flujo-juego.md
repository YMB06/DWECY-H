# Flujo del Juego - El Último Descarte

## Reglas del Juego

### Objetivo
**Quedarse sin cartas en la mano** descartando todas las cartas siguiendo las reglas de coincidencia.

### Configuración Inicial
- **Baraja**: 52 cartas estándar (4 palos × 13 valores)
- **Mano inicial**: 7 cartas repartidas al jugador
- **Mazo**: Cartas restantes boca abajo
- **Descarte**: 1 carta inicial boca arriba

### Regla Principal
Una carta puede jugarse sobre la carta superior del descarte si:
- **Mismo palo** (ej: Corazones sobre Corazones)
- **Mismo valor** (ej: 7 sobre 7, independiente del palo)

## Mecánica del Juego

### 1. Inicio de Partida

```
Estado Inicial:
├── Mazo: 44 cartas (52 - 7 - 1)
├── Descarte: 1 carta visible
└── Mano: 7 cartas
```

**Proceso:**
1. Se crea y baraja una baraja completa
2. Se reparten 7 cartas al jugador
3. Se coloca 1 carta en el descarte
4. El resto forma el mazo

### 2. Turno del Jugador

En cada turno, el jugador puede:

#### Opción A: Jugar una Carta
- Seleccionar una carta de su mano
- Verificar si puede jugarse sobre la carta del descarte
- Si es válida: la carta se mueve al descarte
- Si no es válida: se muestra mensaje de error

#### Opción B: Robar una Carta
- Tomar una carta del mazo
- La carta se añade a la mano
- El turno continúa (puede jugar o robar otra vez)

### 3. Condiciones Especiales

#### Mazo Vacío
Cuando el mazo se queda sin cartas:
1. Se toman todas las cartas del descarte excepto la superior
2. Se barajan estas cartas
3. Se forma un nuevo mazo
4. La carta superior permanece en el descarte

#### Victoria
El jugador gana cuando:
- Su mano queda vacía (0 cartas)
- Se muestra mensaje de victoria
- Aparece opción para jugar de nuevo

## Guía de Interacción

### Interfaz Principal

```
┌─────────────────────────────────────┐
│        Juego de Cartas              │
│                                     │
│  [Mazo]     [Descarte]             │
│   (44)      7♥                     │
│                                     │
│  Tu Mano (5 cartas):               │
│  [A♠] [7♣] [K♥] [3♦] [J♠]         │
│                                     │
│  Mensaje: "Jugaste: 7 de Tréboles" │
└─────────────────────────────────────┘
```

### Elementos Interactivos

#### 1. Mazo
- **Apariencia**: Carta boca abajo con contador
- **Acción**: Click para robar carta
- **Estado**: Se deshabilita cuando el juego termina
- **Feedback**: Muestra número de cartas restantes

#### 2. Descarte
- **Apariencia**: Carta boca arriba con símbolos reales
- **Función**: Muestra la carta sobre la que se puede jugar
- **Visual**: Colores rojos/negros según el palo

#### 3. Cartas de la Mano
- **Apariencia**: Cartas boca arriba en fila
- **Acción**: Click para intentar jugar
- **Feedback**: Hover effect para indicar interactividad
- **Estado**: Se deshabilitan cuando el juego termina

#### 4. Mensajes
- **Ubicación**: Parte superior de la interfaz
- **Tipos**:
  - Informativos: "Robaste: A de Picas"
  - Error: "Movimiento no válido"
  - Victoria: "¡Ganaste! Te quedaste sin cartas"

## Ejemplos de Jugadas

### Ejemplo 1: Coincidencia por Palo

```
Carta en descarte: 7♥ (7 de Corazones)
Cartas jugables de la mano:
✅ A♥ (As de Corazones) - Mismo palo
✅ K♥ (Rey de Corazones) - Mismo palo
✅ 2♥ (2 de Corazones) - Mismo palo
❌ 7♠ (7 de Picas) - Diferente palo, mismo valor
❌ A♠ (As de Picas) - Diferente palo y valor
```

### Ejemplo 2: Coincidencia por Valor

```
Carta en descarte: J♠ (Jota de Picas)
Cartas jugables de la mano:
✅ J♥ (Jota de Corazones) - Mismo valor
✅ J♦ (Jota de Diamantes) - Mismo valor
✅ J♣ (Jota de Tréboles) - Mismo valor
✅ K♠ (Rey de Picas) - Mismo palo
❌ Q♥ (Reina de Corazones) - Diferente palo y valor
```

### Ejemplo 3: Secuencia de Jugadas

```
Estado inicial:
- Descarte: 5♦
- Mano: [A♠, 5♣, K♥, 8♦, Q♠]

Jugada 1: Jugar 5♣ (mismo valor)
- Descarte: 5♣
- Mano: [A♠, K♥, 8♦, Q♠]

Jugada 2: Jugar Q♠ (mismo palo que A♠? No, pero...)
- No se puede jugar Q♠ sobre 5♣
- Mensaje: "Movimiento no válido"

Jugada 2 (correcta): Jugar K♥ (no válido) o robar carta
- Robar carta del mazo
- Nueva carta: 3♣
- Mano: [A♠, K♥, 8♦, Q♠, 3♣]

Jugada 3: Jugar 3♣ (mismo palo que 5♣)
- Descarte: 3♣
- Mano: [A♠, K♥, 8♦, Q♠]
```

## Estrategias de Juego

### Básicas
1. **Priorizar cartas únicas**: Jugar cartas que solo coinciden por valor
2. **Conservar comodines**: Mantener cartas que coinciden por palo común
3. **Observar patrones**: Recordar qué cartas han salido

### Avanzadas
1. **Gestión de palos**: Mantener variedad de palos en la mano
2. **Secuencias**: Planificar jugadas consecutivas
3. **Timing**: Saber cuándo robar vs. cuándo jugar

## Estados del Juego

### 1. Jugando
- **Mazo**: Disponible para robar
- **Cartas**: Interactivas
- **Mensajes**: Informativos sobre acciones

### 2. Juego Terminado (Victoria)
- **Mano**: Vacía (0 cartas)
- **Mensaje**: "¡Ganaste! Te quedaste sin cartas."
- **Botón**: "Jugar de Nuevo" visible
- **Interacciones**: Deshabilitadas

### 3. Mazo Reconstituido
- **Trigger**: Mazo vacío al intentar robar
- **Proceso**: Automático e invisible al usuario
- **Mensaje**: "Mazo reconstituido desde el descarte."

## Feedback Visual

### Colores de Cartas
- **Rojas**: Corazones (❤️) y Diamantes (♦️)
- **Negras**: Picas (♠️) y Tréboles (♣️)

### Efectos de Hover
- **Cartas jugables**: Elevación y sombra
- **Mazo**: Ligera elevación
- **Deshabilitadas**: Sin efectos

### Animaciones
- **Transiciones**: Suaves al cambiar estados
- **Hover effects**: Feedback inmediato
- **Responsive**: Adaptación a diferentes pantallas

## Casos Especiales

### Mazo Vacío y Descarte con 1 Carta
Si el mazo está vacío y el descarte solo tiene 1 carta:
- No se puede reconstituir el mazo
- El jugador solo puede jugar cartas de su mano
- Si no puede jugar ninguna, el juego se bloquea (caso raro)

### Todas las Cartas Jugables
Si todas las cartas de la mano pueden jugarse:
- El jugador puede elegir cualquiera
- Estrategia: elegir la que deje más opciones futuras

### Sin Cartas Jugables
Si ninguna carta de la mano puede jugarse:
- El jugador debe robar del mazo
- Continuar hasta encontrar una carta jugable o ganar

## Mensajes del Sistema

### Informativos
- `"Robaste: {carta}"`
- `"Jugaste: {carta}"`
- `"Mazo reconstituido desde el descarte."`

### Error
- `"Movimiento no válido. La carta no coincide en palo ni valor."`

### Victoria
- `"¡Ganaste! Te quedaste sin cartas."`

## Accesibilidad

### Teclado
- Tab para navegar entre elementos
- Enter/Space para activar botones
- Escape para cerrar modales (si los hay)

### Visual
- Colores contrastantes para cartas
- Símbolos claros para palos
- Texto legible en todos los tamaños

### Responsive
- Adaptación a pantallas pequeñas
- Cartas redimensionables
- Layout flexible