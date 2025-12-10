import { ref, computed } from 'vue';
import type { HorariosData, HorarioAula, IAsignatura } from '@/types/4-3/schedule';

export function useHorarios() {
  // Datos iniciales de ejemplo
  const horarios = ref<HorariosData>({
    'Aula 101': [
      // Lunes
      [
        { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
        { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
        null,
        { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
        { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
        null,
        null,
        null
      ],
      // Martes
      [
        null,
        { nombre: 'EIE', profesor: 'C. López', grupo: '2DAW' },
        { nombre: 'EIE', profesor: 'C. López', grupo: '2DAW' },
        null,
        { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
        { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
        null,
        null
      ],
      // Miércoles
      [
        { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
        { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
        { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
        null,
        null,
        { nombre: 'Inglés', profesor: 'E. Smith', grupo: '2DAW' },
        null,
        null
      ],
      // Jueves
      [
        null,
        null,
        { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
        { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
        { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
        null,
        null,
        null
      ],
      // Viernes
      [
        { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
        { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
        null,
        null,
        { nombre: 'Tutoría', profesor: 'F. Ruiz', grupo: '2DAW' },
        null,
        null,
        null
      ]
    ],
    'Aula 205': [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ],
    'Aula 302': [
      [
        { nombre: 'Matemáticas', profesor: 'G. Fernández', grupo: '1DAW' },
        { nombre: 'Matemáticas', profesor: 'G. Fernández', grupo: '1DAW' },
        null,
        null,
        { nombre: 'Programación', profesor: 'H. Torres', grupo: '1DAW' },
        { nombre: 'Programación', profesor: 'H. Torres', grupo: '1DAW' },
        null,
        null
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ]
  });

  const aulaSeleccionada = ref<string>('Aula 101');

  // Computed properties
  const aulas = computed(() => Object.keys(horarios.value));
  const horarioVisible = computed<HorarioAula>(() => horarios.value[aulaSeleccionada.value] || []);

  // Métodos CRUD
  function crearReserva(aula: string, dia: number, hora: number, asignatura: IAsignatura) {
    if (horarios.value[aula] && horarios.value[aula][dia]) {
      horarios.value[aula][dia][hora] = asignatura;
    }
  }

  function actualizarReserva(aula: string, dia: number, hora: number, asignatura: IAsignatura) {
    if (horarios.value[aula] && horarios.value[aula][dia]) {
      horarios.value[aula][dia][hora] = asignatura;
    }
  }

  function eliminarReserva(aula: string, dia: number, hora: number) {
    if (horarios.value[aula] && horarios.value[aula][dia]) {
      horarios.value[aula][dia][hora] = null;
    }
  }

  function obtenerReserva(aula: string, dia: number, hora: number): IAsignatura | null {
    if (horarios.value[aula] && horarios.value[aula][dia]) {
      return horarios.value[aula][dia][hora] || null;
    }
    return null;
  }

  function crearAula(nombreAula: string) {
    if (!horarios.value[nombreAula]) {
      // Crear matriz vacía de 5 días x 8 horas
      horarios.value[nombreAula] = Array(5).fill(null).map(() => Array(8).fill(null));
    }
  }

  function eliminarAula(nombreAula: string) {
    if (horarios.value[nombreAula]) {
      delete horarios.value[nombreAula];
      // Si eliminamos el aula seleccionada, seleccionar la primera disponible
      if (aulaSeleccionada.value === nombreAula) {
        const aulasDisponibles = Object.keys(horarios.value);
        aulaSeleccionada.value = aulasDisponibles.length > 0 ? aulasDisponibles[0] : '';
      }
    }
  }

  return {
    horarios,
    aulaSeleccionada,
    aulas,
    horarioVisible,
    crearReserva,
    actualizarReserva,
    eliminarReserva,
    obtenerReserva,
    crearAula,
    eliminarAula
  };
}