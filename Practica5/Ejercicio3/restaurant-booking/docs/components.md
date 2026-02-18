# Documentación de Componentes

Documentación técnica de los componentes principales de VueDining.

## Table.vue

Componente que representa una mesa individual en el mapa del restaurante.

### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `table` | `Table` | ✅ | Objeto con datos de la mesa |
| `status` | `TableStatus` | ✅ | Estado actual de la mesa |

#### Tipos

```typescript
interface Table {
  id: number
  label: string
  capacity: number
  position: { x: number; y: number }
}

type TableStatus = 'available' | 'occupied' | 'selected'
```

### Eventos

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `click` | `number` | Emitido cuando se hace clic en la mesa. Devuelve el ID de la mesa |

### Ejemplo de Uso

```vue
<template>
  <Table
    :table="tableData"
    :status="tableStatus"
    @click="handleTableClick"
  />
</template>

<script setup lang="ts">
import Table from '@/components/Table.vue'
import type { Table as TableType, TableStatus } from '@/types'

const tableData: TableType = {
  id: 1,
  label: 'Mesa 1',
  capacity: 4,
  position: { x: 50, y: 50 }
}

const tableStatus: TableStatus = 'available'

const handleTableClick = (tableId: number) => {
  console.log('Mesa seleccionada:', tableId)
}
</script>
```

### Estados Visuales

