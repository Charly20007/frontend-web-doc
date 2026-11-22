import type { Metadata } from 'next';
import { construirMetadata, physicianJsonLd } from '../lib/seo';
import { getArticulos, getConfiguracion, getPaginaSeo, getServicios, getTestimonios } from '../lib/cms';
import { HeroInicio } from '../features/inicio/components/HeroInicio';
import { FranjaConfianza } from '../features/inicio/components/FranjaConfianza';
import { ProcedimientosInicio } from '../features/inicio/components/ProcedimientosInicio';
import { SobreDoctor } from '../features/inicio/components/SobreDoctor';
import { BlogInicio } from '../features/inicio/components/BlogInicio';
import { UbicacionInicio } from '../features/inicio/components/UbicacionInicio';
import { CtaFinal } from '../features/inicio/components/CtaFinal';
import { SeccionTestimonios } from '../features/testimonios/components/SeccionTestimonios';

export async function generateMetadata(): Promise<Metadata> {
  const [config, pagina] = await Promise.all([getConfiguracion(), getPaginaSeo('inicio')]);
  return construirMetadata({
    config,
    ruta: '/',
    seo: pagina?.seo,
    tituloRespaldo: config.metaTituloPorDefecto || config.nombreDoctor,
    tituloAbsoluto: true,
  });
}

export default async function HomePage() {
  const [config, servicios, testimonios, articulos] = await Promise.all([getConfiguracion(), getServicios(), getTestimonios(), getArticulos()]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd(config)) }} />
      <HeroInicio config={config} />
      <FranjaConfianza config={config} />
      <ProcedimientosInicio servicios={servicios.filter((s) => s.destacadoEnWeb)} />
      <SeccionTestimonios testimonios={testimonios.slice(0, 3)} etiqueta="Testimonios" titulo="Lo que dicen nuestros pacientes" descripcion="Experiencias de pacientes que confiaron en nosotros." />
      <SobreDoctor config={config} />
      <UbicacionInicio config={config} />
      <BlogInicio articulos={articulos.slice(0, 3)} />
      <CtaFinal />
    </>
  );
}
