export interface ReservaFormData {
  nombreCompleto: string
  nifNie: string
  telefono: string
  email: string
  tipoEvento: string
  fechaEvento: string
  horaInicio: string
  numeroAsistentes: number
}

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export type TipoEvento = 'Boda' | 'Cumpleaños' | 'Corporativo' | 'Conferencia' | 'Otro'