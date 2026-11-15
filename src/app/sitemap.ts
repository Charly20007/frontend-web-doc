import type { MetadataRoute } from 'next';
import { getArticulosBlog } from '../features/blog-medico/services/blogService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cirujanogeneral.pe';

  // Rutas estáticas principales
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Rutas dinámicas de artículos del blog
  try {
    const articulos = await getArticulosBlog();
    const blogRoutes: MetadataRoute.Sitemap = articulos.map((art) => ({
      url: `${baseUrl}/blog/${art.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    return [...routes, ...blogRoutes];
  } catch {
    return routes;
  }
}

