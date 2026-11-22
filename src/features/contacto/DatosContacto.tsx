import React from 'react';
import { AlertTriangle, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BotonCita } from '../../compartido/ui/BotonCita';
import { formatearTelefono, telHref, whatsappHref } from '../../lib/formato';
import { agruparHorarios, direccionCompleta, numeroWhatsapp } from '../../lib/sitio';
import type { ConfiguracionSitio } from '../../lib/cms-tipos';

/** Dirección, teléfonos, correo, WhatsApp y horarios del consultorio (todo desde el CMS). */
export const DatosContacto: React.FC<{ config: ConfiguracionSitio }> = ({ config }) => {
  const direccion = direccionCompleta(config);
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-3xl p-7 space-y-5">
        <h2 className="text-xl font-bold text-slate-900">Consultorio</h2>
        <p className="flex items-start gap-3 text-slate-700">
          <MapPin className="w-5 h-5 shrink-0 text-medical-500 mt-0.5" />
          <span>{direccion}</span>
        </p>
        <p className="flex items-center gap-3 text-slate-700">
          <Phone className="w-5 h-5 shrink-0 text-medical-500" />
          <span>
            <a href={telHref(config.telefonoPrincipal)} className="font-semibold hover:underline">{formatearTelefono(config.telefonoPrincipal)}</a>
            {config.telefonoSecundario && (
              <>
                {' / '}
                <a href={telHref(config.telefonoSecundario)} className="font-semibold hover:underline">{formatearTelefono(config.telefonoSecundario)}</a>
              </>
            )}
          </span>
        </p>
        <p className="flex items-center gap-3 text-slate-700">
          <Mail className="w-5 h-5 shrink-0 text-medical-500" />
          <a href={`mailto:${config.correo}`} className="font-semibold hover:underline">{config.correo}</a>
        </p>
        {numeroWhatsapp(config) && (
          <a href={whatsappHref(numeroWhatsapp(config))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold">
            Escribir por WhatsApp
          </a>
        )}
        {config.googleMapsUrl && (
          <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block text-sm font-semibold text-medical-600 hover:underline">
            Cómo llegar (Google Maps)
          </a>
        )}
      </div>

      <div className="glass-card rounded-3xl p-7">
        <h2 className="text-xl font-bold text-slate-900">Horarios de atención</h2>
        <dl className="mt-4 divide-y divide-slate-200 text-sm">
          {agruparHorarios(config).map((h) => (
            <div key={h.dias} className="flex justify-between gap-4 py-2.5">
              <dt className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-medical-500" /> {h.dias}
              </dt>
              <dd className="font-semibold text-slate-900 text-right">{h.horas}</dd>
            </div>
          ))}
        </dl>
        {config.mostrarEmergencias && config.textoEmergencias && (
          <p className="mt-4 flex items-start gap-2 text-sm text-red-700">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{config.textoEmergencias}{config.telefonoPrincipal && <>. Llama al {formatearTelefono(config.telefonoPrincipal)}.</>}</span>
          </p>
        )}
      </div>

      <BotonCita>Agendar cita en línea</BotonCita>
    </div>
  );
};
