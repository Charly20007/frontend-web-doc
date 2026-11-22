import React from 'react';
import { Clock } from 'lucide-react';
import { BotonCita } from '../../shared/ui/BotonCita';
import { MigasDePan } from '../../shared/ui/MigasDePan';
import { formatearTelefono, telHref } from '../../lib/formato';
import type { ConfiguracionSitio, ServicioDetalle } from '../../lib/cms-tipos';

/** Cabecera del procedimiento: migas, nombre, resumen, duración, precio y botones de contacto. */
export const EncabezadoProcedimiento: React.FC<{ p: ServicioDetalle; config: ConfiguracionSitio }> = ({ p, config }) => {
  const SITE_URL = config.siteUrl;
  const nombreCorto = p.nombreCorto || p.nombre;
  return (
    <section className="pt-8 pb-12 bg-slate-100/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <MigasDePan siteUrl={SITE_URL} items={[{ nombre: 'Procedimientos', href: '/procedimientos' }, { nombre: nombreCorto, href: `/procedimientos/${p.slug}` }]} />

        <span className="mt-6 inline-block text-xs font-semibold px-3 py-1 rounded-full bg-medical-500/10 text-medical-600 border border-medical-500/20">
          {p.especialidadNombre}
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {p.nombre}
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-3xl">{p.resumen}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-medical-500" /> Duración aprox.: {p.tiempoEstimadoMinutos} min
          </span>
          {p.precioReferencial && (
            <span>
              Inversión referencial:{' '}
              <strong className="text-slate-900">S/ {p.precioReferencial.toLocaleString('es-PE')}</strong>
            </span>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <BotonCita servicioSlug={p.slug}>Agendar evaluación</BotonCita>
          {config.telefonoPrincipal && <a
            href={telHref(config.telefonoPrincipal)}
            className="inline-flex items-center px-6 py-3.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-700 hover:bg-white transition-colors"
          >
            Llamar: {formatearTelefono(config.telefonoPrincipal)}
          </a>}
        </div>
      </div>
    </section>
  );
};
