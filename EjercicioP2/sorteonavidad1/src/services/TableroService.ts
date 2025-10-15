import type { TableroCasilla } from '../models/TableroCasilla';

// Clave para guardar el estado del tablero en localStorage
const STORAGE_KEY = 'tablero';

// Funcion para cargar el tablero desde localStorage
// Si no existe, crea un tablero nuevo con 100 casillas (00-99)
function cargarTablero(): TableroCasilla[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data); // Si hay datos, los parsea
  // Si no hay datos, crea el tablero inicial
  return Array.from({ length: 100 }, (_, i) => ({
    numero: i,
    reservado: false,
  }));
}

// Funcion para guardar el tablero en localStorage
function guardarTablero(tablero: TableroCasilla[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tablero));
}

// Variable global que mantiene el estado del tablero en memoria
let tablero: TableroCasilla[] = cargarTablero();

/**
 * Reserva un numero en el tablero para un participante
 * Solo se puede reservar si la casilla esta libre
 * Devuelve true si la reserva fue exitosa, false si el numero ya estaba ocupado
 */
export function reservarNumero(numero: number, participante: string): boolean {
  const casilla = tablero.find(c => c.numero === numero);
  if (casilla && !casilla.reservado) {
    casilla.reservado = true;
    casilla.participante = participante; // Guarda el nombre del participante
    guardarTablero(tablero); // Actualiza persistencia
    return true;
  }
  return false; // No se pudo reservar
}

/**
 * Libera una casilla del tablero (cancela la reserva)
 * Elimina el nombre del participante y marca la casilla como libre
 */
export function liberarNumeroTablero(numero: number) {
  const casilla = tablero.find(c => c.numero === numero);
  if (casilla) {
    casilla.reservado = false;
    casilla.participante = undefined;
    guardarTablero(tablero); // Actualiza persistencia
  }
}

/**
 * Devuelve el estado actual del tablero (todas las casillas)
 */
export function obtenerTablero(): TableroCasilla[] {
  return tablero;
}