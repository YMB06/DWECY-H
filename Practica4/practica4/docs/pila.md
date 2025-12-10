# Clase Pila

## Descripción

La clase `Pila<T>` es una estructura de datos genérica que implementa el comportamiento LIFO (Last In, First Out) para manejar colecciones de elementos de cualquier tipo.

## Definición

```typescript
export class Pila<T> {
  private elementos: T[] = [];
  
  push(elemento: T): void
  pop(): T | undefined
  peek(): T | undefined
  size(): number
  isEmpty(): boolean
  getElementos(): T[]
}
```

## Métodos

### push(elemento: T): void

Añade un elemento al tope de la pila.

**Parámetros:**
- `elemento: T` - El elemento a añadir

**Ejemplo:**
```typescript
const pila = new Pila<Carta>();
const carta = new Carta('Corazones', 'A');
pila.push(carta);
```

### pop(): T | undefined

Extrae y retorna el elemento del tope de la pila.

**Retorna:**
- `T` - El elemento extraído
- `undefined` - Si la pila está vacía

**Ejemplo:**
```typescript
const carta = pila.pop();
if (carta) {
  console.log(`Carta extraída: ${carta.nombre}`);
}
```

### peek(): T | undefined

Retorna el elemento del tope sin extraerlo.

**Retorna:**
- `T` - El elemento del tope
- `undefined` - Si la pila está vacía

**Ejemplo:**
```typescript
const cartaSuperior = pila.peek();
if (cartaSuperior) {
  console.log(`Carta superior: ${cartaSuperior.nombre}`);
}
```

### size(): number

Retorna el número de elementos en la pila.

**Retorna:**
- `number` - Cantidad de elementos

**Ejemplo:**
```typescript
console.log(`La pila tiene ${pila.size()} elementos`);
```

### isEmpty(): boolean

Verifica si la pila está vacía.

**Retorna:**
- `boolean` - `true` si está vacía, `false` en caso contrario

**Ejemplo:**
```typescript
if (pila.isEmpty()) {
  console.log('La pila está vacía');
}
```

### getElementos(): T[]

Retorna una copia de todos los elementos de la pila.

**Retorna:**
- `T[]` - Array con copia de los elementos

**Ejemplo:**
```typescript
const todasLasCartas = pila.getElementos();
console.log(`Total de cartas: ${todasLasCartas.length}`);
```

## Uso en el Juego

### Mazo de Cartas

```typescript
const mazo = new Pila<Carta>();

// Llenar el mazo
const baraja = crearBaraja();
for (const carta of baraja) {
  mazo.push(carta);
}

// Robar carta del mazo
const cartaRobada = mazo.pop();
```

### Pila de Descarte

```typescript
const descarte = new Pila<Carta>();

// Colocar carta inicial
const cartaInicial = mazo.pop();
if (cartaInicial) {
  descarte.push(cartaInicial);
}

// Ver carta superior del descarte
const cartaSuperior = descarte.peek();
```

## Características de la Implementación

### Genérica
- Funciona con cualquier tipo de dato: `Pila<Carta>`, `Pila<number>`, `Pila<string>`
- Type safety garantizado por TypeScript

### Encapsulación
- Array interno privado (`private elementos`)
- Acceso controlado solo a través de métodos públicos

### Inmutabilidad Parcial
- `getElementos()` retorna una copia para evitar modificaciones externas
- Los métodos principales mantienen la integridad de la estructura

### Eficiencia
- Operaciones O(1) para `push`, `pop`, `peek`, `size`, `isEmpty`
- Operación O(n) solo para `getElementos()` (copia del array)

## Ejemplo Completo

```typescript
// Crear pila de cartas
const pila = new Pila<Carta>();

// Añadir cartas
pila.push(new Carta('Picas', 'A'));
pila.push(new Carta('Corazones', 'K'));
pila.push(new Carta('Tréboles', '7'));

console.log(`Tamaño: ${pila.size()}`); // 3
console.log(`Vacía: ${pila.isEmpty()}`); // false

// Ver carta superior
const superior = pila.peek();
console.log(`Superior: ${superior?.nombre}`); // "7 de Tréboles"

// Extraer carta
const extraida = pila.pop();
console.log(`Extraída: ${extraida?.nombre}`); // "7 de Tréboles"
console.log(`Nuevo tamaño: ${pila.size()}`); // 2

// Obtener todas las cartas
const todas = pila.getElementos();
console.log(`Cartas restantes: ${todas.length}`); // 2
```