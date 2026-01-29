# Guía de Usuario

## Cómo Usar el Sistema de Checkout

### Paso 1: Datos de Facturación

En el primer paso, debes completar tu información personal:

#### Campos Obligatorios
- **Nombre completo** (mínimo 3 caracteres, solo letras)
- **NIF/CIF** (formato: 12345678Z o A12345678)
- **Email** (formato válido de correo electrónico)
- **Teléfono** (formato español: 612345678)
- **Dirección** (dirección completa)
- **Código postal** (5 dígitos, validación automática)
- **Ciudad** (se autocompleta según el código postal)
- **Provincia** (se autocompleta según el código postal)
- **País** (selección desde lista desplegable)

#### Funcionalidades Especiales
- **Tooltips informativos**: Pasa el cursor sobre los iconos ℹ️ para ver ejemplos de formato
- **Validación en tiempo real**: Los errores se muestran inmediatamente
- **Autocompletado**: Ciudad y provincia se rellenan automáticamente al introducir un código postal válido

### Paso 2: Dirección de Envío

#### Opción 1: Misma Dirección
- Marca el checkbox "Misma dirección que facturación"
- No necesitas rellenar campos adicionales

#### Opción 2: Dirección Diferente
Si desmarcas el checkbox, aparecerán campos adicionales:

- **Nombre del destinatario** (obligatorio)
- **Dirección de envío** (obligatorio)
- **Código postal** (obligatorio, con validación automática)
- **Ciudad** (se autocompleta)
- **Provincia** (se autocompleta)
- **País** (selección desde lista)
- **Teléfono de contacto** (obligatorio)
- **Instrucciones de entrega** (opcional, máximo 200 caracteres)

### Paso 3: Método de Pago

Selecciona uno de los 4 métodos disponibles:

#### 💳 Tarjeta de Crédito/Débito
- **Número de tarjeta**: Se formatea automáticamente (espacios cada 4 dígitos)
- **Tipo detectado**: Visa, Mastercard o Amex se detectan automáticamente
- **Nombre del titular**: Como aparece en la tarjeta
- **Fecha de expiración**: Formato MM/YY (debe ser fecha futura)
- **CVV**: 3 dígitos (Visa/Mastercard) o 4 dígitos (Amex)

#### 🅿️ PayPal
- **Email de PayPal**: Dirección de correo asociada a tu cuenta PayPal

#### 🏦 Transferencia Bancaria
- Se muestran los datos bancarios de la empresa
- **Referencia**: Campo obligatorio para identificar tu transferencia

#### 📱 Bizum
- **Teléfono móvil**: Número asociado a tu cuenta Bizum

#### 🎟️ Código de Descuento
- Campo opcional para aplicar descuentos
- Botón "Aplicar" para validar el código
- Se muestra el porcentaje de descuento aplicado

### Paso 4: Resumen y Confirmación

#### Revisión de Datos
- **Productos**: Lista de artículos en tu carrito
- **Datos de facturación**: Resumen de tu información personal
- **Dirección de envío**: Confirmación de la dirección de entrega
- **Método de pago**: Método seleccionado (datos sensibles ocultos)

#### Cálculo de Precios
- **Subtotal**: Suma de todos los productos
- **Gastos de envío**: Calculados según la dirección
- **Descuento**: Si has aplicado algún código válido
- **Total final**: Precio definitivo a pagar

#### Términos y Condiciones
- ✅ **Términos y condiciones** (obligatorio)
- ✅ **Política de privacidad** (obligatorio)
- ☐ **Newsletter** (opcional)

## Funcionalidades Adicionales

### 💾 Guardado Automático
- El sistema guarda tu progreso automáticamente cada 30 segundos
- Puedes usar el botón "Guardar borrador" en cualquier momento
- Al volver, se te preguntará si quieres recuperar tu borrador

### 🔄 Navegación
- **Siguiente**: Solo se activa si el paso actual es válido
- **Anterior**: Siempre disponible (excepto en el primer paso)
- **Indicador de progreso**: Muestra tu posición en el proceso

### ⚠️ Manejo de Errores
- **Errores inline**: Se muestran debajo de cada campo
- **Resumen de errores**: Lista de todos los problemas al intentar avanzar
- **Scroll automático**: Te lleva al primer error encontrado

### 📱 Responsive Design
- Optimizado para dispositivos móviles y tablets
- El sidebar se reorganiza en pantallas pequeñas

## Consejos de Uso

1. **Completa todos los campos obligatorios** antes de intentar avanzar
2. **Usa los tooltips** para entender el formato requerido
3. **Aprovecha el autocompletado** introduciendo códigos postales válidos
4. **Guarda borradores** si necesitas interrumpir el proceso
5. **Revisa el resumen** cuidadosamente antes de confirmar