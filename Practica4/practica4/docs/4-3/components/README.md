# Componentes

## Descripción General

El sistema de gestión de horarios está compuesto por dos componentes principales que trabajan en conjunto para proporcionar una experiencia de usuario completa e intuitiva.

## Componentes Disponibles

### [GestorHorarios.vue](./gestor-horarios.md)
Componente principal que maneja toda la lógica de visualización y gestión de horarios de aulas.

**Características principales:**
- Visualización en cuadrícula de horarios
- Selector de aulas
- Gestión CRUD de reservas
- Interfaz responsive

### [HorarioModal.vue](./horario-modal.md)
Componente modal para la creación, edición y eliminación de reservas de asignaturas.

**Características principales:**
- Formulario de datos de asignatura
- Validación de campos
- Modos crear/editar/eliminar
- Interfaz accesible

## Arquitectura de Componentes

```
GestorHorarios (Componente Principal)
├── Selector de Aulas
├── Tabla de Horarios
│   ├── Cabeceras (Días/Horas)
│   └── Celdas de Bloques Horarios
└── HorarioModal (Componente Modal)
    ├── Formulario de Asignatura
    ├── Botones de Acción
    └── Validaciones
```

## Flujo de Datos

1. **GestorHorarios** mantiene el estado principal de los horarios
2. **Usuario** hace clic en una celda de horario
3. **GestorHorarios** abre el **HorarioModal** con los datos correspondientes
4. **HorarioModal** permite editar/crear/eliminar la reserva
5. **HorarioModal** emite eventos de vuelta a **GestorHorarios**
6. **GestorHorarios** actualiza el estado y la visualización