#### Available (Libre)
- **Color**: Verde (#28a745)
- **Cursor**: Pointer
- **Interactivo**: Sí
- **Aria-label**: "Mesa X, para Y personas, estado: Libre"

#### Occupied (Ocupada)
- **Color**: Rojo (#dc3545)
- **Cursor**: Not-allowed
- **Interactivo**: No (disabled)
- **Aria-label**: "Mesa X, para Y personas, estado: Ocupada"

#### Selected (Seleccionada)
- **Color**: Azul (#007bff)
- **Cursor**: Pointer
- **Interactivo**: Sí
- **Aria-label**: "Mesa X, para Y personas, estado: Seleccionada"

### Accesibilidad

- ✅ Elemento `<button>` para navegación por teclado
- ✅ `aria-label` descriptivo con toda la información
- ✅ Estado `disabled` para mesas ocupadas
- ✅ Navegable con TAB y activable con ENTER
- ✅ Focus visible con outline

### Estilos

```css
.table {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  border: 3px solid;
  cursor: pointer;
  transition: all 0.3s;
}

.table.available {
  background: #d4edda;
  border-color: #28a745;
}

.table.occupied {
  background: #f8d7da;
  border-color: #dc3545;
  cursor: not-allowed;
  opacity: 0.7;
}

.table.selected {
  background: #cce5ff;
  border-color: #007bff;
  transform: scale(1.1);
}
```

---

## ReservationForm.vue

Formulario para completar los datos de la reserva.

### Props

Ninguna. El componente obtiene los datos del store de Pinia.

### Eventos

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `submit` | `boolean` | Emitido al enviar el formulario. `true` si fue exitoso, `false` si hubo error |

### Ejemplo de Uso

```vue
<template>
  <ReservationForm @submit="handleSubmit" />
</template>

<script setup lang="ts">
import ReservationForm from '@/components/ReservationForm.vue'

const handleSubmit = (success: boolean) => {
  if (success) {
    console.log('Reserva creada exitosamente')
  } else {
    console.log('Error al crear reserva')
  }
}
</script>
```

### Campos del Formulario

#### Nombre Completo
- **Tipo**: Text input
- **ID**: `name`
- **Validación**: Obligatorio, mínimo 3 caracteres
- **Aria**: `aria-describedby="name-error"` cuando hay error

#### Email
- **Tipo**: Email input
- **ID**: `email`
- **Validación**: Obligatorio, formato email válido
- **Regex**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Aria**: `aria-describedby="email-error"` cuando hay error

#### Número de Comensales
- **Tipo**: Number input
- **ID**: `people`
- **Validación**: 
  - Obligatorio
  - Mínimo: 1
  - Máximo: Capacidad de la mesa seleccionada
- **Aria**: `aria-describedby="people-error"` cuando hay error

### Lógica de Validación

```typescript
const validate = (): boolean => {
  // Limpiar errores previos
  errors.name = ''
  errors.email = ''
  errors.people = ''

  // Validar nombre
  if (!formData.name.trim()) {
    errors.name = 'El nombre es obligatorio'
    return false
  }

  // Validar email
  if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Email inválido'
    return false
  }

  // Validar capacidad
  if (formData.people < 1 || formData.people > selectedTable.value.capacity) {
    errors.people = `Debe ser entre 1 y ${selectedTable.value.capacity}`
    return false
  }

  return true
}
```

### Flujo de Envío

1. Usuario completa el formulario
2. Usuario hace clic en "Confirmar Reserva"
3. Se ejecuta `handleSubmit()`
4. Se validan todos los campos
5. Si es válido:
   - Se llama a `store.addReservation()`
   - Se muestra mensaje de éxito
   - Se deselecciona la mesa
   - Se emite evento `submit` con `true`
6. Si no es válido:
   - Se muestran mensajes de error
   - Se emite evento `submit` con `false`

### Integración con Pinia

```typescript
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant'

const store = useRestaurantStore()
const { selectedTable, activeTimeSlot } = storeToRefs(store)

const handleSubmit = () => {
  if (!validate() || !selectedTable.value) return

  const success = store.addReservation({
    tableId: selectedTable.value.id,
    timeSlot: activeTimeSlot.value,
    customerName: formData.name,
    customerEmail: formData.email,
    peopleCount: formData.people
  })

  emit('submit', success)
}
```

### Accesibilidad

- ✅ Labels asociados con `for` e `id`
- ✅ Mensajes de error con `role="alert"`
- ✅ `aria-describedby` para conectar errores con inputs
- ✅ `aria-invalid="true"` en campos con error
- ✅ Navegación completa por teclado
- ✅ Focus visible en todos los campos

### Renderizado Condicional

El formulario solo se renderiza si:
- Hay una mesa seleccionada (`selectedTable !== null`)
- La mesa está disponible en el horario actual

```vue
<div v-if="selectedTable" class="reservation-form">
  <!-- Formulario -->
</div>
```

---

## TableMap.vue

Componente contenedor que renderiza el mapa completo del restaurante.

### Props

Ninguna. Obtiene datos del store de Pinia.

### Eventos

Ninguno. Maneja la comunicación internamente.

### Estructura

```vue
<template>
  <div class="table-map">
    <h2>Plano del Restaurante</h2>
    <div class="map-container">
      <Table
        v-for="table in tables"
        :key="table.id"
        :table="table"
        :status="getTableStatus(table.id)"
        @click="handleTableClick"
      />
    </div>
    <div class="legend">
      <span>🟢 Libre</span>
      <span>🔴 Ocupada</span>
      <span>🔵 Seleccionada</span>
    </div>
  </div>
</template>
```

### Lógica de Estado

```typescript
const getTableStatus = (tableId: number): TableStatus => {
  if (selectedTableId.value === tableId) return 'selected'
  if (!store.isTableAvailable(tableId, activeTimeSlot.value)) return 'occupied'
  return 'available'
}

const handleTableClick = (tableId: number) => {
  if (selectedTableId.value === tableId) {
    store.selectTable(null) // Deseleccionar
  } else {
    store.selectTable(tableId) // Seleccionar
  }
}
```

---

## TimeSlotSelector.vue

Selector de franjas horarias.

### Props

Ninguna.

### Eventos

Ninguno. Actualiza el store directamente.

### Horarios Disponibles

```typescript
const timeSlots: TimeSlot[] = ['13:00', '14:00', '15:00', '20:00', '21:00']
```

### Ejemplo

```vue
<template>
  <div class="time-slot-selector">
    <h2>Selecciona un horario</h2>
    <div class="slots">
      <button
        v-for="slot in timeSlots"
        :key="slot"
        :class="{ active: activeTimeSlot === slot }"
        @click="selectSlot(slot)"
        :aria-pressed="activeTimeSlot === slot"
      >
        {{ slot }}
      </button>
    </div>
  </div>
</template>
```

### Accesibilidad

- ✅ `aria-pressed` indica el estado activo
- ✅ `aria-label` descriptivo
- ✅ Navegable por teclado