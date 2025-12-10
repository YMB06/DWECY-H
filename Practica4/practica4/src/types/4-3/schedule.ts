export interface IAsignatura {
  nombre: string;
  profesor: string;
  grupo: string;
}

// Un bloque horario puede contener una asignatura o estar vacío (null)
export type BloqueHorario = IAsignatura | null;

// El horario de un aula es una matriz de bloques horarios
export type HorarioAula = BloqueHorario[][];

// La estructura principal de datos será un objeto/mapa de horarios por aula
export type HorariosData = Record<string, HorarioAula>;