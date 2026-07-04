export interface ServicioMedico {
  id: number;
  nombre: string;
  slug: string;
  resumen: string;
  descripcionDetallada?: string;
  tiempoEstimadoMinutos: number;
  precioReferencial?: number;
  icono?: string;
  especialidadNombre: string;
  destacadoEnWeb: boolean;
}
