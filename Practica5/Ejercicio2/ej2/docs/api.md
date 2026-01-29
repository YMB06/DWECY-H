# API de Servicios

## Servicios de Validación

### validatePostalCode

Valida códigos postales españoles y retorna información de ubicación.

```typescript
function validatePostalCode(code: string): Promise<PostalCodeData | null>
```

#### Parámetros
- `code` (string): Código postal de 5 dígitos

#### Retorna
```typescript
interface PostalCodeData {
  city: string
  province: string
}
```

#### Ejemplo de Uso
```typescript
const result = await validatePostalCode('28001')
if (result) {
  console.log(result.city)     // "Madrid"
  console.log(result.province) // "Madrid"
}
```

#### Códigos Postales Soportados
| Código | Ciudad | Provincia | Gastos Envío | Tiempo Entrega |
|--------|--------|-----------|--------------|----------------|
| 28001 | Madrid | Madrid | 3.99€ | 1 día |
| 08001 | Barcelona | Barcelona | 3.99€ | 1 día |
| 41001 | Sevilla | Sevilla | 5.99€ | 3 días |
| 46001 | Valencia | Valencia | 5.99€ | 3 días |

#### Características
- ⏱️ **Latencia simulada**: 500ms
- 💾 **Cache automático**: Evita llamadas repetidas
- 🔄 **Autocompletado**: Rellena ciudad y provincia automáticamente

---

### validateDiscountCode

Valida códigos de descuento y retorna el porcentaje aplicable.

```typescript
function validateDiscountCode(code: string): Promise<DiscountCodeData | null>
```

#### Parámetros
- `code` (string): Código de descuento (case insensitive)

#### Retorna
```typescript
interface DiscountCodeData {
  code: string    // Código normalizado (uppercase)
  discount: number // Porcentaje de descuento
}
```

#### Ejemplo de Uso
```typescript
const result = await validateDiscountCode('bienvenido10')
if (result) {
  console.log(result.code)     // "BIENVENIDO10"
  console.log(result.discount) // 10
}
```

#### Códigos Válidos
| Código | Descuento | Descripción |
|--------|-----------|-------------|
| BIENVENIDO10 | 10% | Descuento de bienvenida |
| VERANO20 | 20% | Promoción de verano |
| VIP30 | 30% | Descuento VIP |

#### Características
- ⏱️ **Latencia simulada**: 800ms
- 🔤 **Case insensitive**: Acepta mayúsculas y minúsculas
- 💰 **Aplicación inmediata**: Actualiza el total automáticamente

---

## Utilidades de Tarjetas de Crédito

### luhnCheck

Valida números de tarjeta usando el algoritmo de Luhn.

```typescript
function luhnCheck(cardNumber: string): boolean
```

#### Parámetros
- `cardNumber` (string): Número de tarjeta (con o sin espacios)

#### Ejemplo de Uso
```typescript
luhnCheck('4532015112830366') // true - Visa válida
luhnCheck('1234567890123456') // false - Número inválido
```

#### Algoritmo
1. Eliminar espacios y caracteres no numéricos
2. Recorrer dígitos de derecha a izquierda
3. Duplicar cada segundo dígito
4. Si el resultado > 9, restar 9
5. Sumar todos los dígitos
6. Válido si suma % 10 === 0

---

### detectCardType

Detecta el tipo de tarjeta basado en el número.

```typescript
function detectCardType(cardNumber: string): string
```

#### Tipos Soportados
| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Visa | Empieza por 4 | 4532015112830366 |
| Mastercard | Empieza por 5[1-5] | 5425233430109903 |
| Amex | Empieza por 3[47] | 374245455400126 |

#### Ejemplo de Uso
```typescript
detectCardType('4532015112830366') // "Visa"
detectCardType('5425233430109903') // "Mastercard"
detectCardType('374245455400126')  // "Amex"
```

---

### formatCardNumber

Formatea números de tarjeta con espacios cada 4 dígitos.

```typescript
function formatCardNumber(value: string): string
```

#### Ejemplo de Uso
```typescript
formatCardNumber('4532015112830366') // "4532 0151 1283 0366"
formatCardNumber('4532-0151-1283-0366') // "4532 0151 1283 0366"
```

---

### validateCVV

Valida el CVV según el tipo de tarjeta.

```typescript
function validateCVV(cvv: string, cardNumber: string): boolean
```

#### Reglas de Validación
- **Visa/Mastercard**: 3 dígitos
- **Amex**: 4 dígitos

