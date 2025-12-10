# Guía de Uso

## Introducción

Esta guía te ayudará a entender cómo usar y configurar el sistema de gestión de horarios de aulas.

## Conceptos Básicos

### ¿Qué es un Horario de Aula?

Un horario de aula es una matriz de 5×8 que representa:
- **5 filas**: Los días laborables (Lunes a Viernes)
- **8 columnas**: Los bloques horarios del día

### Estructura de una Asignatura

Cada asignatura contiene tres datos esenciales:
- **Nombre**: Identificador de la materia
- **Profesor**: Docente responsable
- **Grupo**: Estudiantes que reciben la clase

## Construcción de Datos Iniciales

### Horario Vacío

Para crear un aula sin reservas:

```typescript
const aulaVacia: HorarioAula = [
  [null, null, null, null, null, null, null, null], // Lunes
  [null, null, null, null, null, null, null, null], // Martes
  [null, null, null, null, null, null, null, null], // Miércoles
  [null, null, null, null, null, null, null, null], // Jueves
  [null, null, null, null, null, null, null, null]  // Viernes
];
```

### Horario con Reservas

Para crear un aula con algunas clases programadas:

```typescript
const aulaConClases: HorarioAula = [
  // Lunes
  [
    { nombre: 'DAWEC', profesor: 'Ana Pérez', grupo: '2DAW' },    // 8:00-9:00
    { nombre: 'DAWEC', profesor: 'Ana Pérez', grupo: '2DAW' },    // 9:00-10:00
    null,                                                         // 10:00-11:00 (recreo)
    { nombre: 'DIW', profesor: 'Luis García', grupo: '2DAW' },    // 11:30-12:30
    { nombre: 'DIW', profesor: 'Luis García', grupo: '2DAW' },    // 12:30-13:30
    null,                                                         // 13:30-14:30 (comida)
    null,                                                         // 15:00-16:00
    null                                                          // 16:00-17:00
  ],
  // Martes a Viernes...
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null]
];
```

### Sistema Completo

Para configurar múltiples aulas:

```typescript
const sistemaCompleto: HorariosData = {
  'Aula 101 - Informática': aulaConClases,
  'Aula 205 - Matemáticas': aulaVacia,
  'Laboratorio': [
    // Configuración específica del laboratorio
  ]
};
```

## Casos de Uso Comunes

### 1. Centro Educativo Básico

```typescript
const centroBasico: HorariosData = {
  'Aula A': [
    [
      { nombre: 'Matemáticas', profesor: 'Prof. García', grupo: '1ESO-A' },
      { nombre: 'Lengua', profesor: 'Prof. López', grupo: '1ESO-A' },
      null, // Recreo
      { nombre: 'Historia', profesor: 'Prof. Martín', grupo: '1ESO-A' },
      { nombre: 'Inglés', profesor: 'Prof. Smith', grupo: '1ESO-A' },
      null, // Comida
      { nombre: 'Educación Física', profesor: 'Prof. Ruiz', grupo: '1ESO-A' },
      null
    ],
    // ... más días
  ]
};
```

### 2. Formación Profesional

```typescript
const centroFP: HorariosData = {
  'Aula Informática 1': [
    [
      { nombre: 'DAWEC', profesor: 'Ana Pérez', grupo: '2DAW' },
      { nombre: 'DAWEC', profesor: 'Ana Pérez', grupo: '2DAW' },
      { nombre: 'DAWEC', profesor: 'Ana Pérez', grupo: '2DAW' },
      null,
      { nombre: 'DIW', profesor: 'Luis García', grupo: '2DAW' },
      { nombre: 'DIW', profesor: 'Luis García', grupo: '2DAW' },
      null,
      null
    ],
    // ... más días
  ]
};
```

## Mejores Prácticas

### Nomenclatura de Aulas
- Usar nombres descriptivos: `'Aula 101 - Informática'`
- Incluir capacidad si es relevante: `'Laboratorio (30 puestos)'`
- Ser consistente en el formato

### Datos de Asignaturas
- **Nombres cortos pero descriptivos**: `'DAWEC'` mejor que `'Desarrollo de Aplicaciones Web en Entorno Cliente'`
- **Profesores con nombre completo**: `'Ana Pérez García'`
- **Grupos específicos**: `'2º DAW Grupo A'`

### Organización de Horarios
- Respetar los recreos y pausas
- Agrupar asignaturas relacionadas
- Considerar la carga horaria de profesores

## Validaciones Recomendadas

### Antes de Crear Datos

```typescript
function validarAsignatura(asignatura: IAsignatura): boolean {
  return (
    asignatura.nombre.trim().length > 0 &&
    asignatura.profesor.trim().length > 0 &&
    asignatura.grupo.trim().length > 0 &&
    asignatura.nombre.length <= 50 &&
    asignatura.profesor.length <= 100 &&
    asignatura.grupo.length <= 20
  );
}

function validarHorario(horario: HorarioAula): boolean {
  return (
    horario.length === 5 && // 5 días
    horario.every(dia => dia.length === 8) && // 8 horas por día
    horario.every(dia => 
      dia.every(bloque => 
        bloque === null || validarAsignatura(bloque)
      )
    )
  );
}
```