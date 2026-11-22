import type { Metadata } from 'next';
import { ListaArticulos } from '../../features/blog/components/ListaArticulos';
import { construirMetadata } from '../../lib/seo';
import { getArticulos, getConfiguracion, getPaginaSeo } from '../../lib/cms';
import { aResumen } from '../../features/blog/tipos';

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
  // Solo el resumen: el listado es interactivo (búsqueda) y no necesita el texto completo
  return <ListaArticulos articulos={(await getArticulos()).map(aResumen)} />;
}
