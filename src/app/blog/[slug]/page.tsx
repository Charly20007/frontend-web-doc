import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticuloBySlug, getArticulosBlog } from '../../../features/blog-medico/services/blogService';
import { ArticleDetailClient } from '../../../features/blog-medico/components/ArticleDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articulos = await getArticulosBlog();
  return articulos.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const articulo = await getArticuloBySlug(slug);

  if (!articulo) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  const url = `https://cirujanogeneral.pe/blog/${articulo.slug}`;
  const ogImage = articulo.imagenPortadaUrl 
    ? (articulo.imagenPortadaUrl.startsWith('http') ? articulo.imagenPortadaUrl : `https://cirujanogeneral.pe${articulo.imagenPortadaUrl}`)
    : 'https://cirujanogeneral.pe/WhatsApp Image 2026-07-02 at 12.36.06 PM (2).jpeg';

  return {
    title: articulo.titulo,
    description: articulo.resumen,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: articulo.titulo,
      description: articulo.resumen,
      url,
      type: 'article',
      publishedTime: articulo.fechaPublicacion,
      authors: [articulo.autor],
      images: [
        {
          url: ogImage,
          alt: articulo.titulo,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: articulo.titulo,
      description: articulo.resumen,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articulo = await getArticuloBySlug(slug);

  if (!articulo) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: articulo.titulo,
    description: articulo.resumen,
    author: {
      '@type': 'Physician',
      name: articulo.autor,
      url: 'https://cirujanogeneral.pe',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dr. Juan Carlos Marcos Enriquez',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cirujanogeneral.pe/favicon.svg',
      },
    },
    datePublished: articulo.fechaPublicacion,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cirujanogeneral.pe/blog/${articulo.slug}`,
    },
    about: {
      '@type': 'MedicalCondition',
      name: articulo.categoria.nombre,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetailClient articulo={articulo} />
    </>
  );
}

