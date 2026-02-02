# Formulario de Reserva de Eventos

Sistema de gestión de reservas para eventos desarrollado con Vue 3, TypeScript y Vite.

## Características Principales

- ✅ **Validación en tiempo real** con expresiones regulares
- ✅ **Accesibilidad completa** (ARIA, navegación por teclado)
- ✅ **Diseño responsivo** para todos los dispositivos
- ✅ **TypeScript** para mayor seguridad de tipos
- ✅ **Testing completo** con Vitest (>80% cobertura)
- ✅ **Documentación** con VuePress

## Campos del Formulario

### Datos Personales
- **Nombre Completo**: Solo letras, espacios y tildes (3-50 caracteres)
- **NIF/NIE**: Formato español válido con validación de letra de control
- **Teléfono**: Formato español (9 dígitos, empezando por 6, 7 o 9)
- **Email**: Formato de email válido

### Detalles del Evento
- **Tipo de Evento**: Boda, Cumpleaños, Corporativo, Conferencia, Otro
- **Fecha del Evento**: Entre 7 días y 1 año desde hoy
- **Hora de Inicio**: Entre 08:00 y 23:00
- **Número de Asistentes**: Entre 10 y 500 personas (con inputs sincronizados)

## Tecnologías Utilizadas

- **Vue 3** con Composition API
- **TypeScript** para tipado estático
- **Vite** como build tool
- **Vitest** para testing
- **VuePress** para documentación
- **CSS3** con variables personalizadas

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar tests
npm run test

# Ejecutar tests con cobertura
npm run test:coverage

# Generar documentación
npm run docs:dev
```

## Estructura del Proyecto

```
src/
├── components/
│   └── ReservaForm.vue
├── types/
│   └── reserva.ts
├── utils/
│   └── validation.ts
├── tests/
│   ├── validation.test.ts
│   └── ReservaForm.test.ts
├── App.vue
├── main.ts
└── style.css
```