export interface Job {
  id: number
  empresa: string
  puesto: string
  estado: JobStatus
  fechaEnvio?: string
}

export type JobStatus = 
  | 'CV Enviado' 
  | 'Entrevista Técnica' 
  | 'Entrevista RRHH' 
  | 'Oferta Recibida' 
  | 'Rechazado'

export interface CreateJobDto {
  empresa: string
  puesto: string
  estado: JobStatus
}

export interface UpdateJobDto {
  estado: JobStatus
}
