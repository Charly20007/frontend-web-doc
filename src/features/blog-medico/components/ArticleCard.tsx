import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import type { ArticuloMedico } from '../types';

interface ArticleCardProps {
  articulo: ArticuloMedico;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ articulo }) => {
  return (
    <article className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1.5 group bg-white/80 dark:bg-navy-900/80 shadow-lg">
      <div>
        {/* Imagen de portada con badge de categoría */}
        {articulo.imagenPortadaUrl && (
          <div className="relative h-52 overflow-hidden bg-slate-950">
            <img 
              src={articulo.imagenPortadaUrl} 
              alt={articulo.titulo} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs border border-white/20 shadow-sm">
                {articulo.categoria.nombre}
              </span>
            </div>
            <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center space-x-1.5 text-slate-300 text-xs">
              <Clock className="w-3.5 h-3.5 text-medical-400" />
              <span>{articulo.tiempoLectura} min lectura</span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-7">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
            <span>{articulo.fechaPublicacion}</span>
            <span>•</span>
            <span>Por {articulo.autor}</span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors leading-snug mb-3">
            <Link href={`/blog/${articulo.slug}`}>
              {articulo.titulo}
            </Link>
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
            {articulo.resumen}
          </p>
        </div>
      </div>

      <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
        <Link 
          href={`/blog/${articulo.slug}`}
          className="inline-flex items-center space-x-2 text-sm font-bold text-medical-600 dark:text-medical-400 group-hover:text-medical-500 transition-colors"
        >
          <span>Leer artículo completo</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <div className="w-8 h-8 rounded-full bg-medical-500/10 text-medical-600 dark:text-medical-400 flex items-center justify-center">
          <BookOpen className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
};
