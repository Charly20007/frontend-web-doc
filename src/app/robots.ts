import type { MetadataRoute } from 'next';
import { getConfiguracion } from '../lib/cms';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getConfiguracion();
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
