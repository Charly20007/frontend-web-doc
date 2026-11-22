import type { Metadata } from 'next';
import type { ConfiguracionSitio, Seo } from './cms-tipos';

/** Metadatos y datos estructurados (Schema.org) para Google. */

export const urlAbsoluta = (c: ConfiguracionSitio, ruta?: string | null) =>
  !ruta ? undefined : /^https?:\/\//.test(ruta) ? ruta : encodeURI(`${c.siteUrl}${ruta.startsWith('/') ? '' : '/'}${ruta}`);

const DIAS_SCHEMA = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** Bloque Schema.org Physician reutilizable en varias páginas. */
export const physicianJsonLd = (c: ConfiguracionSitio) => ({
  '@context': 'https://schema.org',
  '@type': 'Physician',
  '@id': `${c.siteUrl}/#physician`,
  name: c.nombreDoctor,
  url: `${c.siteUrl}/dr-juan-carlos-marcos`,
  image: urlAbsoluta(c, c.fotoDoctorUrl),
  telephone: c.telefonoPrincipal ?? undefined,
  email: c.correo ?? undefined,
  medicalSpecialty: ['General Surgery', 'Laparoscopic Surgery', 'Digestive System Surgery'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: c.direccion ?? undefined,
    addressLocality: c.distrito ?? undefined,
    addressRegion: c.region ?? undefined,
    addressCountry: c.pais,
  },
  openingHoursSpecification: c.horarios.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: DIAS_SCHEMA[h.diaSemana],
    opens: h.horaInicio,
    closes: h.horaFin,
  })),
  sameAs: [c.facebookUrl, c.instagramUrl, c.tikTokUrl, c.youTubeUrl, c.linkedInUrl].filter(Boolean),
  priceRange: '$$',
});

/**
 * Metadatos de una página a partir de su SEO del CMS, con respaldo en su nombre/resumen.
 * Si la página no es indexable se marca "noindex".
 */
export function construirMetadata(opciones: {
  config: ConfiguracionSitio;
  ruta: string;
  seo?: Seo | null;
  tituloRespaldo: string;
  descripcionRespaldo?: string | null;
  tipo?: 'website' | 'article' | 'profile';
  /** El título no lleva el sufijo con el nombre del doctor (portada). */
  tituloAbsoluto?: boolean;
  extraOpenGraph?: Record<string, unknown>;
}): Metadata {
  const { config, ruta, seo, tituloRespaldo, descripcionRespaldo, tipo = 'website', tituloAbsoluto, extraOpenGraph } = opciones;
  const titulo = seo?.metaTitulo?.trim() || tituloRespaldo;
  const descripcion = seo?.metaDescripcion?.trim() || descripcionRespaldo || config.metaDescripcionPorDefecto || undefined;
  const url = `${config.siteUrl}${ruta === '/' ? '' : ruta}`;
  const imagen = urlAbsoluta(config, seo?.imagenOgUrl || config.imagenOgPorDefectoUrl);
  const indexable = seo?.indexable ?? true;

  return {
    title: tituloAbsoluto ? { absolute: titulo } : titulo,
    description: descripcion,
    alternates: { canonical: url },
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: {
      type: tipo,
      url,
      title: titulo,
      description: descripcion,
      siteName: config.nombreDoctor,
      locale: 'es_PE',
      images: imagen ? [{ url: imagen, alt: titulo }] : undefined,
      ...extraOpenGraph,
    },
    twitter: { card: 'summary_large_image', title: titulo, description: descripcion, images: imagen ? [imagen] : undefined },
  };
}

