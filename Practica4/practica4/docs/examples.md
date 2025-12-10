# Ejemplos Prácticos

## Ejemplo 1: Instituto de Educación Secundaria

### Configuración Básica

```typescript
const institutoESO: HorariosData = {
  'Aula 1A': [
    // Lunes
    [
      { nombre: 'Matemáticas', profesor: 'Carmen García López', grupo: '1º ESO A' },
      { nombre: 'Matemáticas', profesor: 'Carmen García López', grupo: '1º ESO A' },
      null, // Recreo 10:00-11:00
      { nombre: 'Lengua Castellana', profesor: 'Miguel Ruiz Sánchez', grupo: '1º ESO A' },
      { nombre: 'Historia', profesor: 'Ana Martín Torres', grupo: '1º ESO A' },
      null, // Comida 13:30-14:30
      { nombre: 'Educación Física', profesor: 'Pedro López Díaz', grupo: '1º ESO A' },
      null
    ],
    // Martes
    [
      { nombre: 'Inglés', profesor: 'Sarah Johnson', grupo: '1º ESO A' },
      { nombre: 'Ciencias Naturales', profesor: 'Laura Fernández', grupo: '1º ESO A' },
      null,
      { nombre: 'Matemáticas', profesor: 'Carmen García López', grupo: '1º ESO A' },
      { nombre: 'Lengua Castellana', profesor: 'Miguel Ruiz Sánchez', grupo: '1º ESO A' },
      null,
      { nombre: 'Tecnología', profesor: 'Roberto Jiménez', grupo: '1º ESO A' },
      null
    ],
    // Miércoles
    [
      { nombre: 'Historia', profesor: 'Ana Martín Torres', grupo: '1º ESO A' },
      { nombre: 'Inglés', profesor: 'Sarah Johnson', grupo: '1º ESO A' },
      null,
      { nombre: 'Ciencias Naturales', profesor: 'Laura Fernández', grupo: '1º ESO A' },
      { nombre: 'Matemáticas', profesor: 'Carmen García López', grupo: '1º ESO A' },
      null,
      { nombre: 'Música', profesor: 'Elena Vázquez', grupo: '1º ESO A' },
      null
    ],
    // Jueves
    [
      { nombre: 'Lengua Castellana', profesor: 'Miguel Ruiz Sánchez', grupo: '1º ESO A' },
      { nombre: 'Educación Física', profesor: 'Pedro López Díaz', grupo: '1º ESO A' },
      null,
      { nombre: 'Inglés', profesor: 'Sarah Johnson', grupo: '1º ESO A' },
      { nombre: 'Ciencias Naturales', profesor: 'Laura Fernández', grupo: '1º ESO A' },
      null,
      { nombre: 'Plástica', profesor: 'Marta Herrera', grupo: '1º ESO A' },
      null
    ],
    // Viernes
    [
      { nombre: 'Matemáticas', profesor: 'Carmen García López', grupo: '1º ESO A' },
      { nombre: 'Historia', profesor: 'Ana Martín Torres', grupo: '1º ESO A' },
      null,
      { nombre: 'Lengua Castellana', profesor: 'Miguel Ruiz Sánchez', grupo: '1º ESO A' },
      { nombre: 'Tutoría', profesor: 'Carmen García López', grupo: '1º ESO A' },
      null,
      null,
      null
    ]
  ]
};
```

## Ejemplo 2: Centro de Formación Profesional

### Ciclo Superior DAW (Desarrollo de Aplicaciones Web)

