# 🍽️ Sistema de Reservas de Restaurante

Sistema de reservas para restaurante con gestión de estado global usando Pinia, enfocado en accesibilidad y arquitectura de componentes.

## 🎯 Objetivos de Aprendizaje

- ✅ Implementar Pinia como única fuente de verdad
- ✅ Dominar comunicación Padre ↔ Hijo (Props y Emits)
- ✅ Gestionar formularios con validaciones reactivas
- ✅ Asegurar accesibilidad (A11y) completa
- ✅ Tipado estricto con TypeScript
- ✅ Testing con Vitest

## 🛠️ Stack Tecnológico

- **Core**: Vue 3 (Composition API `<script setup>`)
- **Lenguaje**: TypeScript
- **Build**: Vite
- **Estado**: Pinia
- **Tests**: Vitest
- **Estilos**: CSS Scoped

## 📁 Estructura del Proyecto

```
src/
├── types/
│   └── index.ts              # Interfaces TypeScript
├── stores/
│   ├── restaurant.ts         # Store de Pinia
│   └── __tests__/
│       └── restaurant.spec.ts
├── components/
│   ├── TimeSlotSelector.vue  # Selector de horarios
│   ├── Table.vue             # Componente mesa individual
│   ├── TableMap.vue          # Mapa de mesas
│   ├── ReservationForm.vue   # Formulario de reserva
│   └── RestaurantLayout.vue  # Layout principal
├── App.vue
└── main.ts
```

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Ejecutar tests
npm run test

# Tests con UI
npm run test:ui

# Build producción
npm run build
```

## 🎨 Características

### 1. Selector de Horarios (TimeSlotSelector)
- Botones para franjas horarias: 13:00, 14:00, 15:00, 20:00, 21:00
- Actualización reactiva del mapa de mesas al cambiar horario

### 2. Mapa de Mesas (TableMap + Table)
- Visualización de 6 mesas con diferentes capacidades
- Estados visuales:
  - 🟢 **Verde**: Mesa libre
  - 🔴 **Rojo**: Mesa ocupada
  - 🔵 **Azul**: Mesa seleccionada

### 3. Accesibilidad (A11y)
- ✅ Elementos interactivos con `<button>`
- ✅ `aria-label` descriptivos
- ✅ Navegación completa con teclado (TAB + Enter)
- ✅ `aria-invalid` en campos con errores
- ✅ `aria-pressed` en botones de estado

### 4. Formulario de Reserva
- Validaciones:
  - Nombre obligatorio
  - Email con formato válido
  - Número de comensales ≤ capacidad de la mesa
- Solo visible si hay mesa seleccionada y libre

## 🧪 Testing

El proyecto incluye tests unitarios para el store:

```bash
npm run test
```

Tests incluidos:
- ✅ Inicialización de mesas
- ✅ Verificación de disponibilidad
- ✅ Creación de reservas
- ✅ Prevención de doble reserva
- ✅ Validación de capacidad
- ✅ Cambio de franja horaria

## 📊 Arquitectura de Datos

### Store (Pinia)
```typescript
{
  tables: Table[]           // Lista de mesas
  reservations: Reservation[] // Reservas confirmadas
  activeTimeSlot: TimeSlot  // Hora seleccionada
  selectedTableId: number   // Mesa seleccionada
}
```

### Acciones
- `addReservation()`: Crea reserva con validaciones
- `setTimeSlot()`: Cambia franja horaria
- `selectTable()`: Selecciona/deselecciona mesa
- `isTableAvailable()`: Verifica disponibilidad

## 🎯 Flujo de Usuario

1. Usuario selecciona horario
2. Mapa muestra disponibilidad en tiempo real
3. Usuario hace clic en mesa libre
4. Aparece formulario de reserva
5. Usuario completa datos
6. Sistema valida y confirma reserva

## 📝 Datos de Prueba

### Mesas Disponibles
- Mesa 1: 2 personas
- Mesa 2: 4 personas
- Mesa 3: 4 personas
- Mesa 4: 6 personas
- Mesa 5: 2 personas
- Mesa 6: 8 personas

### Horarios
- 13:00, 14:00, 15:00 (Comida)
- 20:00, 21:00 (Cena)

## 🔧 Configuración TypeScript

El proyecto usa configuración estricta de TypeScript con interfaces obligatorias para todos los datos.

## 📱 Responsive

El diseño es responsive y se adapta a diferentes tamaños de pantalla.

## 🎓 Conceptos Aplicados

- **Pinia**: Estado global reactivo
- **Props & Emits**: Comunicación entre componentes
- **Computed Properties**: Valores derivados
- **Watchers**: Reactividad a cambios
- **TypeScript**: Tipado estricto
- **Vitest**: Testing unitario
- **A11y**: Accesibilidad web
