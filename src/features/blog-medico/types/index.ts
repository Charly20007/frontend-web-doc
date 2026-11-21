import type { Seo } from '../../../lib/cms-tipos';

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
  imagenPortadaUrl?: string | null;
  categoria: CategoriaBlog;
  servicioRelacionado?: { id: number; nombre: string; slug: string } | null;
  /** Fecha ISO tal como llega de la API */
  fechaPublicacion: string;
  /** "02 de Julio, 2026" */
  fechaPublicacionTexto: string;
  fechaModificacion: string;
  autor: string;
  tiempoLectura: number;
  vistas: number;
  publicadoEnWeb: boolean;
  seo: Seo;
}
