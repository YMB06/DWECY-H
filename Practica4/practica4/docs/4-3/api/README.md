# API Reference

## Descripción General

La API del sistema de gestión de horarios proporciona una interfaz completa para manipular y consultar datos de horarios de aulas de forma programática.

## Módulos Principales

### [Tipos e Interfaces](./types.md)
Definiciones de tipos TypeScript que garantizan la consistencia de datos:
- `IAsignatura`: Estructura de una asignatura
- `BloqueHorario`: Representación de un bloque horario
- `HorarioAula`: Horario completo de un aula
- `HorariosData`: Colección de todos los horarios

### [HorarioManager](./horario-manager.md)
Clase principal para la gestión de horarios:
- Operaciones CRUD sobre reservas
- Gestión de aulas
- Consultas avanzadas
- Validaciones y estadísticas

## Estructura de la API

```
API
├── Types (Tipos e Interfaces)
│   ├── IAsignatura
│   ├── BloqueHorario
│   ├── HorarioAula
│   └── HorariosData
├── Core (Lógica de Negocio)
│   ├── HorarioManager
│   └── ConfiguracionGlobal
└── Composables (Lógica Reactiva)
    └── useHorarios
```

## Flujo de Datos

1. **Definición de Tipos**: Los tipos TypeScript definen la estructura de datos
2. **HorarioManager**: Maneja la lógica de negocio y validaciones
3. **Composables**: Proporcionan reactividad para Vue.js
4. **Componentes**: Consumen la API para mostrar la interfaz

## Ejemplos de Uso Rápido

### Crear un Gestor de Horarios

```typescript
import { HorarioManager } from '@/core/4-3/HorarioManager';
import type { HorariosData } from '@/types/4-3/schedule';

const datosIniciales: HorariosData = {
  'Aula 101': [
    // ... datos del horario
  ]
};

const manager = new HorarioManager(datosIniciales);
```

### Operaciones Básicas

```typescript
// Crear una reserva
const exito = manager.crearReserva('Aula 101', 0, 1, {
  nombre: 'Matemáticas',
  profesor: 'Prof. García',
  grupo: '1ESO'
});

// Consultar una reserva
const reserva = manager.obtenerReserva('Aula 101', 0, 1);

// Eliminar una reserva
manager.eliminarReserva('Aula 101', 0, 1);
```

### Consultas Avanzadas

```typescript
// Obtener todas las clases de un profesor
const clasesProfesor = manager.obtenerReservasPorProfesor('Prof. García');

// Obtener estadísticas de un aula
const stats = manager.obtenerEstadisticasAula('Aula 101');

// Detectar conflictos de horario
const conflictos = manager.obtenerConflictosProfesor('Prof. García');
```