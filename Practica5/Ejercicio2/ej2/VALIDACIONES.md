# Validaciones Especiales Implementadas

## 1. Validación de Tarjeta de Crédito

### ✅ Algoritmo de Luhn
- **Ubicación**: `src/utils/creditCard.ts` - función `luhnCheck()`
- **Descripción**: Valida el número de tarjeta usando el algoritmo de Luhn
- **Implementación**: 
  - Elimina espacios del número
  - Recorre dígitos de derecha a izquierda
  - Duplica cada segundo dígito
  - Si el resultado es > 9, resta 9
  - Suma todos los dígitos
  - Válido si suma % 10 === 0

### ✅ Detección Automática de Tipo de Tarjeta
- **Ubicación**: `src/utils/creditCard.ts` - función `detectCardType()`
- **Tipos soportados**:
  - **Visa**: Comienza con 4
  - **Mastercard**: Comienza con 51-55
  - **Amex**: Comienza con 34 o 37
- **Uso**: Se muestra automáticamente al escribir el número de tarjeta

### ✅ Validación de CVV según Tipo de Tarjeta
- **Ubicación**: `src/utils/creditCard.ts` - función `validateCVV()`
- **Reglas**:
  - **Visa/Mastercard**: 3 dígitos
  - **Amex**: 4 dígitos
- **Implementación**: Detecta el tipo de tarjeta y valida la longitud del CVV

### ✅ Validación de Fecha de Expiración Futura
- **Ubicación**: `src/utils/creditCard.ts` - función `validateExpiryDate()`
- **Formato**: MM/YY
- **Validación**:
  - Mes entre 01-12
  - Fecha debe ser posterior a la actual
  - Compara año y mes con fecha actual

### ✅ Formateo Automático
- **Ubicación**: `src/utils/creditCard.ts` - función `formatCardNumber()`
- **Descripción**: Formatea el número de tarjeta con espacios cada 4 dígitos
- **Ejemplo**: 4532015112830366 → 4532 0151 1283 0366

---

## 2. Validación Asíncrona de Código Postal

### ✅ Simulación de Llamada API
- **Ubicación**: `src/services/validationService.ts` - función `validatePostalCode()`
- **Delay**: 500ms (setTimeout)
- **Base de datos simulada**:
  - 28001 → Madrid, Madrid
  - 08001 → Barcelona, Barcelona
  - 41001 → Sevilla, Sevilla
  - 46001 → Valencia, Valencia

### ✅ Spinner de Carga
- **Ubicación**: `Step1Billing.vue` y `Step2Shipping.vue`
- **Variable**: `isValidatingPostalCode`
- **Mensaje**: "Validando..." mientras se valida

### ✅ Autocompletado de Ciudad y Provincia
- **Implementación**: Al validar el CP, se autocompletan los campos `city` y `province`
- **Campos deshabilitados**: Los campos de ciudad y provincia están deshabilitados para evitar edición manual

### ✅ Caché de Resultados
- **Ubicación**: `src/services/validationService.ts`
- **Implementación**: `Map<string, PostalCodeData>`
- **Beneficio**: No repite validaciones para el mismo código postal

---

## 3. Validación de Código de Descuento

### ✅ Validación Asíncrona
- **Ubicación**: `src/services/checkoutService.ts` - función `validateDiscountCode()`
- **Delay**: 800ms (setTimeout)

### ✅ Códigos Válidos Simulados
- **BIENVENIDO10**: 10% de descuento
- **VERANO20**: 20% de descuento
- **VIP30**: 30% de descuento

### ✅ Mensajes de Éxito/Error
- **Éxito**: "¡Código válido! Descuento del X% aplicado" (verde)
- **Error**: "Código de descuento inválido" (rojo)

### ✅ Porcentaje de Descuento Aplicado
- **Ubicación**: `Step3Payment.vue`
- **Visualización**: Badge verde con checkmark mostrando el porcentaje
- **Cálculo**: Se aplica al subtotal en el resumen final

---

## 4. Validación Condicional

### ✅ Campos de Envío según Checkbox
- **Ubicación**: `src/composables/useValidationSchemas.ts` - `shippingSchema`
- **Condición**: `sameAsBilling`
- **Implementación**: Usa `yup.when()` para validación condicional
- **Campos afectados**:
  - recipientName
  - shippingAddress
  - postalCode
  - city
  - province
  - country
  - contactPhone
- **Regla**: Solo obligatorios si `sameAsBilling === false`

### ✅ Campos de Pago según Método Seleccionado
- **Ubicación**: `src/composables/useValidationSchemas.ts` - `paymentSchema`
- **Métodos**: card, paypal, transfer, bizum
- **Implementación**: Usa `yup.when('method', ...)` para cada campo
- **Campos por método**:
  - **card**: cardNumber, cardHolder, expiryDate, cvv
  - **paypal**: paypalEmail
  - **transfer**: transferReference
  - **bizum**: bizumPhone

---

## Tarjetas de Prueba (Válidas con Luhn)

- **Visa**: 4532 0151 1283 0366
- **Mastercard**: 5425 2334 3010 9903
- **Amex**: 3742 454554 00126

---

## Códigos Postales de Prueba

- **28001**: Madrid, Madrid
- **08001**: Barcelona, Barcelona
- **41001**: Sevilla, Sevilla
- **46001**: Valencia, Valencia

---

## Códigos de Descuento de Prueba

- **BIENVENIDO10**: 10% descuento
- **VERANO20**: 20% descuento
- **VIP30**: 30% descuento
