import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MigasDePan } from '../ui/MigasDePan';
import { construirMetadata } from '../../lib/seo';
import { getConfiguracion, getPaginaLegal } from '../../lib/cms';
import { formatearFecha } from '../../lib/formato';

/** Metadatos de una página legal editada en el CMS. */
export async function metadataLegal(clave: string): Promise<Metadata> {
  const [config, pagina] = await Promise.all([getConfiguracion(), getPaginaLegal(clave)]);
  if (!pagina) return { title: 'Página no encontrada', robots: { index: false } };
  return construirMetadata({ config, ruta: pagina.ruta, seo: pagina.seo, tituloRespaldo: pagina.titulo, descripcionRespaldo: pagina.titulo });
}

/** Página legal (privacidad, términos, consentimiento) con contenido del CMS. */
export async function PaginaLegalVista({ clave }: { clave: string }) {
  const [config, pagina] = await Promise.all([getConfiguracion(), getPaginaLegal(clave)]);
  if (!pagina) notFound();

  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <MigasDePan siteUrl={config.siteUrl} items={[{ nombre: pagina.titulo, href: pagina.ruta }]} />
        <h1 className="mt-6 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">{pagina.titulo}</h1>
        <p className="mt-2 text-sm text-slate-500">Última actualización: {formatearFecha(pagina.fechaModificacion)}</p>
        {/* Contenido escrito por el administrador desde el CMS */}
        <div className="contenido-html mt-8 text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: pagina.contenidoHtml }} />
      </div>
    </section>
  );
}
