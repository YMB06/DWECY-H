# Guía de Testing

Documentación completa sobre testing en el proyecto de Formulario de Reserva de Eventos.

## Configuración de Testing

### Herramientas Utilizadas

- **Vitest**: Framework de testing rápido
- **Vue Test Utils**: Utilidades para testing de componentes Vue
- **jsdom**: Entorno DOM para Node.js
- **@vitest/coverage-v8**: Cobertura de código

### Configuración

```typescript
// vitest.config.ts
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})
```

## Ejecutar Tests

### Comandos Básicos

```bash
# Ejecutar todos los tests
npm run test

# Tests con cobertura
npm run test:coverage

# Tests en modo watch
npm run test -- --watch

# Tests específicos
npm run test -- validation.test.ts

# Tests con UI
npm run test -- --ui
```

### Opciones Avanzadas

```bash
# Tests con verbose output
npm run test -- --reporter=verbose

# Tests con threshold específico
npm run test -- --coverage.threshold.lines=90

# Tests paralelos
npm run test -- --threads

# Tests con timeout personalizado
npm run test -- --testTimeout=10000
```

## Estructura de Tests

### Organización de Archivos

```
src/tests/
├── validation.test.ts           # Tests unitarios de validación
├── ReservaForm.test.ts         # Tests del componente principal
├── ReservaFormExtended.test.ts # Tests de funcionalidades extendidas
├── composables.test.ts         # Tests de composables
├── enhancedFeatures.test.ts    # Tests de características avanzadas
└── integration.test.ts         # Tests de integración
```

### Convenciones de Naming

- **Archivos**: `*.test.ts` o `*.spec.ts`
- **Describe blocks**: Nombre del componente/función
- **Test cases**: Descripción en inglés del comportamiento esperado

## Tipos de Tests

### 1. Tests Unitarios

Prueban funciones individuales de forma aislada.

```typescript
describe('validateField', () => {
  it('should validate email format correctly', () => {
    const result = validateField('email', 'test@example.com')
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should reject invalid email format', () => {
    const result = validateField('email', 'invalid-email')
    expect(result.isValid).toBe(false)
    expect(result.errors[0].message).toContain('formato')
  })
})
```

### 2. Tests de Componentes

Prueban el comportamiento de componentes Vue.

```typescript
describe('FormInput', () => {
  it('should render with correct props', () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'test',
        label: 'Test Label',
        modelValue: 'test value'
      }
    })

    expect(wrapper.find('label').text()).toBe('Test Label')
    expect(wrapper.find('input').element.value).toBe('test value')
  })

  it('should emit events correctly', async () => {
    const wrapper = mount(FormInput, {
      props: { id: 'test', label: 'Test', modelValue: '' }
    })

    await wrapper.find('input').setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('input')).toBeTruthy()
  })
})
```

### 3. Tests de Integración

Prueban flujos completos de la aplicación.

```typescript
describe('Complete Form Flow', () => {
  it('should complete entire form submission', async () => {
    const wrapper = mount(ReservaForm)

    // Llenar todos los campos
    await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
    await wrapper.find('#email').setValue('juan@example.com')
    // ... más campos

    // Verificar que el formulario es válido
    expect(wrapper.vm.isFormValid).toBe(true)

    // Enviar formulario
    await wrapper.find('form').trigger('submit')

    // Verificar resultado
    expect(wrapper.find('.success-message').exists()).toBe(true)
  })
})
```

## Patrones de Testing

### 1. Arrange-Act-Assert (AAA)

```typescript
it('should validate NIF letter correctly', () => {
  // Arrange
  const validNif = '12345678Z'
  const invalidNif = '12345678A'

  // Act
  const validResult = validateNifLetter(validNif)
  const invalidResult = validateNifLetter(invalidNif)

  // Assert
  expect(validResult).toBe(true)
  expect(invalidResult).toBe(false)
})
```

### 2. Given-When-Then

```typescript
it('should show error when email is invalid', async () => {
  // Given: Un formulario vacío
  const wrapper = mount(ReservaForm)

  // When: Se introduce un email inválido
  await wrapper.find('#email').setValue('invalid-email')
  await wrapper.find('#email').trigger('blur')

  // Then: Se muestra un error
  expect(wrapper.find('#email-error').exists()).toBe(true)
})
```

### 3. Setup-Exercise-Verify-Teardown

```typescript
describe('FormInput Component', () => {
  let wrapper: any

  beforeEach(() => {
    // Setup
    wrapper = mount(FormInput, {
      props: { id: 'test', label: 'Test', modelValue: '' }
    })
  })

  afterEach(() => {
    // Teardown
    wrapper.unmount()
  })

  it('should handle input correctly', async () => {
    // Exercise
    await wrapper.find('input').setValue('test')

    // Verify
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
```

## Mocking

### 1. Mock de localStorage

```typescript
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
vi.stubGlobal('localStorage', localStorageMock)
```

### 2. Mock de Composables

```typescript
vi.mock('@/composables/useFormState', () => ({
  useFormState: () => ({
    formData: ref(mockFormData),
    errors: ref([]),
    isFormValid: ref(true)
  })
}))
```

