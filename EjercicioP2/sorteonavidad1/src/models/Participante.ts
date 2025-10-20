export interface IParticipante {
  nombre: string;
  email: string;
  telefono: string;
  numeros: number[];
}

/**
 * Errores personalizados usados por la clase Participante
 */
export class ValidationError extends Error {}
export class DuplicateError extends Error {}

/**
 * Clase que modela un participante.
 * - Valida datos al construir
 * - Gestiona la lista de numeros reservados por el participante
 */
export class Participante implements IParticipante {
  public numeros: number[] = [];

  /**
   * Crea un participante validando nombre, email y telefono.
   * @param nombre nombre visible del participante
   * @param email email unico que identifica al participante
   * @param telefono telefono en formato simple (solo digitos y + - espacios)
   * @throws ValidationError si alguno de los campos no cumple los requisitos
   */
  constructor(
    public nombre: string,
    public email: string,
    public telefono: string,
    numeros?: number[]
  ) {
    if (numeros && Array.isArray(numeros)) this.numeros = Array.from(new Set(numeros));
    this.validateNombre();
    this.validateEmail();
    this.validateTelefono();
  }

  private validateNombre() {
    if (!this.nombre || !this.nombre.trim()) {
      throw new ValidationError('Nombre vacio o invalido');
    }
  }

  private validateEmail() {
    // Patron simple para email, suficiente para validacion basica
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !re.test(this.email)) {
      throw new ValidationError('Email invalido');
    }
  }

  private validateTelefono() {
    // Permitimos digitos, espacios, +, -, parentesis; minimo 6 digitos reales
    const digits = this.telefono.replace(/[^\d]/g, '');
    if (!this.telefono || digits.length < 6) {
      throw new ValidationError('Telefono invalido');
    }
  }

  /**
   * Añade un numero a este participante.
   * @param num numero a asignar (se asume validacion de rango fuera de aqui)
   * @throws DuplicateError si el numero ya estaba asignado a este participante
   */
  addNumero(num: number) {
    if (this.numeros.includes(num)) throw new DuplicateError('Numero ya asignado a este participante');
    this.numeros.push(num);
  }

  /**
   * Elimina un numero de este participante (libera).
   * @param num numero a eliminar
   */
  removeNumero(num: number) {
    this.numeros = this.numeros.filter(n => n !== num);
  }

  /**
   * Devuelve una representacion plana (POJO) util para persistencia/serializacion.
   */
  toJSON(): IParticipante {
    return {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      numeros: [...this.numeros]
    };
  }
}