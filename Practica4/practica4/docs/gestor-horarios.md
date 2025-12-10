# GestorHorarios.vue

## Propósito

El componente `GestorHorarios` es el componente principal del sistema de gestión de horarios de aulas. Su función principal es:

- **Visualizar horarios**: Mostrar los horarios de diferentes aulas en formato de cuadrícula
- **Gestionar reservas**: Permitir crear, modificar y eliminar reservas de asignaturas
- **Cambiar entre aulas**: Facilitar la navegación entre diferentes aulas
- **Coordinar la interfaz**: Actuar como contenedor principal que coordina todos los elementos de la UI

## Estructura de Datos

### IAsignatura

Interface que define la estructura de una asignatura:

```typescript
export interface IAsignatura {
  nombre: string;    // Nombre de la asignatura (ej: "DAWEC", "Matemáticas")
  profesor: string;  // Nombre del profesor (ej: "A. Pérez")
  grupo: string;     // Grupo o curso (ej: "2DAW", "1ESO-A")
}
```

### BloqueHorario

Tipo que representa un bloque horario individual:

```typescript
export type BloqueHorario = IAsignatura | null;
```

### HorarioAula

Tipo que representa el horario completo de un aula:

```typescript
export type HorarioAula = BloqueHorario[][];
```

### HorariosData

Tipo que contiene todos los horarios del sistema:

```typescript
export type HorariosData = Record<string, HorarioAula>;
```

## Métodos Principales

### abrirModal(dia: number, hora: number)
Abre el modal para crear/editar una reserva.

### guardarReserva(payload)
Guarda una reserva (crear o modificar).

### eliminarReserva(payload)
Elimina una reserva existente.