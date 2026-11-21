import type { Metadata } from 'next';
import type { ConfiguracionSitio, Seo } from '../lib/cms-tipos';

/**
 * Utilidades para los datos del consultorio. Los datos en sí se editan en el CMS
 * (Datos del consultorio) y llegan desde la API con getConfiguracion().
 */

/** Foto principal del doctor (portada y perfil), editable en el CMS. */
export const FOTO_DOCTOR_RESPALDO = '/imagenes/dr-juan-carlos-marcos-cirujano.jpg';
export const fotoDoctor = (c: ConfiguracionSitio) => c.fotoDoctorUrl || FOTO_DOCTOR_RESPALDO;

export const nombreMarca = (c: ConfiguracionSitio) => c.nombreCorto || c.nombreDoctor;

export const direccionCompleta = (c: ConfiguracionSitio) =>
  [c.direccion, c.distrito, c.ciudad].filter(Boolean).join(', ');

/** "+51 1 999 8887" → "tel:+5119998887" */
export const telHref = (telefono?: string | null) => (telefono ? `tel:${telefono.replace(/[^\d+]/g, '')}` : undefined);

/**
 * Muestra los números peruanos en el formato que la gente reconoce:
 * "+5119998887" → "(01) 999-8887" · "+51987654321" → "987 654 321".
 * Cualquier otro formato se deja como está.
 */
export function formatearTelefono(telefono?: string | null): string {
  if (!telefono) return '';
  let d = telefono.replace(/\D/g, '');
  if (d.startsWith('51') && (d.length === 11 || d.length === 10)) d = d.slice(2);
  if (d.length === 9 && d.startsWith('9')) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  if (d.length === 8 && d.startsWith('1')) return `(01) ${d.slice(1, 4)}-${d.slice(4)}`;
  return telefono;
}

/** Número de WhatsApp: el configurado, o el celular si el secundario es un móvil peruano. */
export function numeroWhatsapp(c: ConfiguracionSitio): string | null {
  if (c.whatsApp) return c.whatsApp;
  const d = (c.telefonoSecundario ?? '').replace(/\D/g, '').replace(/^51(?=9\d{8}$)/, '');
  return /^9\d{8}$/.test(d) ? `+51${d}` : null;
}

/** "+51 987 654 321" → "https://wa.me/51987654321" */
export const whatsappHref = (telefono?: string | null) => (telefono ? `https://wa.me/${telefono.replace(/\D/g, '')}` : undefined);

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

const DIAS = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

/**
 * Agrupa los tramos por día y une los días consecutivos con el mismo horario:
 * [{ dias: 'Lunes - Viernes', horas: '09:00 - 13:00 / 16:00 - 20:00' }, ...]
 */
export function agruparHorarios(c: ConfiguracionSitio): { dias: string; horas: string }[] {
  const porDia = new Map<number, string>();
  for (const h of [...c.horarios].sort((a, b) => a.diaSemana - b.diaSemana || a.horaInicio.localeCompare(b.horaInicio))) {
    const tramo = `${h.horaInicio} - ${h.horaFin}`;
    porDia.set(h.diaSemana, porDia.has(h.diaSemana) ? `${porDia.get(h.diaSemana)} / ${tramo}` : tramo);
  }
  const grupos: { desde: number; hasta: number; horas: string }[] = [];
  for (const [dia, horas] of porDia) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.horas === horas && ultimo.hasta === dia - 1) ultimo.hasta = dia;
    else grupos.push({ desde: dia, hasta: dia, horas });
  }
  return grupos.map((g) => ({ dias: g.desde === g.hasta ? DIAS[g.desde] : `${DIAS[g.desde]} - ${DIAS[g.hasta]}`, horas: g.horas }));
}
