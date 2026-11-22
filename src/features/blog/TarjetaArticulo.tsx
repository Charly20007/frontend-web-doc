import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { ResumenArticulo } from './tipos';

interface TarjetaArticuloProps {
  articulo: ResumenArticulo;
  /**
   * portada: imagen grande con el título encima (artículo más reciente).
   * fila: miniatura al lado del texto (listados).
   */
  variante?: 'portada' | 'fila';
  /** En la fila, muestra el resumen debajo del título. */
  conResumen?: boolean;
}

const Meta: React.FC<{ articulo: ResumenArticulo; claro?: boolean }> = ({ articulo, claro }) => (
  <div className={`flex items-center gap-2 text-xs font-semibold ${claro ? 'text-white/80' : 'text-slate-500'}`}>
    <span className={`uppercase tracking-wider ${claro ? 'text-medical-300' : 'text-medical-700'}`}>{articulo.categoria.nombre}</span>
    <span aria-hidden>·</span>
    <span className="inline-flex items-center gap-1">
      <Clock className="w-3.5 h-3.5" />
      {articulo.tiempoLectura} min
    </span>
  </div>
);

/** Un artículo del blog. Toda la tarjeta es un enlace (el del título se extiende sobre ella). */
export const TarjetaArticulo: React.FC<TarjetaArticuloProps> = ({ articulo, variante = 'fila', conResumen }) => {
  const href = `/blog/${articulo.slug}`;

  if (variante === 'portada') {
    return (
      <article className="group relative h-full min-h-[22rem] sm:min-h-[26rem] rounded-3xl overflow-hidden bg-navy-900">
        {articulo.imagenPortadaUrl && (
          <img
            src={articulo.imagenPortadaUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <span className="inline-block mb-3 px-2.5 py-1 rounded-md bg-white text-navy-900 text-[11px] font-bold uppercase tracking-wider">{articulo.destacado ? 'Destacado' : 'Lo más reciente'}</span>
          <Meta articulo={articulo} claro />
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white leading-tight max-w-2xl">
            <Link href={href} className="after:absolute after:inset-0">
              {articulo.titulo}
            </Link>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/80 line-clamp-2 max-w-2xl">{articulo.resumen}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white">
            Leer artículo
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex gap-4 sm:gap-5 py-5 first:pt-0 last:pb-0">
      <div className={`relative shrink-0 overflow-hidden rounded-xl bg-slate-100 ${conResumen ? 'w-28 h-24 sm:w-48 sm:h-32' : 'w-24 h-20 sm:w-28 sm:h-24'}`}>
        {articulo.imagenPortadaUrl && (
          <img
            src={articulo.imagenPortadaUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>
      <div className="min-w-0 flex flex-col">
        <Meta articulo={articulo} />
        <h3 className={`mt-1.5 font-bold text-slate-900 leading-snug group-hover:text-medical-700 transition-colors ${conResumen ? 'text-base sm:text-xl' : 'text-base'} line-clamp-3`}>
          <Link href={href} className="after:absolute after:inset-0">
            {articulo.titulo}
          </Link>
        </h3>
        {conResumen && <p className="hidden sm:block mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-2">{articulo.resumen}</p>}
        <time dateTime={articulo.fechaPublicacion} className="mt-auto pt-2 text-xs text-slate-400">
          {articulo.fechaPublicacionTexto}
        </time>
      </div>
    </article>
  );
};
