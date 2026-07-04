import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { getArticuloBySlug } from '../services/blogService';
import type { ArticuloMedico } from '../types';

interface ArticleDetailProps {
  onOpenBooking: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();
  const [articulo, setArticulo] = useState<ArticuloMedico | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await getArticuloBySlug(slug);
      setArticulo(data);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    cargar();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 bg-slate-50 dark:bg-navy-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-500" />
      </div>
    );
  }

  if (!articulo) {
    return (
      <div className="min-h-screen py-20 bg-slate-50 dark:bg-navy-950 flex flex-col items-center justify-center text-center px-4">
        <BookOpen className="w-16 h-16 text-slate-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Artículo no encontrado</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
          Es posible que el artículo haya sido removido, reubicado o el enlace sea incorrecto.
        </p>
        <Link 
          to="/blog" 
          className="bg-medical-500 hover:bg-medical-600 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Blog Quirúrgico</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-slate-50 dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Botón Volver */}
        <div className="mb-8">
          <Link 
            to="/blog"
            className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-medical-600 dark:hover:text-medical-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a todos los artículos</span>
          </Link>
        </div>

        {/* Cabecera del Artículo */}
        <header className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-medical-500/10 border border-medical-500/20 text-medical-600 dark:text-medical-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span>{articulo.categoria.nombre}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            {articulo.titulo}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 overflow-hidden shrink-0">
                  <img src="/WhatsApp Image 2026-07-02 at 12.36.06 PM (1).jpeg" alt="Dr. Juan Marcos" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{articulo.autor}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-medical-500" />
                <span>{articulo.fechaPublicacion}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 font-medium bg-slate-200/60 dark:bg-navy-900 px-3 py-1 rounded-lg">
                <Clock className="w-4 h-4 text-medical-500" />
                <span>{articulo.tiempoLectura} min de lectura</span>
              </div>
            </div>
          </div>
        </header>

        {/* Imagen de Portada */}
        {articulo.imagenPortadaUrl && (
          <div className="rounded-3xl overflow-hidden mb-10 border border-slate-200 dark:border-white/10 shadow-xl bg-slate-950 max-h-[480px]">
            <img 
              src={articulo.imagenPortadaUrl} 
              alt={articulo.titulo} 
              className="w-full h-auto object-cover mx-auto"
            />
          </div>
        )}

        {/* Contenido Editorial del Artículo */}
        <article 
          className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: articulo.contenidoHtml }}
        />

        {/* Tarjeta de Llamado a la Acción (CTA) - Conversión Quirúrgica */}
        <div className="mt-16 rounded-3xl overflow-hidden bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 text-white p-8 sm:p-10 border border-white/10 shadow-2xl relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-medical-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-medical-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Evaluación Quirúrgica Especializada</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                ¿Presentas síntomas o necesitas valoración del Dr. Juan Marcos?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                No arriesgues tu salud con diagnósticos inciertos. Agenda una consulta presencial o videoconsulta con uno de los cirujanos de mayor trayectoria y calidez humana del país.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-gradient-to-r from-medical-500 to-blue-600 hover:from-medical-600 hover:to-blue-700 text-white font-bold px-6 py-4 rounded-2xl shadow-xl shadow-medical-500/30 hover:shadow-medical-500/50 transition-all flex items-center justify-center space-x-2 text-base group"
              >
                <span>Agendar Cita Ahora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-[11px] text-slate-400 mt-2 block text-center">Atención en clínicas y hospitales de prestigio</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
