# Componente SalaCine.vue

## Descripción

El componente `SalaCine` es un gestor interactivo de sala de cine que permite visualizar la disposición de butacas, seleccionar asientos y confirmar reservas.

## Props

| Prop | Tipo | Requerido | Valor por defecto | Descripción |
|------|------|-----------|-------------------|-------------|
| `filas` | `Number` | ✅ Sí | - | Número de filas de la sala |
| `columnas` | `Number` | ✅ Sí | - | Número de columnas de la sala |
| `precioPorButaca` | `Number` | ❌ No | `8` | Precio en euros por butaca |

## Estados de Butaca

```typescript
export enum EstadoButaca {
  DISPONIBLE = 'disponible',    // Puede ser seleccionada
  SELECCIONADO = 'seleccionado', // Elegida por el usuario
  OCUPADO = 'ocupado',          // Ya reservada
  DAÑADO = 'dañado'             // No disponible
}
```

## Uso

```vue
<template>
  <SalaCine :filas="8" :columnas="10" :precio-por-butaca="12" />
</template>

<script setup lang="ts">
import SalaCine from '@/components/4-2/SalaCine.vue';
</script>
```

## Tipos de Datos

```typescript
export interface IButaca {
  id: string;        // Identificador único (ej: "F1-C3")
  fila: number;      // Índice de fila (0-based)
  columna: number;   // Índice de columna (0-based)
  estado: EstadoButaca; // Estado actual de la butaca
}
```

## Funcionalidades

- **Selección interactiva**: Click para seleccionar/deseleccionar butacas
- **Estados visuales**: Colores diferentes para cada estado
- **Cálculo automático**: Total a pagar en tiempo real
- **Confirmación de reserva**: Convierte seleccionadas en ocupadas
- **Validaciones**: Impide selección de butacas ocupadas/dañadas