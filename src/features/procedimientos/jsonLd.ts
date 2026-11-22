import type { ConfiguracionSitio, Servicio, ServicioDetalle } from '../../lib/cms-tipos';

/** Datos estructurados de la página de un procedimiento: MedicalWebPage y, si hay, FAQPage. */
export function jsonLdProcedimiento(config: ConfiguracionSitio, p: ServicioDetalle) {
  const SITE_URL = config.siteUrl;
  const metaTitulo = p.seo.metaTitulo || p.nombre;
  const metaDescripcion = p.seo.metaDescripcion || p.resumen;
  const url = `${SITE_URL}/procedimientos/${p.slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      '@id': url,
      url,
      name: metaTitulo,
      description: metaDescripcion,
      inLanguage: 'es-PE',
      reviewedBy: { '@id': `${SITE_URL}/#physician` },
      about: {
        '@type': 'MedicalProcedure',
        name: p.nombre,
        procedureType: 'https://schema.org/SurgicalProcedure',
        ...(p.condicionTratada && {
          indication: { '@type': 'MedicalCondition', name: p.condicionTratada },
        }),
      },
      provider: {
        '@type': 'Physician',
        '@id': `${SITE_URL}/#physician`,
        name: config.nombreDoctor,
        url: `${SITE_URL}/dr-juan-carlos-marcos`,
      },
    },
    ...(p.preguntas.length === 0 ? [] : [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.preguntas.map((q) => ({
        '@type': 'Question',
        name: q.titulo,
        acceptedAnswer: { '@type': 'Answer', text: q.texto },
      })),
    },
    ]),
  ];
}

/** Lista de procedimientos (ItemList) para la página /procedimientos. */
export const jsonLdListaProcedimientos = (config: ConfiguracionSitio, procedimientos: Servicio[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: procedimientos.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.nombre,
    url: `${config.siteUrl}/procedimientos/${p.slug}`,
  })),
});
