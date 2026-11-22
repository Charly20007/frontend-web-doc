import React from 'react';
import { BadgeCheck, Clock, HeartHandshake, Microscope } from 'lucide-react';
import type { ConfiguracionSitio } from '../../lib/cms-tipos';
import { agruparHorarios } from '../../lib/sitio';

/** Datos verificables que dan confianza: colegiatura, técnica, seguros y horario. */
export const FranjaConfianza: React.FC<{ config: ConfiguracionSitio }> = ({ config }) => {
  const horario = agruparHorarios(config)[0];
  const items = [
    {
      icono: <BadgeCheck className="w-6 h-6" />,
      titulo: 'Especialista registrado',
      texto: [config.cmp && `CMP ${config.cmp}`, config.rne && `RNE ${config.rne}`].filter(Boolean).join(' · ') || 'Colegio Médico del Perú',
    },
    { icono: <Microscope className="w-6 h-6" />, titulo: 'Cirugía laparoscópica', texto: 'Incisiones pequeñas y alta temprana' },
    { icono: <HeartHandshake className="w-6 h-6" />, titulo: 'Seguros aliados', texto: config.segurosAliados || 'Consulte su cobertura' },
    { icono: <Clock className="w-6 h-6" />, titulo: 'Horario de atención', texto: horario ? `${horario.dias}: ${horario.horas}` : 'Previa cita' },
  ];

  return (
    <section aria-label="Por qué confiar" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 lg:-mt-2">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-navy-900/5 divide-y sm:divide-y-0 lg:divide-x divide-slate-200">
        {items.map((i) => (
          <li key={i.titulo} className="flex items-start gap-4 p-6">
            <span className="w-11 h-11 shrink-0 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">{i.icono}</span>
            <span>
              <span className="block font-bold text-navy-900">{i.titulo}</span>
              <span className="block text-sm text-slate-500 mt-0.5">{i.texto}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
