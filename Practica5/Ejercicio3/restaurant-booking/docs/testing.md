# Guía de Testing

Documentación sobre las pruebas implementadas en VueDining.

## Configuración

### Herramientas

- **Vitest**: Framework de testing
- **Vue Test Utils**: Utilidades para testing de componentes Vue
- **Pinia**: Testing de stores

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Tests en modo watch
npm run test -- --watch

# Tests con UI
npm run test:ui

# Tests específicos
npm run test -- testA-overbooking
```

## Tests Implementados

### Test A: Lógica de Negocio - Evitar Overbooking

**Ubicación**: `src/stores/__tests__/testA-overbooking.spec.ts`

**Objetivo**: Verificar que el sistema previene reservas duplicadas.

#### Escenario Principal

```typescript
it('should prevent double booking for the same table and time slot', () => {
  const store = useRestaurantStore()

  // 1. Reservar Mesa 1 a las 14:00
  const firstReservation = store.addReservation({
    tableId: 1,
    timeSlot: '14:00',
    customerName: 'Juan Pérez',
    customerEmail: 'juan@example.com',
    peopleCount: 2
  })

  expect(firstReservation).toBe(true)
  expect(store.reservations).toHaveLength(1)

  // 2. Intentar reservar Mesa 1 a las 14:00 de nuevo
  const secondReservation = store.addReservation({
    tableId: 1,
    timeSlot: '14:00',
    customerName: 'María García',
    customerEmail: 'maria@example.com',
    peopleCount: 2
  })

  // 3. Expectativa: Debe devolver false y no aumentar el contador
  expect(secondReservation).toBe(false)
  expect(store.reservations).toHaveLength(1)
})
```

#### Casos Cubiertos

✅ Prevención de doble reserva en mismo horario
✅ Permitir reserva de misma mesa en diferente horario
✅ Verificación de disponibilidad correcta

---

### Test B: Visualización y Eventos - Table.vue

**Ubicación**: `src/components/__tests__/testB-table-events.spec.ts`

**Objetivo**: Verificar la correcta visualización y emisión de eventos del componente Table.

#### Escenario Principal

```typescript
it('should display correct CSS class and aria-label when status is occupied', () => {
  // 1. Montar el componente con status="occupied"
  const wrapper = mount(Table, {
    props: {
      table: mockTable,
      status: 'occupied'
    }
  })

  // 2. Verificar que tiene la clase CSS de "ocupado"
  const button = wrapper.find('button')
  expect(button.classes()).toContain('occupied')

  // Verificar que el aria-label es correcto
  const ariaLabel = button.attributes('aria-label')
  expect(ariaLabel).toContain('Mesa 5')
  expect(ariaLabel).toContain('4 personas')
  expect(ariaLabel).toContain('Ocupada')
})

