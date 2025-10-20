import type { TableroCasilla } from '../models/TableroCasilla';

/**
 * Errores personalizados del tablero/sorteo
 */
export class TableroError extends Error { }
export class RangeErrorTablero extends TableroError { }
export class AlreadyReservedError extends TableroError { }
export class NotReservedError extends TableroError { }

const STORAGE_KEY = 'tablero_v2';

/**
 * Clase que encapsula la logica del tablero/sorteo.
 * - Persiste en localStorage
 * - Valida rangos
 */
export class Tablero {
  private tablero: TableroCasilla[] = [];

  constructor(private size = 100) {
    this.tablero = this.load();
  }

  // carga desde localStorage o crea un tablero nuevo
  private load(): TableroCasilla[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data) as TableroCasilla[];
        // garantia de estructura minima y normalizacion
        return parsed.map((c, i) => ({
          numero: typeof c.numero === 'number' ? c.numero : i,
          reservado: !!c.reservado,
          participante: c.participante
        })).slice(0, this.size);
      } catch {
        // si hay error de parseo, recreamos tablero
      }
    }
    return Array.from({ length: this.size }, (_, i) => ({ numero: i, reservado: false }));
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tablero));
  }

  /**
   * Valida que el numero esté dentro del rango del tablero
   * @throws RangeErrorTablero si el numero esta fuera de rango
   */
  private validateNumeroRange(numero: number) {
    if (!Number.isInteger(numero) || numero < 0 || numero >= this.tablero.length) {
      throw new RangeErrorTablero(`Numero fuera de rango: ${numero}`);
    }
  }

  /**
   * Reserva un numero para un participante.
   * @param numero numero a reservar (0..size-1)
   * @param participante nombre del participante que reserva
   * @throws RangeErrorTablero si numero fuera de rango
   * @throws AlreadyReservedError si la casilla ya esta reservada
   */
  reservarNumeroOrThrow(numero: number, participante: string) {
    this.validateNumeroRange(numero);

    // TypeScript strict puede considerar this.tablero[numero] como posiblemente undefined.
    // Hacemos una comprobacion explicita para evitar "possibly undefined" y lanzar un error claro si sucede.
    const casilla = this.tablero[numero];
    if (!casilla) {
      throw new RangeErrorTablero(`Casilla invalida: ${numero}`);
    }

    if (casilla.reservado) throw new AlreadyReservedError(`Casilla ${numero} ya reservada`);
    casilla.reservado = true;
    casilla.participante = participante;
    this.save();
  }

  /**
   * Libera una casilla.
   * @param numero numero a liberar
   * @throws RangeErrorTablero si numero fuera de rango
   * @throws NotReservedError si la casilla no esta reservada
   */
  liberarNumeroOrThrow(numero: number) {
    this.validateNumeroRange(numero);

    // Comprobacion explicita similar para evitar accesos a undefined
    const casilla = this.tablero[numero];
    if (!casilla) {
      throw new RangeErrorTablero(`Casilla invalida: ${numero}`);
    }

    if (!casilla.reservado) throw new NotReservedError(`Casilla ${numero} no esta reservada`);
    casilla.reservado = false;
    casilla.participante = undefined;
    this.save();
  }

  /**
   * Devuelve una copia del estado del tablero.
   */
  obtenerTablero(): TableroCasilla[] {
    // devolvemos copia para evitar mutaciones externas
    return this.tablero.map(c => ({ ...c }));
  }
}

/**
 * Instancia singleton que usa la app.
 */
const tableroInstance = new Tablero(100);

/**
 * Wrappers compatibilidad con la API previa (devuelven boolean para componentes existentes)
 */
export function reservarNumero(numero: number, participante: string): boolean {
  try {
    tableroInstance.reservarNumeroOrThrow(numero, participante);
    return true;
  } catch (e) {
    // opcional: console.warn(e);
    return false;
  }
}

export function liberarNumeroTablero(numero: number): boolean {
  try {
    tableroInstance.liberarNumeroOrThrow(numero);
    return true;
  } catch (e) {
    return false;
  }
}

export function obtenerTablero(): TableroCasilla[] {
  return tableroInstance.obtenerTablero();
}

// exporto tambien las versiones que lanzan, para uso programatico
export const reservarNumeroOrThrow = (n: number, p: string) => tableroInstance.reservarNumeroOrThrow(n, p);
export const liberarNumeroOrThrow = (n: number) => tableroInstance.liberarNumeroOrThrow(n);
