import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { BotonCita } from '../../shared/ui/BotonCita';
import { fotoDoctor } from '../../lib/sitio';
import type { ConfiguracionSitio } from '../../lib/cms-tipos';
import type { ArticuloMedico } from './tipos';

interface DetalleArticuloProps {
  articulo: ArticuloMedico;
  config: ConfiguracionSitio;
}

/**
 * Artículo del blog. Es un componente de servidor: el texto llega a Google como HTML
 * y no se envía como JavaScript. Solo el botón de cita es interactivo.
 */
export const DetalleArticulo: React.FC<DetalleArticuloProps> = ({ articulo, config }) => (
  <div className="min-h-screen py-10 sm:py-16 bg-slate-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-medical-600 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver a todos los artículos</span>
        </Link>
      </div>

      <header className="mb-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-medical-500/10 border border-medical-500/20 text-medical-600 text-xs font-bold uppercase tracking-wider mb-4">
          {articulo.categoria.nombre}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">{articulo.titulo}</h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 overflow-hidden shrink-0">
                <img src={fotoDoctor(config)} alt={config.nombreDoctor} className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-slate-900">{articulo.autor}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-medical-500" />
              <time dateTime={articulo.fechaPublicacion}>{articulo.fechaPublicacionTexto}</time>
            </div>
          </div>

          <div className="flex items-center gap-1 font-medium bg-slate-200/60 px-3 py-1 rounded-lg">
            <Clock className="w-4 h-4 text-medical-500" />
            <span>{articulo.tiempoLectura} min de lectura</span>
          </div>
        </div>
      </header>

      {articulo.imagenPortadaUrl && (
        <div className="rounded-3xl overflow-hidden mb-10 border border-slate-200 shadow-xl bg-slate-950 max-h-[480px]">
          <img src={articulo.imagenPortadaUrl} alt={articulo.titulo} className="w-full h-auto object-cover mx-auto" />
        </div>
      )}

      {/* Contenido escrito en el CMS */}
      <article className="contenido-html text-lg text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: articulo.contenidoHtml }} />

      {/* Enlace interno al procedimiento relacionado (mejora el SEO de ambas páginas) */}
      {articulo.servicioRelacionado && (
        <Link
          href={`/procedimientos/${articulo.servicioRelacionado.slug}`}
          className="mt-12 flex items-center justify-between gap-4 p-6 rounded-2xl border border-medical-500/30 bg-medical-50 hover:border-medical-500 transition-colors"
        >
          <span>
            <span className="block text-xs font-bold uppercase tracking-wider text-medical-600">Procedimiento relacionado</span>
            <span className="block mt-1 text-lg font-bold text-slate-900">{articulo.servicioRelacionado.nombre}</span>
            <span className="block text-sm text-slate-600">Síntomas, cómo es la cirugía, recuperación y preguntas frecuentes.</span>
          </span>
          <ArrowRight className="w-5 h-5 shrink-0 text-medical-500" />
        </Link>
      )}

      {/* Llamado a la acción */}
      <div className="mt-16 rounded-3xl overflow-hidden bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 text-white p-8 sm:p-10 border border-white/10 shadow-2xl relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-medical-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-medical-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Evaluación quirúrgica especializada</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              ¿Tienes síntomas o necesitas una valoración del {config.nombreCorto || config.nombreDoctor}?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Agenda una consulta y recibe un diagnóstico claro y un plan de tratamiento a tu medida.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center">
            <BotonCita servicioSlug={articulo.servicioRelacionado?.slug} className="w-full sm:w-auto">Agendar cita</BotonCita>
          </div>
        </div>
      </div>
    </div>
  </div>
);
