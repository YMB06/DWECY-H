export enum EstadoButaca {
  DISPONIBLE = 'disponible',
  SELECCIONADO = 'seleccionado',
  OCUPADO = 'ocupado',
  DAÑADO = 'dañado',
}

export interface IButaca {
  id: string;
  fila: number;
  columna: number;
  estado: EstadoButaca;
}