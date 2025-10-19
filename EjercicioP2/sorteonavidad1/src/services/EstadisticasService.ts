import { obtenerTablero } from './TableroService';
import { obtenerParticipantes } from './ParticipanteService';

export interface Estadisticas {
  totalParticipantes: number;
  numerosOcupados: number;
  numerosLibres: number;
  porcentajeOcupado: number;
}

export function obtenerEstadisticas(): Estadisticas {
  const tablero = obtenerTablero();
  const participantes = obtenerParticipantes();
  
  const numerosOcupados = tablero.filter(c => c.reservado).length;
  const numerosLibres = 100 - numerosOcupados;
  const porcentajeOcupado = Math.round((numerosOcupados / 100) * 100);
  
  return {
    totalParticipantes: participantes.length,
    numerosOcupados,
    numerosLibres,
    porcentajeOcupado
  };
}

export function obtenerNumerosPorParticipante(email: string): number[] {
  const participantes = obtenerParticipantes();
  const participante = participantes.find(p => p.email === email);
  return participante ? participante.numeros.sort((a, b) => a - b) : [];
}