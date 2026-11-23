// Tipos de la API .NET tal como los consume la web pública

export interface Seo {
  metaTitulo?: string | null;
  metaDescripcion?: string | null;
  imagenOgUrl?: string | null;
  indexable: boolean;
}

export interface Horario {
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
}

export interface ConfiguracionSitio {
  nombreDoctor: string;
  nombreCorto?: string | null;
  especialidad?: string | null;
  cmp?: string | null;
  rne?: string | null;
  fotoDoctorUrl?: string | null;
  segurosAliados?: string | null;
  telefonoPrincipal?: string | null;
  telefonoSecundario?: string | null;
  whatsApp?: string | null;
  correo?: string | null;
  direccion?: string | null;
  distrito?: string | null;
  ciudad?: string | null;
  region?: string | null;
  pais: string;
  googleMapsUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  tikTokUrl?: string | null;
  youTubeUrl?: string | null;
  linkedInUrl?: string | null;
  siteUrl: string;
  metaTituloPorDefecto?: string | null;
  metaDescripcionPorDefecto?: string | null;
  imagenOgPorDefectoUrl?: string | null;
  googleSiteVerification?: string | null;
  googleAnalyticsId?: string | null;
  descripcionPie?: string | null;
  mostrarEmergencias: boolean;
  textoEmergencias?: string | null;
  /** Reserva en una clínica externa (ej.: SANNA), además del consultorio. */
  reservaClinicaActiva?: boolean;
  reservaClinicaNombre?: string | null;
  reservaClinicaUrl?: string | null;
  reservaClinicaTelefono?: string | null;
  reservaClinicaTextoBusqueda?: string | null;
  horarios: Horario[];
}

export interface PaginaLegalResumen {
  clave: string;
  ruta: string;
  titulo: string;
  fechaModificacion: string;
}

export interface PaginaLegal extends PaginaLegalResumen {
  contenidoHtml: string;
  seo: Seo;
}

export interface ContenidoItem {
  titulo?: string | null;
  texto: string;
}

export interface Servicio {
  id: number;
  nombre: string;
  nombreCorto?: string | null;
  slug: string;
  resumen: string;
  tiempoEstimadoMinutos: number;
  precioReferencial?: number | null;
  icono?: string | null;
  especialidadNombre: string;
  destacadoEnWeb: boolean;
  orden: number;
  indexable: boolean;
  fechaModificacion: string;
}

export interface ServicioDetalle extends Servicio {
  condicionTratada?: string | null;
  tituloIndicaciones?: string | null;
  seo: Seo;
  introduccion: ContenidoItem[];
  indicaciones: ContenidoItem[];
  pasos: ContenidoItem[];
  recuperacion: ContenidoItem[];
  preguntas: ContenidoItem[];
}

export interface Testimonio {
  id: number;
  nombrePaciente: string;
  procedimiento: string;
  procedimientoSlug?: string | null;
  calificacionEstrellas: number;
  comentario: string;
  fechaTestimonio: string;
}

export interface PaginaSeo {
  clave: string;
  ruta: string;
  nombrePagina: string;
  /** Textos visibles editados en el CMS; vacío = texto por defecto de la web */
  titulo?: string | null;
  descripcion?: string | null;
  tituloSecundario?: string | null;
  seo: Seo;
  fechaModificacion: string;
}

export interface Redireccion {
  rutaOrigen: string;
  rutaDestino: string;
  esPermanente: boolean;
}
