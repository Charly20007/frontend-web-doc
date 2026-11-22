import React from 'react';
import { BotonCita } from '../../shared/ui/BotonCita';

/** Invitación final a agendar la consulta de valoración. */
export const LlamadoConsulta: React.FC = () => (
  <section className="py-14 text-center">
    <h2 className="text-2xl font-extrabold text-navy-900">Agenda tu consulta con el doctor</h2>
    <p className="mt-2 text-slate-600">Evaluación personalizada y un plan de tratamiento claro.</p>
    <div className="mt-6">
      <BotonCita servicioSlug="consulta-valoracion-quirurgica">Agendar consulta</BotonCita>
    </div>
  </section>
);
