# Documentación del Sistema de Gestión de Horarios

## Resumen del Proyecto

Este proyecto implementa un sistema completo de gestión de horarios de aulas utilizando Vue.js 3, TypeScript y el patrón de diseño Singleton. Incluye:

- ✅ **Componente GestorHorarios.vue**: Interfaz principal para gestión de horarios
- ✅ **Componente HorarioModal.vue**: Modal para CRUD de reservas
- ✅ **Estructura de datos tipada**: Interfaces y tipos TypeScript
- ✅ **Lógica de negocio**: Clase HorarioManager con operaciones CRUD
- ✅ **Patrón Singleton**: ConfiguracionGlobal para ajustes del sistema
- ✅ **Tests completos**: Suite de pruebas con Vitest
- ✅ **Documentación VuePress**: Documentación completa y ejemplos

## Estructura del Proyecto

```
src/
├── components/4-3/
│   ├── GestorHorarios.vue      # Componente principal
│   └── HorarioModal.vue        # Modal para CRUD
├── types/4-3/
│   └── schedule.ts             # Interfaces y tipos
├── core/4-3/
│   ├── HorarioManager.ts       # Lógica de negocio
│   ├── ConfiguracionGlobal.ts  # Patrón Singleton
│   └── index.ts                # Exportaciones
├── composables/4-3/
│   └── useHorarios.ts          # Composable reutilizable
└── components/__tests__/
    └── GestorHorarios.spec.ts  # Tests del componente

docs/                           # Documentación VuePress
├── components/
│   ├── gestor-horarios.md      # Documentación del componente
│   └── README.md               # Índice de componentes
├── api/
│   ├── types.md                # Documentación de tipos
│   └── README.md               # Índice de API
└── guide/
    ├── examples.md             # Ejemplos prácticos
    └── README.md               # Guía de uso
```

## Características Implementadas

### 1. Gestión de Horarios (✅ Completado)
- Visualización en cuadrícula de horarios (5 días × 8 horas)
- Selector de aulas con cambio dinámico
- Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar)
- Interfaz responsive y accesible

### 2. Estructura de Datos (✅ Completado)
- **IAsignatura**: Interface para datos de asignaturas
- **BloqueHorario**: Tipo para bloques individuales (IAsignatura | null)
- **HorarioAula**: Matriz 5×8 para horario completo de aula
- **HorariosData**: Record<string, HorarioAula> para múltiples aulas

### 3. Lógica de Negocio (✅ Completado)
- **HorarioManager**: Clase para gestión completa de horarios
- Validaciones de coordenadas y datos
- Consultas avanzadas (por profesor, asignatura, conflictos)
- Estadísticas de ocupación de aulas
- Exportación/importación de datos

### 4. Patrón Singleton (✅ Completado)
- **ConfiguracionGlobal**: Gestión centralizada de configuración
- Persistencia en localStorage
- Sistema de observadores para cambios
- Configuración de horarios, validaciones, interfaz, etc.

### 5. Tests con Vitest (✅ Completado)
- **Test 1**: Estado inicial del horarioVisible
- **Test 2**: Cambio de aula y actualización de vista
- **Test 3**: Añadir reserva en bloque vacío
- **Test 4**: Modificar reserva existente
- **Test 5**: Eliminar reserva
- Tests adicionales para HorarioManager y validaciones

### 6. Documentación VuePress (✅ Completado)
- **Propósito**: Descripción completa de funcionalidades
- **Estructura de Datos**: Documentación detallada de interfaces
- **Ejemplos Prácticos**: Casos de uso para diferentes tipos de centros
- **API Reference**: Documentación completa de la API
- **Guías de Uso**: Mejores prácticas y construcción de datos

## Comandos Disponibles

### Desarrollo
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run preview      # Vista previa de la construcción
```

### Testing
```bash
npm run test:unit    # Ejecutar tests unitarios
```

### Documentación
```bash
npm run docs:dev     # Servidor de documentación en desarrollo
npm run docs:build   # Construir documentación estática
```

### Calidad de Código
```bash
npm run lint         # Linter ESLint
npm run format       # Formatear código con Prettier
npm run type-check   # Verificación de tipos TypeScript
```

## Ejemplos de Uso

### Datos Básicos
```typescript
const horarios: HorariosData = {
  'Aula 101': [
    [
      { nombre: 'DAWEC', profesor: 'Ana Pérez', grupo: '2DAW' },
      null,
      { nombre: 'DIW', profesor: 'Luis García', grupo: '2DAW' },
      // ... más bloques
    ],
    // ... más días
  ]
};
```

### Uso del Componente
```vue
<template>
  <GestorHorarios />
</template>

<script setup lang="ts">
import GestorHorarios from '@/components/4-3/GestorHorarios.vue';
</script>
```

### Uso de la API
```typescript
import { HorarioManager } from '@/core/4-3/HorarioManager';

const manager = new HorarioManager(horarios);
manager.crearReserva('Aula 101', 0, 1, {
  nombre: 'Matemáticas',
  profesor: 'Prof. García',
  grupo: '1ESO'
});
```

## Tecnologías Utilizadas

- **Vue.js 3**: Framework principal con Composition API
- **TypeScript**: Tipado estático y mejor experiencia de desarrollo
- **Vite**: Herramienta de construcción rápida
- **Vitest**: Framework de testing moderno
- **VuePress**: Generador de documentación estática
- **ESLint + Prettier**: Calidad y formato de código

## Patrones de Diseño Implementados

### Singleton (ConfiguracionGlobal)
- Una única instancia de configuración global
- Acceso centralizado a ajustes del sistema
- Persistencia automática en localStorage
- Sistema de observadores para reactividad

### Observer (Sistema de Notificaciones)
- Observadores en ConfiguracionGlobal
- Notificaciones de cambios de configuración
- Desacoplamiento entre componentes

### Factory (Creación de Horarios)
- Funciones factory para crear horarios vacíos
- Generación de datos de ejemplo
- Construcción consistente de estructuras

## Consideraciones de Rendimiento

- **Computed Properties**: Recálculo eficiente solo cuando es necesario
- **Event Delegation**: Manejo optimizado de eventos
- **Lazy Loading**: Carga bajo demanda del modal
- **Memory Management**: Limpieza adecuada de referencias

## Próximas Mejoras

- [ ] Persistencia en base de datos
- [ ] Autenticación y autorización
- [ ] Exportación a PDF/Excel
- [ ] Notificaciones push
- [ ] Modo offline con Service Workers
- [ ] Internacionalización (i18n)

## Contribución

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -am 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.