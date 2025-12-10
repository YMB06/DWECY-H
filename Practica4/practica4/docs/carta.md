# Clase Carta

## Descripción

La clase `Carta` representa una carta individual de la baraja francesa estándar, con propiedades para el palo y valor, además de la lógica para determinar si puede jugarse sobre otra carta.

## Definición

```typescript
export class Carta {
  constructor(public palo: Palo, public valor: Valor) {}
  
  get nombre(): string
  esJugableSobre(otraCarta: Carta): boolean
}
```

## Tipos Relacionados

```typescript
export type Palo = 'Picas' | 'Corazones' | 'Tréboles' | 'Diamantes';
export type Valor = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
```

## Propiedades

### palo: Palo

El palo de la carta (Picas, Corazones, Tréboles, Diamantes).

**Valores posibles:**
- `'Picas'` - ♠️ (Negro)
- `'Corazones'` - ❤️ (Rojo)  
- `'Tréboles'` - ♣️ (Negro)
- `'Diamantes'` - ♦️ (Rojo)

### valor: Valor

El valor de la carta (2-10, J, Q, K, A).

**Valores posibles:**
- Números: `'2'`, `'3'`, `'4'`, `'5'`, `'6'`, `'7'`, `'8'`, `'9'`, `'10'`
- Figuras: `'J'` (Jota), `'Q'` (Reina), `'K'` (Rey), `'A'` (As)

## Métodos

### get nombre(): string

Retorna una representación textual de la carta.

**Retorna:**
- `string` - Formato: "{valor} de {palo}"

**Ejemplo:**
```typescript
const carta = new Carta('Corazones', 'A');
console.log(carta.nombre); // "A de Corazones"

const carta2 = new Carta('Picas', '10');
console.log(carta2.nombre); // "10 de Picas"
```

### esJugableSobre(otraCarta: Carta): boolean

**Regla Principal del Juego**: Determina si esta carta puede jugarse sobre otra carta.

**Parámetros:**
- `otraCarta: Carta` - La carta sobre la que se quiere jugar

**Retorna:**
- `boolean` - `true` si se puede jugar, `false` en caso contrario

**Regla de Coincidencia:**
Una carta puede jugarse sobre otra si:
- **Mismo palo** OR **Mismo valor**

**Ejemplos:**

```typescript
const cartaBase = new Carta('Corazones', '7');

// ✅ Mismo palo, diferente valor
const carta1 = new Carta('Corazones', 'K');
console.log(carta1.esJugableSobre(cartaBase)); // true

// ✅ Diferente palo, mismo valor  
const carta2 = new Carta('Picas', '7');
console.log(carta2.esJugableSobre(cartaBase)); // true

// ❌ Diferente palo y valor
const carta3 = new Carta('Tréboles', 'A');
console.log(carta3.esJugableSobre(cartaBase)); // false

// ✅ Misma carta
const carta4 = new Carta('Corazones', '7');
console.log(carta4.esJugableSobre(cartaBase)); // true
```

## Casos de Uso en el Juego

### Validación de Jugada

```typescript
const cartaDescarte = new Carta('Diamantes', 'Q');
const cartaMano = new Carta('Diamantes', '3');

if (cartaMano.esJugableSobre(cartaDescarte)) {
  // Jugada válida - mismo palo
  console.log('¡Puedes jugar esta carta!');
} else {
  console.log('No puedes jugar esta carta');
}
```

### Filtrar Cartas Jugables

```typescript
const cartaSuperior = descarte.peek();
const manoJugador: Carta[] = [
  new Carta('Picas', 'A'),
  new Carta('Corazones', '7'), 
  new Carta('Diamantes', 'K')
];

const cartasJugables = manoJugador.filter(carta => 
  cartaSuperior && carta.esJugableSobre(cartaSuperior)
);

console.log(`Puedes jugar ${cartasJugables.length} cartas`);
```

### Creación de Baraja Completa

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

  return baraja; // 52 cartas
}
```

## Ejemplos de Reglas

### Coincidencia por Palo

```typescript
const base = new Carta('Corazones', '5');

// Todas estas cartas pueden jugarse (mismo palo)
const jugables = [
  new Carta('Corazones', '2'),  // ✅
  new Carta('Corazones', 'J'),  // ✅  
  new Carta('Corazones', 'A'),  // ✅
  new Carta('Corazones', '10')  // ✅
];

jugables.forEach(carta => {
  console.log(`${carta.nombre}: ${carta.esJugableSobre(base)}`);
});
```

### Coincidencia por Valor

```typescript
const base = new Carta('Tréboles', 'K');

// Todas estas cartas pueden jugarse (mismo valor)
const jugables = [
  new Carta('Picas', 'K'),      // ✅
  new Carta('Corazones', 'K'),  // ✅
  new Carta('Diamantes', 'K')   // ✅
];

jugables.forEach(carta => {
  console.log(`${carta.nombre}: ${carta.esJugableSobre(base)}`);
});
```

### Cartas No Jugables

```typescript
const base = new Carta('Picas', '8');

// Estas cartas NO pueden jugarse
const noJugables = [
  new Carta('Corazones', '3'),  // ❌ Diferente palo y valor
  new Carta('Diamantes', 'J'),  // ❌ Diferente palo y valor
  new Carta('Tréboles', 'A')    // ❌ Diferente palo y valor
];

noJugables.forEach(carta => {
  console.log(`${carta.nombre}: ${carta.esJugableSobre(base)}`);
});
```

## Consideraciones de Diseño

### Inmutabilidad
- Las propiedades `palo` y `valor` son públicas pero se establecen en el constructor
- No hay métodos para modificar una carta después de crearla

### Simplicidad
- La regla `esJugableSobre` es simple: mismo palo OR mismo valor
- No hay reglas especiales para figuras o ases

### Extensibilidad
- La estructura permite fácilmente añadir nuevas reglas
- Los tipos `Palo` y `Valor` pueden extenderse para otros juegos