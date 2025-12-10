import type { HorariosData, HorarioAula, IAsignatura, BloqueHorario } from '@/types/4-3/schedule';

export class HorarioManager {
  private horarios: HorariosData;

  constructor(horariosIniciales: HorariosData = {}) {
    this.horarios = horariosIniciales;
  }

  // Métodos para gestionar aulas
  crearAula(nombreAula: string): void {
    if (!this.horarios[nombreAula]) {
      // Crear matriz vacía de 5 días x 8 horas
      this.horarios[nombreAula] = Array(5).fill(null).map(() => Array(8).fill(null));
    }
  }

  eliminarAula(nombreAula: string): boolean {
    if (this.horarios[nombreAula]) {
      delete this.horarios[nombreAula];
      return true;
    }
    return false;
  }

  obtenerAulas(): string[] {
    return Object.keys(this.horarios);
  }

  obtenerHorarioAula(nombreAula: string): HorarioAula | null {
    return this.horarios[nombreAula] || null;
  }

  // Métodos para gestionar reservas
  crearReserva(aula: string, dia: number, hora: number, asignatura: IAsignatura): boolean {
    if (this.validarCoordenadas(aula, dia, hora) && !this.horarios[aula]![dia]![hora]) {
      this.horarios[aula]![dia]![hora] = asignatura;
      return true;
    }
    return false;
  }

  actualizarReserva(aula: string, dia: number, hora: number, asignatura: IAsignatura): boolean {
    if (this.validarCoordenadas(aula, dia, hora)) {
      this.horarios[aula]![dia]![hora] = asignatura;
      return true;
    }
    return false;
  }

  eliminarReserva(aula: string, dia: number, hora: number): boolean {
    if (this.validarCoordenadas(aula, dia, hora)) {
      this.horarios[aula]![dia]![hora] = null;
      return true;
    }
    return false;
  }

  obtenerReserva(aula: string, dia: number, hora: number): BloqueHorario {
    if (this.validarCoordenadas(aula, dia, hora)) {
      return this.horarios[aula]![dia]![hora] || null;
    }
    return null;
  }

  // Métodos de validación
  private validarCoordenadas(aula: string, dia: number, hora: number): boolean {
    return (
      this.horarios[aula] &&
      dia >= 0 && dia < 5 &&
      hora >= 0 && hora < 8 &&
      this.horarios[aula][dia]
    );
  }

  esBloqueLibre(aula: string, dia: number, hora: number): boolean {
    if (!this.validarCoordenadas(aula, dia, hora)) {
      return false;
    }
    return this.obtenerReserva(aula, dia, hora) === null;
  }

  // Métodos de consulta avanzada
  obtenerReservasPorProfesor(profesor: string): Array<{aula: string, dia: number, hora: number, asignatura: IAsignatura}> {
    const reservas: Array<{aula: string, dia: number, hora: number, asignatura: IAsignatura}> = [];
    
    for (const [aula, horario] of Object.entries(this.horarios)) {
      if (horario) {
        for (let dia = 0; dia < horario.length; dia++) {
          if (horario[dia]) {
            for (let hora = 0; hora < horario[dia].length; hora++) {
              const bloque = horario[dia][hora];
              if (bloque && bloque.profesor === profesor) {
                reservas.push({ aula, dia, hora, asignatura: bloque });
              }
            }
          }
        }
      }
    }
    
    return reservas;
  }

  obtenerReservasPorAsignatura(nombreAsignatura: string): Array<{aula: string, dia: number, hora: number, asignatura: IAsignatura}> {
    const reservas: Array<{aula: string, dia: number, hora: number, asignatura: IAsignatura}> = [];
    
    for (const [aula, horario] of Object.entries(this.horarios)) {
      if (horario) {
        for (let dia = 0; dia < horario.length; dia++) {
          if (horario[dia]) {
            for (let hora = 0; hora < horario[dia].length; hora++) {
              const bloque = horario[dia][hora];
              if (bloque && bloque.nombre === nombreAsignatura) {
                reservas.push({ aula, dia, hora, asignatura: bloque });
              }
            }
          }
        }
      }
    }
    
    return reservas;
  }

  obtenerEstadisticasAula(aula: string): { totalBloques: number, bloquesOcupados: number, bloquesLibres: number } {
    if (!this.horarios[aula]) {
      return { totalBloques: 0, bloquesOcupados: 0, bloquesLibres: 0 };
    }

    let bloquesOcupados = 0;
    const totalBloques = 5 * 8; // 5 días x 8 horas

    for (const dia of this.horarios[aula]) {
      for (const bloque of dia) {
        if (bloque !== null) {
          bloquesOcupados++;
        }
      }
    }

    return {
      totalBloques,
      bloquesOcupados,
      bloquesLibres: totalBloques - bloquesOcupados
    };
  }

  // Métodos de exportación/importación
  exportarHorarios(): HorariosData {
    return JSON.parse(JSON.stringify(this.horarios));
  }

  importarHorarios(horarios: HorariosData): void {
    this.horarios = horarios;
  }

  // Método para obtener conflictos de horario
  obtenerConflictosProfesor(profesor: string): Array<{aula1: string, aula2: string, dia: number, hora: number}> {
    const conflictos: Array<{aula1: string, aula2: string, dia: number, hora: number}> = [];
    const reservasProfesor = this.obtenerReservasPorProfesor(profesor);
    
    for (let i = 0; i < reservasProfesor.length; i++) {
      for (let j = i + 1; j < reservasProfesor.length; j++) {
        const reserva1 = reservasProfesor[i];
        const reserva2 = reservasProfesor[j];
        
        if (reserva1 && reserva2 && reserva1.dia === reserva2.dia && reserva1.hora === reserva2.hora) {
          conflictos.push({
            aula1: reserva1.aula,
            aula2: reserva2.aula,
            dia: reserva1.dia,
            hora: reserva1.hora
          });
        }
      }
    }
    
    return conflictos;
  }
}