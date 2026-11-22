import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { BotonCita } from '../../compartido/ui/BotonCita';
import type { Servicio } from '../../lib/cms-tipos';

/** Tarjetas de todos los procedimientos y una invitación a la consulta de valoración. */
export const ListaProcedimientos: React.FC<{ procedimientos: Servicio[] }> = ({ procedimientos }) => (
  <>
    <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {procedimientos.map((p) => (
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
  </>
);
