import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import type { ConfiguracionSitio } from '../../lib/cms-tipos';
import { formatearTelefono, telHref } from '../../lib/formato';
import { agruparHorarios, direccionCompleta } from '../../lib/sitio';
import { Encabezado } from './Encabezado';

export const UbicacionInicio: React.FC<{ config: ConfiguracionSitio }> = ({ config }) => {
  const direccion = direccionCompleta(config);
  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        <div>
          <Encabezado antetitulo="Ubicación" titulo="Visítanos en el consultorio" />
          <dl className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <dt className="w-11 h-11 shrink-0 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center"><MapPin className="w-5 h-5" /><span className="sr-only">Dirección</span></dt>
              <dd className="text-slate-700 pt-2.5">{direccion}</dd>
            </div>
            <div className="flex items-start gap-4">
              <dt className="w-11 h-11 shrink-0 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center"><Clock className="w-5 h-5" /><span className="sr-only">Horario</span></dt>
              <dd className="pt-2.5 space-y-1">
                {agruparHorarios(config).map((h) => (
                  <p key={h.dias} className="text-slate-700"><span className="font-semibold text-navy-900">{h.dias}:</span> {h.horas}</p>
                ))}
              </dd>
            </div>
            {config.telefonoPrincipal && (
              <div className="flex items-start gap-4">
                <dt className="w-11 h-11 shrink-0 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center"><Phone className="w-5 h-5" /><span className="sr-only">Teléfono</span></dt>
                <dd className="pt-2.5"><a href={telHref(config.telefonoPrincipal)} className="font-semibold text-navy-900 hover:text-medical-700">{formatearTelefono(config.telefonoPrincipal)}</a></dd>
              </div>
            )}
          </dl>
          {config.googleMapsUrl && (
            <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block font-bold text-medical-700 hover:text-medical-800">
              Cómo llegar en Google Maps →
            </a>
          )}
        </div>
        <div className="rounded-3xl overflow-hidden border border-slate-200 min-h-[320px] bg-slate-100">
          <iframe
            title={`Mapa: ${direccion}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`}
            className="w-full h-full min-h-[320px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
