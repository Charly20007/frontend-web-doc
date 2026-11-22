import React from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { claseEtiqueta } from '../../compartido/ui/Formulario';
import { formatearTelefono, telHref } from '../../lib/formato';
import { partesFecha, type Disponibilidad } from './fechas';

interface SelectorTurnoProps {
  agenda: Disponibilidad | null;
  cargando: boolean;
  error: boolean;
  fecha: string | null;
  hora: string | null;
  /** Teléfono del consultorio, para cuando no se puede reservar en línea. */
  telefono?: string | null;
  alElegirFecha: (fecha: string) => void;
  alElegirHora: (hora: string) => void;
  alReintentar: () => void;
}

/** Elección de día y hora entre los turnos libres, con los estados de carga, error y sin turnos. */
export const SelectorTurno: React.FC<SelectorTurnoProps> = ({ agenda, cargando, error, fecha, hora, telefono, alElegirFecha, alElegirHora, alReintentar }) => {
  const telefonoConsultorio = formatearTelefono(telefono);
  const turnosDelDia = agenda?.dias.find((d) => d.fecha === fecha)?.turnos ?? [];

  return (
      <fieldset className="min-w-0">
        <legend className={claseEtiqueta}>Elige día y hora *</legend>
        {cargando && !agenda && <p className="text-sm text-slate-500 flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Buscando horarios disponibles…</p>}

        {error && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 flex flex-wrap items-center justify-between gap-3">
            <span>No pudimos cargar los horarios.{telefonoConsultorio && <> También puedes llamarnos al {telefonoConsultorio}.</>}</span>
            <button type="button" onClick={alReintentar} className="font-bold underline cursor-pointer">Reintentar</button>
          </div>
        )}

        {agenda && !agenda.reservasActivas && (
          <p className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
            Por ahora las citas se agendan por teléfono{telefonoConsultorio && <>: <a href={telHref(telefono)} className="font-semibold text-medical-700">{telefonoConsultorio}</a></>}.
          </p>
        )}

        {agenda?.reservasActivas && agenda.dias.length === 0 && (
          <p className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
            No hay turnos disponibles en los próximos días.{telefonoConsultorio && <> Llámanos al <a href={telHref(telefono)} className="font-semibold text-medical-700">{telefonoConsultorio}</a> y te buscamos un espacio.</>}
          </p>
        )}

        {agenda?.reservasActivas && agenda.dias.length > 0 && (
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1" role="radiogroup" aria-label="Día">
              {agenda.dias.map((d) => {
                const p = partesFecha(d.fecha);
                const activo = d.fecha === fecha;
                return (
                  <button
                    key={d.fecha}
                    type="button"
                    role="radio"
                    aria-checked={activo}
                    aria-label={p.largo}
                    onClick={() => alElegirFecha(d.fecha)}
                    className={`shrink-0 w-16 py-2 rounded-xl border text-center cursor-pointer transition-colors ${activo ? 'bg-medical-600 border-medical-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-medical-300'}`}
                  >
                    <span className="block text-[11px] uppercase font-semibold opacity-80">{p.dia}</span>
                    <span className="block text-lg font-bold leading-tight">{p.numero}</span>
                    <span className="block text-[11px] opacity-80">{p.mes}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="Hora">
              {turnosDelDia.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={hora === t}
                  onClick={() => alElegirHora(t)}
                  className={`py-2 rounded-lg border text-sm font-semibold cursor-pointer transition-colors ${hora === t ? 'bg-medical-600 border-medical-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-medical-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Cada turno dura {agenda.duracionTurnoMinutos} minutos. Solo se muestran horarios libres.
            </p>
          </div>
        )}
      </fieldset>
  );
};
