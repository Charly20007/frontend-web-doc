import React from 'react';
import Link from 'next/link';
import { Activity, ArrowRight, Scissors, Shield, Stethoscope } from 'lucide-react';
import type { Servicio } from '../../lib/cms-tipos';
import { Encabezado } from './Encabezado';

const ICONOS: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Scissors: <Scissors className="w-6 h-6" />,
};

export const ProcedimientosInicio: React.FC<{ servicios: Servicio[] }> = ({ servicios }) => (
  <section id="servicios" className="py-20 lg:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <Encabezado
          antetitulo="Procedimientos"
          titulo="¿En qué te podemos ayudar?"
          bajada="Conoce los síntomas, cómo es cada cirugía y qué esperar en la recuperación."
        />
        <Link href="/procedimientos" className="inline-flex items-center gap-1.5 font-bold text-medical-700 hover:text-medical-800 shrink-0">
          Ver todos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {servicios.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/procedimientos/${s.slug}`}
              className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:border-medical-300 hover:shadow-xl hover:shadow-medical-900/5 hover:-translate-y-0.5"
            >
              <span className="w-12 h-12 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-colors">
                {ICONOS[s.icono ?? ''] ?? <Stethoscope className="w-6 h-6" />}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-navy-900">{s.nombreCorto || s.nombre}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed flex-grow">{s.resumen}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-medical-700">
                Ver detalles <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
