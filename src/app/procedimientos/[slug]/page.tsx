import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeccionTestimonios } from '../../../features/testimonios/SeccionTestimonios';
import { EncabezadoProcedimiento } from '../../../features/procedimientos/EncabezadoProcedimiento';
import { ContenidoProcedimiento } from '../../../features/procedimientos/ContenidoProcedimiento';
import { CierreProcedimiento } from '../../../features/procedimientos/CierreProcedimiento';
import { jsonLdProcedimiento } from '../../../features/procedimientos/jsonLd';
import { construirMetadata } from '../../../lib/seo';
import { getArticulos, getConfiguracion, getServicio, getServicios, getTestimonios } from '../../../lib/cms';
import { redirigirSiCorresponde } from '../../../lib/redirecciones';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Los procedimientos nuevos creados en el CMS se generan bajo demanda (sin recompilar)
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getServicios()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [config, p] = await Promise.all([getConfiguracion(), getServicio(slug)]);
  if (!p) return { title: 'Procedimiento no encontrado', robots: { index: false } };

  return construirMetadata({
    config,
    ruta: `/procedimientos/${p.slug}`,
    seo: p.seo,
    tituloRespaldo: p.nombre,
    descripcionRespaldo: p.resumen,
  });
}

export default async function ProcedimientoPage({ params }: PageProps) {
  const { slug } = await params;
  const [config, p] = await Promise.all([getConfiguracion(), getServicio(slug)]);
  if (!p) {
    await redirigirSiCorresponde(`/procedimientos/${slug}`);
    notFound();
  }

  const [testimonios, todosArticulos, servicios] = await Promise.all([getTestimonios(p.slug), getArticulos(), getServicios()]);
  const articulos = todosArticulos.filter((a) => a.servicioRelacionado?.slug === p.slug);
  const otros = servicios.filter((o) => o.slug !== p.slug);
  const nombreCorto = p.nombreCorto || p.nombre;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProcedimiento(config, p)) }} />
      <EncabezadoProcedimiento p={p} config={config} />
      <ContenidoProcedimiento p={p} articulos={articulos} />

      {testimonios.length > 0 && (
        <SeccionTestimonios
          testimonios={testimonios}
          idServicio={p.id}
          etiqueta="Experiencias de pacientes"
          titulo={`Pacientes de ${nombreCorto.toLowerCase()}`}
          descripcion="Lo que cuentan quienes ya pasaron por este procedimiento."
        />
      )}

      <CierreProcedimiento slug={p.slug} config={config} otros={otros} />
    </>
  );
}
