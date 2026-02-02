export interface ReservaFormData {
  nombreCompleto: string
  nifNie: string
  telefono: string
  email: string
  tipoEvento: string
  fechaEvento: string
  horaInicio: string
  numeroAsistentes: number
  serviciosCatering: string[]
  presupuesto: string
  comentarios: string
  aceptaTerminos: boolean
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

export type ServicioCatering = 'vegetariano' | 'vegano' | 'barraLibre' | 'infantil' | 'cafe'

export type PresupuestoRango = 'economico' | 'estandar' | 'premium' | 'luxury'

export interface CateringOption {
  id: ServicioCatering
  label: string
}

export interface PresupuestoOption {
  id: PresupuestoRango
  label: string
  description: string
}