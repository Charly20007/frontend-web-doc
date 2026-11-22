import { API_URL } from '../config/api';
import type { ConfiguracionSitio, PaginaLegal, PaginaLegalResumen, PaginaSeo, Redireccion, Servicio, ServicioDetalle, Testimonio } from './cms-tipos';
import type { ArticuloMedico } from '../features/blog/tipos';
import { formatearFecha } from './formato';

/**
 * Acceso a la API desde el servidor de Next.
 * Todas las respuestas se cachean con la etiqueta "cms": cuando se guarda algo en el CMS,
 * la API llama a /api/revalidate y la web vuelve a pedir los datos.
 * Como respaldo, se refrescan solos cada hora.
 */
export const ETIQUETA_CMS = 'cms';

async function apiGet<T>(ruta: string): Promise<T | null> {
  const res = await fetch(`${API_URL}${ruta}`, { next: { tags: [ETIQUETA_CMS], revalidate: 3600 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`La API respondió ${res.status} en ${ruta}`);
  return (await res.json()) as T;
}

export async function getConfiguracion(): Promise<ConfiguracionSitio> {
  const config = await apiGet<ConfiguracionSitio>('/api/configuracion');
  if (!config) throw new Error('La configuración del sitio no existe en la base de datos (revise que la API haya aplicado las migraciones y cargado los datos iniciales).');
  return { ...config, siteUrl: config.siteUrl.replace(/\/$/, '') };
}

export const getServicios = async () => (await apiGet<Servicio[]>('/api/servicios')) ?? [];

export const getServicio = (slug: string) => apiGet<ServicioDetalle>(`/api/servicios/slug/${encodeURIComponent(slug)}`);

export const getTestimonios = async (servicioSlug?: string) =>
  (await apiGet<Testimonio[]>(`/api/testimonios${servicioSlug ? `?servicio=${encodeURIComponent(servicioSlug)}` : ''}`)) ?? [];

export const getPaginaSeo = (clave: string) => apiGet<PaginaSeo>(`/api/seo/paginas/${clave}`);

export const getPaginasSeo = async () => (await apiGet<PaginaSeo[]>('/api/seo/paginas')) ?? [];

export const getPaginasLegales = async () => (await apiGet<PaginaLegalResumen[]>('/api/paginas-legales')) ?? [];

export const getPaginaLegal = (clave: string) => apiGet<PaginaLegal>(`/api/paginas-legales/${clave}`);

export const getRedirecciones = async () => (await apiGet<Redireccion[]>('/api/seo/redirecciones')) ?? [];

type ArticuloApi = Omit<ArticuloMedico, 'fechaPublicacionTexto'>;
const normalizarArticulo = (a: ArticuloApi): ArticuloMedico => ({ ...a, fechaPublicacionTexto: formatearFecha(a.fechaPublicacion) });

export async function getArticulos(): Promise<ArticuloMedico[]> {
  return ((await apiGet<ArticuloApi[]>('/api/blog/articulos')) ?? []).map(normalizarArticulo);
}

export async function getArticulo(slug: string): Promise<ArticuloMedico | null> {
  const a = await apiGet<ArticuloApi>(`/api/blog/articulos/${encodeURIComponent(slug)}`);
  return a ? normalizarArticulo(a) : null;
}

/** Busca una redirección activa para la ruta pedida (URLs antiguas). */
export async function buscarRedireccion(ruta: string): Promise<Redireccion | null> {
  const normalizada = decodeURIComponent(ruta).toLowerCase().replace(/\/+$/, '') || '/';
  return (await getRedirecciones()).find((r) => r.rutaOrigen === normalizada) ?? null;
}
