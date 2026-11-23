'use client';

import React, { useState } from 'react';
import { Check, ClipboardCopy, ExternalLink, Phone } from 'lucide-react';
import type { ConfiguracionSitio } from '../../lib/cms-tipos';
import { enlaceClinica, formatearTelefono, telHref } from '../../lib/formato';
import { claseBotonPrincipal } from '../../shared/ui/Formulario';

/** Datos de la clínica externa, o null si la opción está apagada o incompleta. */
export const clinicaDeReserva = (config: ConfiguracionSitio) =>
  config.reservaClinicaActiva && config.reservaClinicaUrl
    ? {
        nombre: config.reservaClinicaNombre || 'la clínica',
        url: enlaceClinica(config.reservaClinicaUrl, config.reservaClinicaTextoBusqueda),
        telefono: config.reservaClinicaTelefono,
        buscar: config.reservaClinicaTextoBusqueda?.trim() || null,
      }
    : null;

type Clinica = NonNullable<ReturnType<typeof clinicaDeReserva>>;

/** Copia un texto al portapapeles; devuelve false si el navegador no lo permite. */
async function copiar(texto: string) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    return false;
  }
}

/**
 * Panel para reservar en la clínica. La web de la clínica no permite enlazar a un médico,
 * así que al abrirla se copia el nombre del doctor: el paciente solo tiene que pegarlo en su buscador.
 * Además, el enlace intenta resaltar el nombre en la lista (#:~:text=).
 */
export const ReservaClinica: React.FC<{ clinica: Clinica }> = ({ clinica }) => {
  const [copiado, setCopiado] = useState(false);

  const alCopiar = async () => {
    if (clinica.buscar) setCopiado(await copiar(clinica.buscar));
  };

  return (
    <div className="space-y-5">
      <p className="text-slate-600">
        La reserva en <strong className="text-navy-900">{clinica.nombre}</strong> se hace en la web de la clínica, que se abrirá en otra pestaña.
      </p>

      {clinica.buscar && (
        <ol className="space-y-3 p-4 rounded-2xl bg-medical-50 border border-medical-500/20 text-sm text-slate-700">
          {[
            <>Pulsa <strong className="text-navy-900">«Ir a la web de la clínica»</strong>. Se copiará el nombre del doctor.</>,
            <>En el buscador de la clínica, haz clic en <strong className="text-navy-900">«Nombre del médico»</strong> y pega el nombre (mantén pulsado → Pegar, o Ctrl + V).</>,
            <>Pulsa <strong className="text-navy-900">Buscar</strong> y elige al doctor <strong className="text-navy-900">{clinica.buscar}</strong>.</>,
          ].map((paso, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 shrink-0 rounded-full bg-medical-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <span>{paso}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <a href={clinica.url} target="_blank" rel="noopener" onClick={() => void alCopiar()} className={`${claseBotonPrincipal} inline-flex items-center justify-center gap-2`}>
          <ExternalLink className="w-4 h-4" /> Ir a la web de la clínica
        </a>
        {clinica.telefono && (
          <a
            href={telHref(clinica.telefono)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:border-medical-500 hover:text-medical-700 text-sm font-semibold"
          >
            <Phone className="w-4 h-4" /> Llamar a la central: {formatearTelefono(clinica.telefono)}
          </a>
        )}
      </div>

      {clinica.buscar && (
        <button type="button" onClick={() => void alCopiar()} className="inline-flex items-center gap-1.5 text-sm font-semibold text-medical-700 hover:underline cursor-pointer">
          {copiado ? <Check className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
          {copiado ? `Copiado: «${clinica.buscar}». Pégalo en el buscador de la clínica.` : `Copiar el nombre «${clinica.buscar}»`}
        </button>
      )}
    </div>
  );
};