```typescript
const centroDAW: HorariosData = {
  'Aula Informática 1': [
    // Lunes
    [
      { nombre: 'DAWEC', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      { nombre: 'DAWEC', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      { nombre: 'DAWEC', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      null, // Descanso
      { nombre: 'DIW', profesor: 'Luis Martín López', grupo: '2º DAW' },
      { nombre: 'DIW', profesor: 'Luis Martín López', grupo: '2º DAW' },
      null, // Comida
      { nombre: 'Proyecto', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      { nombre: 'Proyecto', profesor: 'Ana Pérez García', grupo: '2º DAW' }
    ],
    // Martes
    [
      { nombre: 'DAWES', profesor: 'David Torres Moreno', grupo: '2º DAW' },
      { nombre: 'DAWES', profesor: 'David Torres Moreno', grupo: '2º DAW' },
      { nombre: 'DAWES', profesor: 'David Torres Moreno', grupo: '2º DAW' },
      null,
      { nombre: 'EIE', profesor: 'Carmen Ruiz Sánchez', grupo: '2º DAW' },
      { nombre: 'EIE', profesor: 'Carmen Ruiz Sánchez', grupo: '2º DAW' },
      null,
      { nombre: 'Inglés Técnico', profesor: 'Sarah Johnson', grupo: '2º DAW' },
      null
    ],
    // Miércoles
    [
      { nombre: 'DAWEC', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      { nombre: 'DAWEC', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      null,
      { nombre: 'DIW', profesor: 'Luis Martín López', grupo: '2º DAW' },
      { nombre: 'DIW', profesor: 'Luis Martín López', grupo: '2º DAW' },
      null,
      { nombre: 'DAWES', profesor: 'David Torres Moreno', grupo: '2º DAW' },
      { nombre: 'DAWES', profesor: 'David Torres Moreno', grupo: '2º DAW' }
    ],
    // Jueves
    [
      { nombre: 'Proyecto', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      { nombre: 'Proyecto', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      { nombre: 'Proyecto', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      null,
      { nombre: 'DAWES', profesor: 'David Torres Moreno', grupo: '2º DAW' },
      { nombre: 'DAWES', profesor: 'David Torres Moreno', grupo: '2º DAW' },
      null,
      { nombre: 'Tutoría', profesor: 'Ana Pérez García', grupo: '2º DAW' },
      null
    ],
    // Viernes
    [
      { nombre: 'DIW', profesor: 'Luis Martín López', grupo: '2º DAW' },
      { nombre: 'DIW', profesor: 'Luis Martín López', grupo: '2º DAW' },
      null,
      { nombre: 'EIE', profesor: 'Carmen Ruiz Sánchez', grupo: '2º DAW' },
      { nombre: 'Inglés Técnico', profesor: 'Sarah Johnson', grupo: '2º DAW' },
      null,
      null,
      null
    ]
  ],
  
  'Aula Teoría 1': [
    // Horario para clases teóricas
    [
      null,
      null,
      null,
      { nombre: 'EIE Teoría', profesor: 'Carmen Ruiz Sánchez', grupo: '1º DAW' },
      { nombre: 'EIE Teoría', profesor: 'Carmen Ruiz Sánchez', grupo: '1º DAW' },
      null,
      null,
      null
    ],
    // ... más días
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ]
};
```

## Ejemplo 3: Universidad - Grado en Informática

### Configuración Universitaria

```typescript
const universidadInformatica: HorariosData = {
  'Aula Magna A1': [
    // Lunes
    [
      { nombre: 'Algoritmos', profesor: 'Dr. García Martínez', grupo: '2º Informática' },
      { nombre: 'Algoritmos', profesor: 'Dr. García Martínez', grupo: '2º Informática' },
      null,
      { nombre: 'Base de Datos', profesor: 'Dra. López Fernández', grupo: '2º Informática' },
      { nombre: 'Base de Datos', profesor: 'Dra. López Fernández', grupo: '2º Informática' },
      null,
      { nombre: 'Sistemas Operativos', profesor: 'Dr. Ruiz Torres', grupo: '2º Informática' },
      null
    ],
    // Martes
    [
      { nombre: 'Programación Web', profesor: 'Prof. Martín Sánchez', grupo: '3º Informática' },
      { nombre: 'Programación Web', profesor: 'Prof. Martín Sánchez', grupo: '3º Informática' },
      null,
      { nombre: 'Ingeniería Software', profesor: 'Dra. Pérez Jiménez', grupo: '3º Informática' },
      { nombre: 'Ingeniería Software', profesor: 'Dra. Pérez Jiménez', grupo: '3º Informática' },
      null,
      null,
      null
    ],
    // ... más días
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ],
  
  'Laboratorio Informática': [
    // Prácticas de laboratorio
    [
      null,
      null,
      { nombre: 'Práctica Algoritmos', profesor: 'Dr. García Martínez', grupo: '2º Inf - Grupo A' },
      { nombre: 'Práctica Algoritmos', profesor: 'Dr. García Martínez', grupo: '2º Inf - Grupo A' },
      null,
      null,
      { nombre: 'Práctica BD', profesor: 'Dra. López Fernández', grupo: '2º Inf - Grupo B' },
      { nombre: 'Práctica BD', profesor: 'Dra. López Fernández', grupo: '2º Inf - Grupo B' }
    ],
    // ... más días
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ]
};
```

