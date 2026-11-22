import type { Metadata } from 'next';
import { EncabezadoPagina } from '../../shared/ui/EncabezadoPagina';
import { DatosContacto } from '../../features/contacto/DatosContacto';
import { MapaConsultorio } from '../../features/contacto/MapaConsultorio';
import { construirMetadata, physicianJsonLd } from '../../lib/seo';
import { direccionCompleta } from '../../lib/sitio';
import { getConfiguracion, getPaginaSeo } from '../../lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const [config, pagina] = await Promise.all([getConfiguracion(), getPaginaSeo('contacto')]);
  return construirMetadata({
    config,
    ruta: '/contacto',
    seo: pagina?.seo,
    tituloRespaldo: 'Contacto y ubicación',
    descripcionRespaldo: `Consultorio del ${config.nombreDoctor} en ${direccionCompleta(config)}.`,
  });
}

export default async function ContactoPage() {
  const config = await getConfiguracion();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd(config)) }} />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EncabezadoPagina
            siteUrl={config.siteUrl}
            migas={[{ nombre: 'Contacto', href: '/contacto' }]}
            titulo="Contacto y ubicación"
            descripcion={`Agenda tu cita en línea, llámanos o visítanos en el consultorio en ${config.distrito}.`}
          />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DatosContacto config={config} />
            <MapaConsultorio config={config} />
          </div>
        </div>
      </section>
    </>
  );
}
