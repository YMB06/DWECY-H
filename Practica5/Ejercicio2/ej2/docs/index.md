# Sistema de Checkout

## Descripción del Sistema

El Sistema de Checkout es una aplicación web moderna desarrollada con **Vue 3**, **TypeScript** y **VeeValidate** que proporciona un proceso de compra completo y seguro en 4 pasos.

## Características Principales

### 🛡️ Validaciones Robustas
- **Validación NIF/CIF** con algoritmo oficial español
- **Algoritmo de Luhn** para validación de tarjetas de crédito
- **Validaciones asíncronas** para códigos postales y descuentos
- **Validación condicional** según método de pago seleccionado

### 🎨 Experiencia de Usuario Mejorada
- **Wizard de 4 pasos** con indicador de progreso visual
- **Autocompletado** de ciudad y provincia por código postal
- **Formateo automático** de números de tarjeta
- **Detección automática** del tipo de tarjeta
- **Tooltips explicativos** en campos complejos

### 💾 Persistencia Inteligente
- **Auto-guardado** cada 30 segundos
- **Recuperación de borradores** con confirmación
- **Limpieza automática** al completar pedido
- **Validación antes de navegación**

### 🧮 Cálculos Dinámicos
- **Gastos de envío** según ubicación
- **Aplicación de descuentos** en tiempo real
- **Tiempo estimado de entrega**
- **Resumen dinámico** en sidebar

## Tecnologías Utilizadas

- **Vue 3** - Framework principal
- **TypeScript** - Tipado estático
- **VeeValidate** - Validación de formularios
- **Yup** - Esquemas de validación
- **Vite** - Build tool
- **Vitest** - Testing framework
- **Playwright** - Tests E2E

## Arquitectura

El sistema sigue una arquitectura modular con separación clara de responsabilidades:

```
src/
├── components/          # Componentes Vue
│   ├── checkout/       # Pasos del wizard
│   ├── common/         # Componentes reutilizables
│   └── payment/        # Formularios de pago
├── composables/        # Lógica reutilizable
├── services/           # Servicios de API
├── types/              # Definiciones TypeScript
├── utils/              # Utilidades
└── stores/             # Estado global
```

## Flujo del Proceso

1. **Datos de Facturación** - Información personal y dirección
2. **Dirección de Envío** - Opción de usar misma dirección o diferente
3. **Método de Pago** - Tarjeta, PayPal, Transferencia o Bizum
4. **Resumen y Confirmación** - Revisión final y términos

## Próximos Pasos

- [Guía de Usuario](/user-guide) - Aprende a usar el sistema
- [Arquitectura Técnica](/architecture) - Detalles de implementación
- [API de Servicios](/api) - Documentación de servicios
- [Datos de Prueba](/test-data) - Información para testing