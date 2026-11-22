import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { MigasDePan } from '../../components/ui/MigasDePan';
import { BotonCita } from '../../components/ui/BotonCita';
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
  const [config, PROCEDIMIENTOS] = await Promise.all([getConfiguracion(), getServicios()]);
  const SITE_URL = config.siteUrl;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: PROCEDIMIENTOS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.nombre,
      url: `${SITE_URL}/procedimientos/${p.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MigasDePan siteUrl={SITE_URL} items={[{ nombre: 'Procedimientos', href: '/procedimientos' }]} />

          <div className="mt-6 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Procedimientos quirúrgicos
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Cirugía general y del aparato digestivo con técnicas de mínima invasión: menos dolor, cicatrices pequeñas y
              una recuperación más rápida. Elige un procedimiento para conocer síntomas, cómo es la cirugía y la recuperación.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCEDIMIENTOS.map((p) => (
              <li key={p.slug} className="glass-card rounded-3xl p-7 flex flex-col">
                <span className="self-start text-xs font-semibold px-3 py-1 rounded-full bg-slate-200 text-slate-700">
                  {p.especialidadNombre}
                </span>
                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  <Link href={`/procedimientos/${p.slug}`} className="hover:text-medical-600">
                    {p.nombre}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-grow">{p.resumen}</p>
                <div className="mt-5 flex items-center text-xs text-slate-500">
                  <Clock className="w-4 h-4 mr-1.5 text-medical-500" /> ~{p.tiempoEstimadoMinutos} min
                </div>
                <Link
                  href={`/procedimientos/${p.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-medical-600 hover:underline underline-offset-4"
                >
                  Ver detalles <ArrowRight className="w-4 h-4" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">¿No sabes qué procedimiento necesitas?</p>
            <BotonCita servicioSlug="consulta-valoracion-quirurgica">Agendar consulta de valoración</BotonCita>
          </div>
        </div>
      </section>
    </>
  );
}
