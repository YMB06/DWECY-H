# Juego de Cartas - El Último Descarte

## Introducción

**El Último Descarte** es un juego de cartas solitario implementado con Vue.js 3 y TypeScript, donde el objetivo es quedarse sin cartas en la mano siguiendo las reglas de coincidencia de palo o valor.

## Características del Juego

- 🃏 **Baraja Completa**: 52 cartas estándar (4 palos × 13 valores)
- 🎯 **Objetivo Simple**: Descartar todas las cartas de tu mano
- 🔄 **Mecánica Intuitiva**: Coincidencia por palo o valor
- 🎨 **Interfaz Visual**: Cartas con símbolos y colores reales
- 📱 **Responsive**: Adaptable a diferentes pantallas

## Componentes del Sistema

### [Clase Pila](./pila.md)
Estructura de datos genérica para manejar pilas de cartas.

### [Clase Carta](./carta.md)
Representación de una carta individual con sus propiedades y reglas.

### [Composable useJuego](./use-juego.md)
Lógica reactiva del juego con estado y funciones principales.

### [Componente JuegoCartas](./juego-cartas.md)
Interfaz principal que integra toda la funcionalidad del juego.

### [Flujo del Juego](./flujo-juego.md)
Reglas detalladas y guía de interacción con la interfaz.

## Arquitectura del Juego

```
JuegoCartas.vue (Interfaz Principal)
├── useJuego (Lógica Reactiva)
│   ├── Pila<Carta> (Mazo)
│   ├── Pila<Carta> (Descarte)
│   └── Carta[] (Mano del Jugador)
└── Componentes Visuales
    ├── Mazo (Cartas boca abajo)
    ├── Descarte (Carta superior visible)
    └── Mano (Cartas del jugador)
```

## Tecnologías Utilizadas

- **Vue.js 3** con Composition API
- **TypeScript** para tipado fuerte
- **Estructura de Datos**: Pila genérica
- **Patrón Composable**: Separación de lógica y vista