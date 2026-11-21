import type { Metadata } from 'next';
import { BlogList } from '../../features/blog-medico/components/BlogList';
import { construirMetadata } from '../../config/site';
import { getArticulos, getConfiguracion, getPaginaSeo } from '../../lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const [config, pagina] = await Promise.all([getConfiguracion(), getPaginaSeo('blog')]);
  return construirMetadata({
    config,
    ruta: '/blog',
    seo: pagina?.seo,
    tituloRespaldo: 'Blog médico',
    descripcionRespaldo: 'Síntomas, prevención, tratamientos y cuidados postoperatorios en cirugía digestiva y laparoscópica.',
  });
}

export default async function BlogPage() {
  return <BlogList articulos={await getArticulos()} />;
}
