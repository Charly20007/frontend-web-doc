import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetalleArticulo } from '../../../features/blog/components/DetalleArticulo';
import { construirMetadata, urlAbsoluta } from '../../../lib/seo';
import { getArticulo, getArticulos, getConfiguracion } from '../../../lib/cms';
import { redirigirSiCorresponde } from '../../../lib/redirecciones';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Los artículos nuevos publicados desde el CMS se generan bajo demanda
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getArticulos()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [config, articulo] = await Promise.all([getConfiguracion(), getArticulo(slug)]);
  if (!articulo) return { title: 'Artículo no encontrado', robots: { index: false } };

  return construirMetadata({
    config,
    ruta: `/blog/${articulo.slug}`,
    seo: { ...articulo.seo, imagenOgUrl: articulo.seo.imagenOgUrl || articulo.imagenPortadaUrl },
    tituloRespaldo: articulo.titulo,
    descripcionRespaldo: articulo.resumen,
    tipo: 'article',
    extraOpenGraph: { publishedTime: articulo.fechaPublicacion, modifiedTime: articulo.fechaModificacion, authors: [articulo.autor] },
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [config, articulo] = await Promise.all([getConfiguracion(), getArticulo(slug)]);
  if (!articulo) {
    await redirigirSiCorresponde(`/blog/${slug}`);
    notFound();
  }

  const url = `${config.siteUrl}/blog/${articulo.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: articulo.titulo,
    description: articulo.seo.metaDescripcion || articulo.resumen,
    image: urlAbsoluta(config, articulo.imagenPortadaUrl),
    author: { '@type': 'Physician', '@id': `${config.siteUrl}/#physician`, name: articulo.autor, url: `${config.siteUrl}/dr-juan-carlos-marcos` },
    publisher: { '@type': 'Organization', name: config.nombreDoctor, logo: { '@type': 'ImageObject', url: `${config.siteUrl}/favicon.svg` } },
    datePublished: articulo.fechaPublicacion,
    dateModified: articulo.fechaModificacion,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    about: { '@type': 'MedicalCondition', name: articulo.categoria.nombre },
    inLanguage: 'es-PE',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DetalleArticulo articulo={articulo} config={config} />
    </>
  );
}
