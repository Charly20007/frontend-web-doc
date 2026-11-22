import type { Metadata } from 'next';
import { PerfilDoctor } from '../../features/medico/PerfilDoctor';
import { SeccionTestimonios } from '../../features/testimonios/SeccionTestimonios';
import { ProcedimientosDelDoctor } from '../../features/medico/ProcedimientosDelDoctor';
import { LlamadoConsulta } from '../../features/medico/LlamadoConsulta';
import { jsonLdPerfil } from '../../features/medico/jsonLd';
import { EncabezadoPagina } from '../../compartido/ui/EncabezadoPagina';
import { construirMetadata } from '../../lib/seo';
import { getConfiguracion, getPaginaSeo, getServicios, getTestimonios } from '../../lib/cms';

const RUTA = '/dr-juan-carlos-marcos';

export async function generateMetadata(): Promise<Metadata> {
  const [config, pagina] = await Promise.all([getConfiguracion(), getPaginaSeo('perfil-doctor')]);
  return construirMetadata({
    config,
    ruta: RUTA,
    seo: pagina?.seo,
    tituloRespaldo: config.nombreDoctor,
    descripcionRespaldo: config.especialidad,
    tipo: 'profile',
    // El título ya incluye el nombre del doctor: sin sufijo para no repetirlo
    tituloAbsoluto: true,
  });
}

export default async function PerfilDoctorPage() {
  const [config, procedimientos, testimonios] = await Promise.all([getConfiguracion(), getServicios(), getTestimonios()]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerfil(config, procedimientos)) }} />
      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EncabezadoPagina
            siteUrl={config.siteUrl}
            migas={[{ nombre: 'El especialista', href: RUTA }]}
            titulo={config.nombreDoctor}
            descripcion={`Cirujano general y del aparato digestivo${config.ciudad ? ` en ${config.ciudad}` : ''}`}
            destacada
          />
        </div>
      </section>
      <PerfilDoctor config={config} />
      <ProcedimientosDelDoctor procedimientos={procedimientos} />
      <SeccionTestimonios testimonios={testimonios} />
      <LlamadoConsulta />
    </>
  );
}
