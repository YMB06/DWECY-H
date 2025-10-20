import { Participante, ValidationError, DuplicateError } from '../models/Participante';

const STORAGE_KEY = 'participantes_v2';

/**
 * Carga participantes desde localStorage y reconstrulle instancias de Participante.
 */
function cargarParticipantes(): Participante[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const raw = JSON.parse(data) as Array<any>;
    return raw.map(r => new Participante(r.nombre, r.email, r.telefono, r.numeros || []));
  } catch {
    return [];
  }
}

function guardarParticipantes(participantes: Participante[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(participantes.map(p => p.toJSON())));
}

let participantes: Participante[] = cargarParticipantes();

/**
 * Intenta agregar un participante. Devuelve true si se agrega, false si el email ya existe
 * o si hay un error de validacion. Para uso interno/avanzado use agregarParticipanteOrThrow.
 */
export function agregarParticipante(nombre: string, email: string, telefono: string): boolean {
  try {
    return agregarParticipanteOrThrow(nombre, email, telefono) !== undefined;
  } catch (e) {
    // se podria loguear e informar al UI
    return false;
  }
}

/**
 * Agrega un participante y lanza si hay problemas (duplicado o validacion).
 * @throws DuplicateError si ya existe un participante con el mismo email
 * @throws ValidationError si nombre/email/telefono no son validos
 */
export function agregarParticipanteOrThrow(nombre: string, email: string, telefono: string): Participante {
  if (participantes.some(p => p.email === email)) {
    throw new DuplicateError('Email ya registrado');
  }
  const p = new Participante(nombre, email, telefono);
  participantes.push(p);
  guardarParticipantes(participantes);
  return p;
}

/**
 * Devuelve la lista de participantes (POJOs) para uso en componentes.
 */
export function obtenerParticipantes(): Array<{ nombre: string; email: string; telefono: string; numeros: number[] }> {
  return participantes.map(p => p.toJSON());
}

/**
 * Asigna un numero a un participante identificado por email.
 * Devuelve true si se asigna, false si no (por ejemplo participante no existe o numero duplicado).
 */
export function asignarNumero(email: string, numero: number): boolean {
  const p = participantes.find(x => x.email === email);
  if (!p) return false;
  try {
    p.addNumero(numero);
    guardarParticipantes(participantes);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Libera un numero para un participante identificado por email.
 */
export function liberarNumero(email: string, numero: number): boolean {
  const p = participantes.find(x => x.email === email);
  if (!p) return false;
  p.removeNumero(numero);
  guardarParticipantes(participantes);
  return true;
}

/**
 * Versiones que lanzan errores para uso interno/avanzado
 */
export function asignarNumeroOrThrow(email: string, numero: number) {
  const p = participantes.find(x => x.email === email);
  if (!p) throw new Error('Participante no existe');
  p.addNumero(numero); // puede lanzar DuplicateError
  guardarParticipantes(participantes);
}
export function liberarNumeroOrThrow(email: string, numero: number) {
  const p = participantes.find(x => x.email === email);
  if (!p) throw new Error('Participante no existe');
  p.removeNumero(numero);
  guardarParticipantes(participantes);
}