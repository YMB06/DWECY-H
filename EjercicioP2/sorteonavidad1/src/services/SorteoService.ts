import { obtenerTablero } from './TableroService';
import { obtenerParticipantes } from './ParticipanteService';

export interface ResultadoSorteo {
  ganador: any;
  mensaje: string;
}

export function determinarGanador(ultimosDosDigitos: number): ResultadoSorteo {
  const tablero = obtenerTablero();
  const participantes = obtenerParticipantes();
  
  const casillaGanadora = tablero.find(c => c.numero === ultimosDosDigitos);
  
  if (!casillaGanadora || !casillaGanadora.reservado) {
    return {
      ganador: null,
      mensaje: `Número ${ultimosDosDigitos.toString().padStart(2, '0')} - SORTEO DESIERTO (número no ocupado)`
    };
  }
  
  const ganador = participantes.find(p => p.nombre === casillaGanadora.participante);
  
  return {
    ganador,
    mensaje: `¡Número premiado: ${ultimosDosDigitos.toString().padStart(2, '0')}!`
  };
}