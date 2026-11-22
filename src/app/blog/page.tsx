import type { Metadata } from 'next';
import { EncabezadoPagina } from '../../shared/ui/EncabezadoPagina';
import { ListaArticulos } from '../../features/blog/ListaArticulos';
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
  const [config, articulos, pagina] = await Promise.all([getConfiguracion(), getArticulos(), getPaginaSeo('blog')]);

  return (
    <section className="py-10 pb-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EncabezadoPagina
          siteUrl={config.siteUrl}
          migas={[{ nombre: 'Blog', href: '/blog' }]}
          titulo={pagina?.titulo || 'Blog de salud digestiva'}
          descripcion={pagina?.descripcion || 'Síntomas, prevención y cuidados antes y después de una cirugía, explicados con claridad.'}
        />
        {/* Solo el resumen: el listado es interactivo (búsqueda) y no necesita el texto completo */}
        <ListaArticulos articulos={articulos.map(aResumen)} tituloLateral={pagina?.tituloSecundario || 'También te puede interesar'} />
      </div>
    </section>
  );
}
