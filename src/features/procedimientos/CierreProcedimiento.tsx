import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BotonCita } from '../../compartido/ui/BotonCita';
import type { ConfiguracionSitio, Servicio } from '../../lib/cms-tipos';

/** Llamado final a agendar y enlaces a los demás procedimientos (enlazado interno para SEO). */
export const CierreProcedimiento: React.FC<{ slug: string; config: ConfiguracionSitio; otros: Servicio[] }> = ({ slug, config, otros }) => (
  <section className="py-14">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-navy-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold">¿Tienes dudas sobre tu caso?</h2>
          <p className="text-sm text-slate-300 mt-1">
            Agenda una evaluación con el {config.nombreDoctor} y recibe un diagnóstico claro.
          </p>
        </div>
        <BotonCita servicioSlug={slug} variant="light" className="shrink-0">
          Agendar evaluación
        </BotonCita>
      </div>

      <h2 className="mt-14 text-xl font-extrabold text-slate-900">Otros procedimientos</h2>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {otros.map((o) => (
          <li key={o.slug}>
            <Link
              href={`/procedimientos/${o.slug}`}
              className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200 hover:border-medical-500/50 bg-white text-sm font-semibold text-slate-800 transition-colors"
            >
              {o.nombre}
              <ArrowRight className="w-4 h-4 shrink-0 text-medical-500" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
