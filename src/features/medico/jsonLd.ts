import { physicianJsonLd } from '../../lib/seo';
import type { ConfiguracionSitio, Servicio } from '../../lib/cms-tipos';

/** Schema.org Physician del perfil, con colegiatura (CMP/RNE) y los procedimientos que realiza. */
export const jsonLdPerfil = (config: ConfiguracionSitio, procedimientos: Servicio[]) => ({
  ...physicianJsonLd(config),
  description: config.especialidad ?? undefined,
  identifier: [
    config.cmp && { '@type': 'PropertyValue', propertyID: 'CMP', value: config.cmp },
    config.rne && { '@type': 'PropertyValue', propertyID: 'RNE', value: config.rne },
  ].filter(Boolean),
  availableService: procedimientos.map((p) => ({
    '@type': 'MedicalProcedure',
    name: p.nombre,
    url: `${config.siteUrl}/procedimientos/${p.slug}`,
  })),
});
