# Sistema de Checkout - Ejercicio 2

Sistema completo de checkout para tienda online con validaciones avanzadas usando **Vue 3**, **TypeScript**, **VeeValidate** y **Yup**.

## 🚀 Características Principales

### Wizard Multi-Paso (4 Pasos)
- ✅ **Paso 1: Datos de Facturación** - Información personal y dirección
- ✅ **Paso 2: Dirección de Envío** - Opción de usar misma dirección o diferente
- ✅ **Paso 3: Método de Pago** - Tarjeta, PayPal, Transferencia, Bizum
- ✅ **Paso 4: Resumen y Confirmación** - Revisión final del pedido

### Validaciones Especiales
- ✅ **Algoritmo de Luhn** para validación de tarjetas de crédito
- ✅ **Detección automática** de tipo de tarjeta (Visa, Mastercard, Amex)
- ✅ **Validación de CVV** según tipo de tarjeta (3 o 4 dígitos)
- ✅ **Validación asíncrona** de códigos postales con autocompletado
- ✅ **Validación de NIF/CIF** con algoritmo oficial español
- ✅ **Validación condicional** según opciones seleccionadas
- ✅ **Códigos de descuento** con validación asíncrona

### Navegación del Wizard
- ✅ **Barra de progreso visual** con indicadores de pasos completados
- ✅ **Validación por pasos** - No permite avanzar con errores
- ✅ **Guardado automático** en localStorage
- ✅ **Botón "Guardar borrador"** en cada paso
- ✅ **Recuperación de datos** al recargar la página

## 📋 Requisitos Previos

- **Node.js** 20.19.0 o superior
- **npm** 9.0 o superior

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd ej2

# Instalar dependencias
npm install
```

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo en http://localhost:5173

# Producción
npm run build        # Compilar para producción
npm run preview      # Previsualizar build de producción

# Calidad de Código
npm run type-check   # Verificar tipos TypeScript
npm run lint         # Ejecutar ESLint
npm run format       # Formatear código con Prettier

# Testing
npm run test:unit    # Ejecutar tests unitarios
```

## 📊 Datos de Prueba

### Paso 1: Datos de Facturación
```
Nombre: Ana María García López
NIF: 12345678Z
Email: ana.garcia@email.com
Teléfono: 612345678
Dirección: Calle Gran Vía 45, 3º B
Código Postal: 28001 (autocompleta Madrid)
```

### Paso 2: Dirección de Envío
```
Opción 1: Marcar "Misma dirección que facturación"

Opción 2: Dirección diferente
Nombre: Carlos Rodríguez Martín
Dirección: Avenida Diagonal 123, 5º A
Código Postal: 08001 (autocompleta Barcelona)
Teléfono: 698765432
```

### Paso 3: Método de Pago

**Tarjetas Válidas (Algoritmo de Luhn):**
```
Visa: 4532 0151 1283 0366 (CVV: 123)
Mastercard: 5425 2334 3010 9903 (CVV: 456)
Amex: 3742 454554 00126 (CVV: 1234)
```

**Códigos de Descuento:**
```
BIENVENIDO10 → 10% descuento
VERANO20 → 20% descuento
VIP30 → 30% descuento
```

**Códigos Postales Válidos:**
```
28001 → Madrid, Madrid
08001 → Barcelona, Barcelona
41001 → Sevilla, Sevilla
46001 → Valencia, Valencia
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── checkout/
│   │   ├── CheckoutWizard.vue      # Contenedor principal del wizard
│   │   ├── StepIndicator.vue       # Barra de progreso
│   │   ├── Step1Billing.vue        # Datos de facturación
│   │   ├── Step2Shipping.vue       # Dirección de envío
│   │   ├── Step3Payment.vue        # Método de pago
│   │   └── Step4Summary.vue        # Resumen final
│   ├── common/                     # Componentes reutilizables
│   └── payment/                    # Formularios de pago
├── composables/
│   ├── useCheckout.ts              # Estado global del checkout
│   ├── useValidationSchemas.ts     # Esquemas Yup
│   └── useWizardNavigation.ts      # Navegación del wizard
├── services/
│   ├── validationService.ts        # Validaciones asíncronas
│   └── checkoutService.ts          # Servicios del checkout
├── types/
│   ├── checkout.ts                 # Tipos de facturación/envío
│   └── payment.ts                  # Tipos de pago
├── utils/
│   ├── creditCard.ts               # Algoritmo de Luhn
│   └── formatters.ts               # Validación NIF/CIF
└── App.vue                         # Componente raíz
```

## 🎯 Validaciones Implementadas

### 1. Validación de Tarjeta de Crédito
- **Algoritmo de Luhn**: Valida números de tarjeta
- **Detección automática**: Visa, Mastercard, Amex
- **CVV dinámico**: 3 dígitos (Visa/MC) o 4 (Amex)
- **Fecha futura**: Valida expiración
- **Formateo**: Espacios cada 4 dígitos

### 2. Validación Asíncrona de Código Postal
- **Simulación API**: 500ms de delay
- **Spinner de carga**: Indicador visual
- **Autocompletado**: Ciudad y provincia
- **Caché**: No repite validaciones

### 3. Validación de Código de Descuento
- **Validación asíncrona**: 800ms de delay
- **Códigos válidos**: BIENVENIDO10, VERANO20, VIP30
- **Feedback visual**: Mensajes de éxito/error
- **Aplicación automática**: Actualiza total

### 4. Validación Condicional
- **Envío**: Campos obligatorios solo si dirección diferente
- **Pago**: Campos según método seleccionado

## 🎨 Tecnologías Utilizadas

- **Vue 3.5+** - Framework reactivo con Composition API
- **TypeScript 5.9+** - Tipado estático
- **VeeValidate 4.15+** - Validación de formularios
- **Yup 1.7+** - Esquemas de validación
- **Vite 7.3+** - Build tool ultrarrápido
- **Pinia 3.0+** - State management
- **Vitest 4.0+** - Testing framework

## 📚 Documentación Adicional

- **VALIDACIONES.md** - Documentación completa de todas las validaciones
- **docs/** - Documentación técnica con VitePress

## 🔧 Configuración IDE Recomendada

### VS Code
- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 🚦 Flujo de Uso

1. **Iniciar aplicación**: `npm run dev`
2. **Paso 1**: Completar datos de facturación
3. **Paso 2**: Elegir dirección de envío
4. **Paso 3**: Seleccionar método de pago y aplicar descuento
5. **Paso 4**: Revisar resumen y confirmar pedido
6. **Guardado**: Usar "Guardar borrador" en cualquier momento
7. **Recuperación**: Al recargar, se ofrece recuperar datos guardados

## 🎯 Características Destacadas

### Persistencia de Datos
- Auto-guardado al avanzar de paso
- Botón manual "Guardar borrador"
- Recuperación con confirmación
- Limpieza al completar pedido

### Experiencia de Usuario
- Validación en tiempo real
- Mensajes de error claros
- Indicadores de carga
- Animaciones suaves
- Diseño responsive

### Seguridad
- Validación client-side y preparado para server-side
- Datos sensibles no se guardan en localStorage
- Validaciones robustas con Yup