#### Ejemplo de Uso
```typescript
validateCVV('123', '4532015112830366') // true - Visa con 3 dígitos
validateCVV('1234', '374245455400126') // true - Amex con 4 dígitos
validateCVV('12', '4532015112830366')  // false - Muy corto
```

---

### validateExpiryDate

Valida fechas de expiración de tarjetas.

```typescript
function validateExpiryDate(expiryDate: string): boolean
```

#### Formato Esperado
- **Formato**: MM/YY
- **Validaciones**: 
  - Mes entre 01-12
  - Fecha futura

#### Ejemplo de Uso
```typescript
validateExpiryDate('12/25') // true si estamos antes de dic 2025
validateExpiryDate('13/25') // false - mes inválido
validateExpiryDate('12/20') // false - fecha pasada
```

---

## Utilidades de Formateo

### validateNIF

Valida NIFs y CIFs españoles.

```typescript
function validateNIF(nif: string): boolean
```

#### Formatos Soportados
- **NIF**: 8 dígitos + letra (ej: 12345678Z)
- **CIF**: Letra + 7 dígitos + letra (ej: A12345674)

#### Algoritmo NIF
1. Extraer los 8 dígitos
2. Calcular resto de división por 23
3. Verificar que la letra corresponde según tabla oficial

#### Tabla de Letras NIF
```
Resto:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22
Letra:  T  R  W  A  G  M  Y  F  P  D  X  B  N  J  Z  S  Q  V  H  L  C  K  E
```

#### Ejemplo de Uso
```typescript
validateNIF('12345678Z') // true
validateNIF('A12345674') // true (CIF)
validateNIF('12345678A') // false - letra incorrecta
```

---

## Servicios de Cálculo

### calculateShippingCost

Calcula gastos de envío según código postal.

```typescript
function calculateShippingCost(postalCode: string): number
```

#### Tarifas por Zona
```typescript
const shippingRates = {
  madrid: 3.99,      // 28xxx
  barcelona: 3.99,   // 08xxx
  canarias: 12.99,   // 35xxx, 38xxx
  default: 5.99      // Resto de España
}
```

---

### calculateDeliveryTime

Estima tiempo de entrega según ubicación.

```typescript
function calculateDeliveryTime(postalCode: string): string
```

#### Tiempos por Zona
- **Madrid/Barcelona**: 1 día laborable
- **Canarias**: 5 días laborables  
- **Resto España**: 3 días laborables

---

### applyDiscount

Aplica descuento al subtotal.

```typescript
function applyDiscount(subtotal: number, discountPercent: number): number
```

#### Ejemplo de Uso
```typescript
const subtotal = 100.00
const discount = 20 // 20%
const finalPrice = applyDiscount(subtotal, discount) // 80.00
```

---

## Manejo de Errores

### Tipos de Error

```typescript
interface ValidationError {
  field: string
  message: string
  code: string
}

interface ServiceError {
  service: string
  message: string
  statusCode: number
}
```

### Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| INVALID_FORMAT | Formato de datos incorrecto |
| NOT_FOUND | Recurso no encontrado |
| EXPIRED | Código o tarjeta expirados |
| NETWORK_ERROR | Error de conexión |
| VALIDATION_FAILED | Validación fallida |

### Manejo de Errores

```typescript
try {
  const result = await validatePostalCode('99999')
  if (!result) {
    throw new ValidationError('POSTAL_CODE_NOT_FOUND', 'Código postal no válido')
  }
} catch (error) {
  if (error instanceof ValidationError) {
    showUserError(error.message)
  } else {
    showGenericError('Error de conexión')
  }
}
```

---

## Rate Limiting y Cache

### Cache de Validaciones

```typescript
// Cache automático para códigos postales
const postalCodeCache = new Map<string, PostalCodeData>()

// TTL de 1 hora para códigos de descuento
const discountCache = new Map<string, { data: DiscountCodeData, expires: number }>()
```

### Límites de Uso

- **Validación CP**: Máximo 100 requests/minuto
- **Códigos descuento**: Máximo 10 requests/minuto por código
- **Validación tarjetas**: Sin límite (local)

---

## Testing de Servicios

### Mocks para Testing

```typescript
// Mocks para tests
vi.mock('@/services/validationService', () => ({
  validatePostalCode: vi.fn().mockResolvedValue({
    city: 'Madrid',
    province: 'Madrid'
  }),
  validateDiscountCode: vi.fn().mockResolvedValue({
    code: 'TEST10',
    discount: 10
  })
}))
```

### Datos de Prueba

Ver [Datos de Prueba](/test-data) para ejemplos completos de:
- Tarjetas válidas e inválidas
- Códigos postales de prueba
- Códigos de descuento
- NIFs/CIFs de ejemplo