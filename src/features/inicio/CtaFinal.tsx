import React from 'react';
import { BotonCita } from '../../shared/ui/BotonCita';
import { BotonWhatsapp } from '../../shared/ui/BotonWhatsapp';

export const CtaFinal: React.FC = () => (
  <section className="bg-navy-900 relative overflow-hidden">
    <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-medical-500/20 blur-3xl" aria-hidden="true" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">¿Tienes dudas sobre tu diagnóstico?</h2>
        <p className="mt-3 text-lg text-slate-300">Agenda una consulta de valoración y recibe una explicación clara de tu caso y tus opciones.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <BotonCita servicioSlug="consulta-valoracion-quirurgica" variant="light">Agendar consulta</BotonCita>
        <BotonWhatsapp variante="claro" />
      </div>
    </div>
  </section>
);
