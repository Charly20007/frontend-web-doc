import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ArticuloMedico } from '../../blog/tipos';
import { Encabezado } from './Encabezado';

export const BlogInicio: React.FC<{ articulos: ArticuloMedico[] }> = ({ articulos }) => {
  if (articulos.length === 0) return null;
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Encabezado antetitulo="Blog médico" titulo="Información para pacientes" bajada="Respuestas claras a las dudas más frecuentes antes y después de una cirugía." />
          <Link href="/blog" className="inline-flex items-center gap-1.5 font-bold text-medical-700 hover:text-medical-800 shrink-0">
            Ver todos los artículos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {articulos.map((a) => (
            <li key={a.slug}>
              <Link href={`/blog/${a.slug}`} className="group h-full flex flex-col rounded-2xl bg-slate-50 border border-slate-200 p-7 hover:border-medical-300 hover:shadow-lg transition-all">
                <span className="text-xs font-bold uppercase tracking-wider text-medical-700">{a.categoria.nombre}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-navy-900 leading-snug group-hover:text-medical-700">{a.titulo}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-grow">{a.resumen}</p>
                <span className="mt-5 text-xs text-slate-500">
                  <time dateTime={a.fechaPublicacion}>{a.fechaPublicacionTexto}</time> · {a.tiempoLectura} min de lectura
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
