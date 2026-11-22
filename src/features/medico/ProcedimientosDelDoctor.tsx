import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Servicio } from '../../lib/cms-tipos';

/** Enlaces a cada procedimiento desde el perfil (enlazado interno para SEO). */
export const ProcedimientosDelDoctor: React.FC<{ procedimientos: Servicio[] }> = ({ procedimientos }) => (
  <section className="py-16 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Procedimientos que realiza</h2>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {procedimientos.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/procedimientos/${p.slug}`}
              className="h-full flex items-center justify-between gap-3 p-5 rounded-2xl glass-card text-sm font-semibold text-slate-800"
            >
              {p.nombre}
              <ArrowRight className="w-4 h-4 shrink-0 text-medical-500" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
