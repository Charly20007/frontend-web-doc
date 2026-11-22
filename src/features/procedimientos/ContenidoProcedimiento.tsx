import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2, HeartPulse } from 'lucide-react';
import type { ServicioDetalle } from '../../lib/cms-tipos';
import type { ArticuloMedico } from '../blog/tipos';

/** Cuerpo del procedimiento: introducción, indicaciones, pasos, recuperación, preguntas y artículos. */
export const ContenidoProcedimiento: React.FC<{ p: ServicioDetalle; articulos: ArticuloMedico[] }> = ({ p, articulos }) => (
  <article className="py-12">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      {/* Introducción */}
      <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed max-w-3xl">
        {p.introduccion.map((parrafo, i) => (
          <p key={i}>{parrafo.texto}</p>
        ))}
      </div>

      {/* Indicaciones / síntomas */}
      {p.indicaciones.length > 0 && <section>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{p.tituloIndicaciones || '¿Cuándo se recomienda?'}</h2>
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {p.indicaciones.map(({ texto: item }) => {
            const urgente = /urgen/i.test(item);
            return (
              <li
                key={item}
                className={`flex items-start gap-3 p-4 rounded-2xl border text-sm leading-relaxed ${
                  urgente
                    ? 'border-red-300 bg-red-50 text-red-800'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                {urgente ? (
                  <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-medical-500" />
                )}
                <span>{item}</span>
              </li>
              );
          })}
        </ul>
      </section>}

      {/* Cómo es el procedimiento */}
      {p.pasos.length > 0 && <section>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">¿Cómo es el procedimiento?</h2>
        <ol className="mt-6 space-y-4">
          {p.pasos.map((paso, i) => (
            <li key={i} className="flex gap-4 p-5 rounded-2xl glass-card">
              <span className="w-9 h-9 shrink-0 rounded-xl bg-medical-500 text-white font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                {paso.titulo && <h3 className="font-bold text-slate-900">{paso.titulo}</h3>}
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{paso.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>}

      {/* Recuperación */}
      {p.recuperacion.length > 0 && <section className="p-6 sm:p-8 rounded-3xl bg-medical-50 border-l-4 border-medical-500">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-medical-500" />
          {p.slug === 'consulta-valoracion-quirurgica' ? 'Cómo prepararte para la consulta' : 'Recuperación'}
        </h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          {p.recuperacion.map((r, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-1 shrink-0 text-emerald-500" />
              <span>{r.texto}</span>
            </li>
          ))}
        </ul>
      </section>}

      {/* Preguntas frecuentes */}
      {p.preguntas.length > 0 && <section>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Preguntas frecuentes</h2>
        <div className="mt-6 space-y-3">
          {p.preguntas.map((q, i) => (
            <details key={i} className="group p-5 rounded-2xl border border-slate-200 bg-white">
              <summary className="cursor-pointer list-none font-bold text-slate-900 flex items-center justify-between gap-4">
                <h3 className="text-base">{q.titulo}</h3>
                <ArrowRight className="w-4 h-4 shrink-0 text-medical-500 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{q.texto}</p>
            </details>
          ))}
        </div>
      </section>}

      {/* Artículos relacionados del blog */}
      {articulos.length > 0 && (
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-medical-500" /> Artículos relacionados
          </h2>
          <ul className="mt-4 space-y-3">
            {articulos.map((a) => (
              <li key={a.slug}>
                <Link href={`/blog/${a.slug}`} className="font-semibold text-medical-600 hover:underline underline-offset-4">
                  {a.titulo}
                </Link>
                <p className="text-sm text-slate-600 mt-0.5">{a.resumen}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </article>
);
