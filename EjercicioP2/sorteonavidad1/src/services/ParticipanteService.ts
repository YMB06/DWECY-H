import type { Participante } from '../models/Participante';

// Clave para guardar los datos en localStorage
const STORAGE_KEY = 'participantes';

// Carga los participantes desde localStorage al iniciar la app
function cargarParticipantes(): Participante[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Guarda el array de participantes en localStorage
function guardarParticipantes(participantes: Participante[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(participantes));
}

// Variable global que mantiene la lista de participantes en memoria
let participantes: Participante[] = cargarParticipantes();

/**
 * Agrega un nuevo participante si el email no está registrado.
 * Devuelve true si se agrego correctamente, false si el email ya existe.
 */
export function agregarParticipante(nombre: string, email: string, telefono: string): boolean {
  if (participantes.some(p => p.email === email)) return false; // Validacion de duplicados
  participantes.push({ nombre, email, telefono, numeros: [] });
  guardarParticipantes(participantes); // Persistencia en localStorage
  return true;
}

/**
 * Devuelve la lista completa de participantes registrados.
 */
export function obtenerParticipantes(): Participante[] {
  return participantes;
}

/**
 * Asigna un numero a un participante por email, si aun no lo tiene.
 */
export function asignarNumero(email: string, numero: number) {
  const participante = participantes.find(p => p.email === email);
  if (participante && !participante.numeros.includes(numero)) {
    participante.numeros.push(numero);
    guardarParticipantes(participantes); // Actualiza
  }
}

/**
 * Elimina un numero reservado por el participante (libera el numero).
 */
export function liberarNumero(email: string, numero: number) {
  const participante = participantes.find(p => p.email === email);
  if (participante) {
    participante.numeros = participante.numeros.filter(n => n !== numero);
    guardarParticipantes(participantes); // Actualiza 
  }
}