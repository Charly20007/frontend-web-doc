import type { Metadata } from 'next';
import { EncabezadoPagina } from '../../shared/ui/EncabezadoPagina';
import { ListaProcedimientos } from '../../features/procedimientos/ListaProcedimientos';
import { jsonLdListaProcedimientos } from '../../features/procedimientos/jsonLd';
import { construirMetadata } from '../../lib/seo';
import { getConfiguracion, getPaginaSeo, getServicios } from '../../lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const [config, pagina] = await Promise.all([getConfiguracion(), getPaginaSeo('procedimientos')]);
  return construirMetadata({
    config,
    ruta: '/procedimientos',
    seo: pagina?.seo,
    tituloRespaldo: 'Procedimientos quirúrgicos',
    descripcionRespaldo: 'Cirugía general y del aparato digestivo con técnicas de mínima invasión.',
  });
}

export default async function ProcedimientosPage() {
  const [config, procedimientos] = await Promise.all([getConfiguracion(), getServicios()]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdListaProcedimientos(config, procedimientos)) }} />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EncabezadoPagina
            siteUrl={config.siteUrl}
            migas={[{ nombre: 'Procedimientos', href: '/procedimientos' }]}
            titulo="Procedimientos quirúrgicos"
            descripcion="Cirugía general y del aparato digestivo con técnicas de mínima invasión: menos dolor, cicatrices pequeñas y una recuperación más rápida. Elige un procedimiento para conocer síntomas, cómo es la cirugía y la recuperación."
          />
          <ListaProcedimientos procedimientos={procedimientos} />
        </div>
      </section>
    </>
  );
}