it('should emit click event with table ID when clicked', async () => {
  const wrapper = mount(Table, {
    props: {
      table: mockTable,
      status: 'available'
    }
  })

  // 3. Disparar evento click
  await wrapper.find('button').trigger('click')

  // 4. Verificar que se emitió el evento con el ID correcto
  expect(wrapper.emitted('click')).toBeTruthy()
  expect(wrapper.emitted('click')?.[0]).toEqual([5])
})
```

#### Casos Cubiertos

✅ Clases CSS correctas según estado
✅ Aria-label descriptivo
✅ Emisión de evento click con ID correcto
✅ Prevención de click en mesas ocupadas
✅ Estados visuales (available, occupied, selected)
✅ Accesibilidad por teclado

---

### Test C: Validación de Formulario - ReservationForm.vue

**Ubicación**: `src/components/__tests__/testC-form-validation.spec.ts`

**Objetivo**: Verificar que el formulario valida correctamente la capacidad de la mesa.

#### Escenario Principal

```typescript
it('should prevent submission when people count exceeds table capacity', async () => {
  const store = useRestaurantStore()
  
  // 1. Seleccionar una mesa con capacidad para 2 personas
  store.selectTable(1)

  const wrapper = mount(ReservationForm)

  // 2. Rellenar el formulario con 5 comensales (excede capacidad)
  await wrapper.find('#name').setValue('Juan Pérez')
  await wrapper.find('#email').setValue('juan@example.com')
  await wrapper.find('#people').setValue(5)

  // 3. Simular el envío del formulario
  await wrapper.find('form').trigger('submit')

  // 4. Expectativa: El evento NO debe haberse emitido
  expect(wrapper.emitted('submit')).toBeFalsy()

  // Debe aparecer un mensaje de error en el DOM
  const errorMessage = wrapper.find('#people-error')
  expect(errorMessage.exists()).toBe(true)
  expect(errorMessage.text()).toContain('Debe ser entre 1 y 2')
})
```

#### Casos Cubiertos

✅ Validación de capacidad de mesa
✅ Validación de campos obligatorios
✅ Validación de formato de email
✅ Envío exitoso con datos válidos
✅ No renderizar sin mesa seleccionada
✅ Reset después de envío exitoso

---

## Estructura de Tests

### Patrón AAA (Arrange-Act-Assert)

Todos los tests siguen este patrón:

```typescript
it('should do something', () => {
  // Arrange: Preparar el escenario
  const store = useRestaurantStore()
  const wrapper = mount(Component)

  // Act: Ejecutar la acción
  await wrapper.find('button').trigger('click')

  // Assert: Verificar el resultado
  expect(wrapper.emitted('event')).toBeTruthy()
})
```

### Setup y Teardown

```typescript
describe('Component Tests', () => {
  beforeEach(() => {
    // Configuración antes de cada test
    setActivePinia(createPinia())
  })

  afterEach(() => {
    // Limpieza después de cada test (si es necesario)
  })
})
```

## Cobertura de Código

### Objetivo

- **Líneas**: > 80%
- **Funciones**: > 80%
- **Ramas**: > 80%

### Ver Cobertura

```bash
npm run test:coverage
```

Genera un reporte HTML en `coverage/index.html`

## Mejores Prácticas

### 1. Tests Descriptivos

```typescript
// ❌ Malo
it('works', () => {})

// ✅ Bueno
it('should prevent double booking for the same table and time slot', () => {})
```

### 2. Tests Independientes

Cada test debe poder ejecutarse de forma aislada:

```typescript
beforeEach(() => {
  // Resetear estado antes de cada test
  setActivePinia(createPinia())
})
```

### 3. Usar Datos de Prueba

```typescript
const mockTable: Table = {
  id: 5,
  label: 'Mesa 5',
  capacity: 4,
  position: { x: 100, y: 100 }
}
```

### 4. Verificar Accesibilidad

```typescript
it('should have proper ARIA attributes', () => {
  const button = wrapper.find('button')
  expect(button.attributes('aria-label')).toBeDefined()
  expect(button.attributes('aria-pressed')).toBeDefined()
})
```

## Debugging Tests

### Modo Watch

```bash
npm run test -- --watch
```

### UI Mode

```bash
npm run test:ui
```

### Console Logging

```typescript
it('should debug', () => {
  console.log('Wrapper HTML:', wrapper.html())
  console.log('Emitted events:', wrapper.emitted())
})
```

### Test Específico

```bash
# Solo un archivo
npm run test -- testA-overbooking

# Solo un test
npm run test -- -t "should prevent double booking"
```

## Integración Continua

Los tests se ejecutan automáticamente en:

- **Pre-commit**: Antes de cada commit
- **Pull Request**: Antes de merge
- **Deploy**: Antes de desplegar a producción

## Escribir Nuevos Tests

### Template Básico

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import Component from '@/components/Component.vue'

describe('Component Name', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should do something', async () => {
    // Arrange
    const wrapper = mount(Component, {
      props: { /* props */ }
    })

    // Act
    await wrapper.find('button').trigger('click')

    // Assert
    expect(wrapper.emitted('event')).toBeTruthy()
  })
})
```

### Testing de Pinia Store

```typescript
import { useRestaurantStore } from '@/stores/restaurant'

it('should test store action', () => {
  const store = useRestaurantStore()
  
  const result = store.addReservation(/* data */)
  
  expect(result).toBe(true)
  expect(store.reservations).toHaveLength(1)
})
```

### Testing de Componentes

```typescript
it('should test component', async () => {
  const wrapper = mount(Component, {
    props: { prop: 'value' }
  })

  await wrapper.find('input').setValue('test')
  await wrapper.find('form').trigger('submit')

  expect(wrapper.emitted('submit')).toBeTruthy()
  expect(wrapper.find('.error').exists()).toBe(false)
})
```