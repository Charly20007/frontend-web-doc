import type { MetadataRoute } from 'next';
import { getArticulos, getConfiguracion, getPaginasLegales, getPaginasSeo, getServicios } from '../lib/cms';

/**
 * sitemap.xml generado desde el CMS: solo incluye las páginas marcadas
 * "Mostrar en Google" y usa su fecha de última modificación.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [config, paginas, servicios, articulos, legales] = await Promise.all([getConfiguracion(), getPaginasSeo(), getServicios(), getArticulos(), getPaginasLegales()]);
  const base = config.siteUrl;

  const prioridad: Record<string, number> = { inicio: 1, procedimientos: 0.9, blog: 0.8, 'perfil-doctor': 0.8, contacto: 0.7 };
  const fijas: MetadataRoute.Sitemap = paginas
    .filter((p) => p.seo.indexable)
    .map((p) => ({
      url: `${base}${p.ruta === '/' ? '' : p.ruta}`,
      lastModified: new Date(p.fechaModificacion),
      changeFrequency: p.clave === 'blog' ? 'weekly' : 'monthly',
      priority: prioridad[p.clave] ?? 0.6,
    }));

  const procedimientos: MetadataRoute.Sitemap = servicios
    .filter((s) => s.indexable)
    .map((s) => ({ url: `${base}/procedimientos/${s.slug}`, lastModified: new Date(s.fechaModificacion), changeFrequency: 'monthly', priority: 0.9 }));

  const blog: MetadataRoute.Sitemap = articulos
    .filter((a) => a.seo.indexable)
    .map((a) => ({ url: `${base}/blog/${a.slug}`, lastModified: new Date(a.fechaModificacion), changeFrequency: 'monthly', priority: 0.7 }));

  const paginasLegales: MetadataRoute.Sitemap = legales.map((l) => ({
    url: `${base}${l.ruta}`, lastModified: new Date(l.fechaModificacion), changeFrequency: 'yearly', priority: 0.2,
  }));

  return [...fijas, ...procedimientos, ...blog, ...paginasLegales];
}