## Ejemplo 4: Academia de Idiomas

### Configuración Flexible

```typescript
const academiaIdiomas: HorariosData = {
  'Aula Inglés 1': [
    // Lunes
    [
      { nombre: 'Inglés A1', profesor: 'Sarah Johnson', grupo: 'Principiantes' },
      { nombre: 'Inglés A2', profesor: 'Sarah Johnson', grupo: 'Básico' },
      null,
      { nombre: 'Inglés B1', profesor: 'Michael Brown', grupo: 'Intermedio' },
      { nombre: 'Inglés B2', profesor: 'Michael Brown', grupo: 'Intermedio Alto' },
      null,
      { nombre: 'Inglés C1', profesor: 'Emma Wilson', grupo: 'Avanzado' },
      { nombre: 'Conversación', profesor: 'Emma Wilson', grupo: 'Todos los niveles' }
    ],
    // ... más días con diferentes horarios
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ],
  
  'Aula Francés': [
    [
      { nombre: 'Francés A1', profesor: 'Marie Dubois', grupo: 'Débutants' },
      { nombre: 'Francés A2', profesor: 'Marie Dubois', grupo: 'Élémentaire' },
      null,
      { nombre: 'Francés B1', profesor: 'Pierre Martin', grupo: 'Intermédiaire' },
      null,
      null,
      { nombre: 'Francés B2', profesor: 'Pierre Martin', grupo: 'Avancé' },
      null
    ],
    // ... más días
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ]
};
```

## Funciones Auxiliares para Ejemplos

### Generador de Horarios Vacíos

```typescript
function crearHorarioVacio(): HorarioAula {
  return Array(5).fill(null).map(() => Array(8).fill(null));
}

function crearSistemaVacio(aulas: string[]): HorariosData {
  const sistema: HorariosData = {};
  aulas.forEach(aula => {
    sistema[aula] = crearHorarioVacio();
  });
  return sistema;
}

// Uso
const sistemaVacio = crearSistemaVacio([
  'Aula 101',
  'Aula 102', 
  'Laboratorio',
  'Gimnasio'
]);
```

### Validador de Ejemplos

```typescript
function validarEjemplo(horarios: HorariosData): boolean {
  for (const [aula, horario] of Object.entries(horarios)) {
    if (!validarHorario(horario)) {
      console.error(`Horario inválido en ${aula}`);
      return false;
    }
  }
  return true;
}

// Validar todos los ejemplos
console.log('Instituto ESO:', validarEjemplo(institutoESO));
console.log('Centro DAW:', validarEjemplo(centroDAW));
console.log('Universidad:', validarEjemplo(universidadInformatica));
console.log('Academia:', validarEjemplo(academiaIdiomas));
```

## Consejos para Crear Tus Propios Ejemplos

1. **Planifica primero**: Define qué asignaturas, profesores y grupos necesitas
2. **Respeta los descansos**: Incluye recreos y pausas para comida
3. **Distribuye la carga**: Evita sobrecargar a profesores o aulas
4. **Sé consistente**: Usa el mismo formato para nombres similares
5. **Valida siempre**: Comprueba que los datos son correctos antes de usar