### 3. Mock de Funciones

```typescript
const mockValidateField = vi.fn()
vi.mock('@/utils/validation', () => ({
  validateField: mockValidateField
}))
```

## Testing de Validaciones

### Expresiones Regulares

```typescript
describe('REGEX_PATTERNS', () => {
  describe('nombreCompleto', () => {
    const { nombreCompleto } = REGEX_PATTERNS

    it.each([
      ['Juan Pérez', true],
      ['María José García', true],
      ['José', true],
      ['AB', false],
      ['Juan123', false],
      ['', false]
    ])('should validate "%s" as %s', (input, expected) => {
      expect(nombreCompleto.test(input)).toBe(expected)
    })
  })
})
```

### Validaciones de Negocio

```typescript
describe('Date Validation', () => {
  it('should reject past dates', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    const result = validateField('fechaEvento', yesterday.toISOString().split('T')[0])
    expect(result.isValid).toBe(false)
  })

  it('should accept future dates', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 10)
    
    const result = validateField('fechaEvento', futureDate.toISOString().split('T')[0])
    expect(result.isValid).toBe(true)
  })
})
```

## Testing de Componentes Vue

### Props y Eventos

```typescript
it('should handle props correctly', () => {
  const wrapper = mount(FormInput, {
    props: {
      id: 'email',
      label: 'Email',
      modelValue: 'test@example.com',
      hasError: true,
      errorMessage: 'Invalid email'
    }
  })

  expect(wrapper.find('input').classes()).toContain('error')
  expect(wrapper.find('.error-message').text()).toBe('Invalid email')
})
```

### Slots

```typescript
it('should render slot content', () => {
  const wrapper = mount(Component, {
    slots: {
      default: '<p>Slot content</p>'
    }
  })

  expect(wrapper.html()).toContain('<p>Slot content</p>')
})
```

### Eventos Personalizados

```typescript
it('should emit custom events', async () => {
  const wrapper = mount(FormCheckbox, {
    props: {
      groupId: 'test',
      options: [{ id: 'option1', label: 'Option 1' }],
      modelValue: []
    }
  })

  await wrapper.find('input[type="checkbox"]').setChecked(true)
  
  expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  expect(wrapper.emitted('change')).toBeTruthy()
})
```

## Testing de Composables

### Estado Reactivo

```typescript
describe('useFormState', () => {
  it('should manage form state correctly', () => {
    const { formData, addError, hasError } = useFormState()

    expect(hasError('test')).toBe(false)
    
    addError('test', 'Test error')
    expect(hasError('test')).toBe(true)
  })
})
```

### Efectos Secundarios

```typescript
it('should save to localStorage on form change', async () => {
  const { formData } = useFormState()
  const { saveDraft } = useLocalStorage()

  formData.value.nombreCompleto = 'Test'
  
  // Esperar a que el watcher se ejecute
  await nextTick()
  
  expect(localStorageMock.setItem).toHaveBeenCalled()
})
```

## Cobertura de Código

### Objetivos de Cobertura

- **Líneas**: 80%
- **Funciones**: 80%
- **Ramas**: 80%
- **Declaraciones**: 80%

### Generar Reporte

```bash
npm run test:coverage
```

### Ver Reporte HTML

```bash
# Después de ejecutar coverage
open coverage/index.html
```

### Excluir Archivos

```typescript
// vitest.config.ts
coverage: {
  exclude: [
    'src/tests/**',
    'src/**/*.d.ts',
    'src/main.ts'
  ]
}
```

## Debugging Tests

### VS Code

1. Instalar extensión "Vitest"
2. Usar breakpoints en archivos de test
3. Ejecutar en modo debug

### Console Debugging

```typescript
it('should debug test', () => {
  const result = someFunction()
  console.log('Debug result:', result)
  expect(result).toBe(expected)
})
```

### Test Específico

```bash
# Ejecutar solo un test
npm run test -- --grep "should validate email"

# Ejecutar solo un archivo
npm run test -- validation.test.ts
```

## Mejores Prácticas

### 1. Tests Descriptivos

```typescript
// ❌ Malo
it('should work', () => {})

// ✅ Bueno
it('should show error message when email format is invalid', () => {})
```

### 2. Tests Independientes

```typescript
// ❌ Malo - depende de orden
let sharedState = {}

// ✅ Bueno - cada test es independiente
beforeEach(() => {
  const localState = {}
})
```

### 3. Usar Helpers

```typescript
// Helper para crear wrapper con props comunes
const createFormInput = (overrides = {}) => {
  return mount(FormInput, {
    props: {
      id: 'test',
      label: 'Test',
      modelValue: '',
      ...overrides
    }
  })
}
```

### 4. Tests de Edge Cases

```typescript
describe('Edge Cases', () => {
  it('should handle empty string', () => {})
  it('should handle null values', () => {})
  it('should handle very long strings', () => {})
  it('should handle special characters', () => {})
})
```

## Continuous Integration

### GitHub Actions

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test"
    }
  }
}
```