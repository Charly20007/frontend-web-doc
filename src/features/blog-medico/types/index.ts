export interface CategoriaBlog {
  id: number;
  nombre: string;
  slug: string;
}

export interface ArticuloMedico {
  id: number;
  titulo: string;
  slug: string;
  resumen: string;
  contenidoHtml: string;
  imagenPortadaUrl?: string;
  categoria: CategoriaBlog;
  fechaPublicacion: string;
  autor: string;
  tiempoLectura: number; // minutos estimados
  vistas: number;
  publicadoEnWeb: boolean;
}
