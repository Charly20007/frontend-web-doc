import React from 'react';

interface TituloSeccionProps {
  antetitulo?: string;
  iconoAntetitulo?: React.ReactNode;
  titulo: string;
  /** Parte final del título, resaltada con degradado. */
  resaltado?: string;
  subtitulo?: string;
  centrado?: boolean;
  /** h1 cuando es el título principal de la página (una sola vez por página, para SEO). */
  nivel?: 'h1' | 'h2';
}

export const TituloSeccion: React.FC<TituloSeccionProps> = ({ antetitulo, iconoAntetitulo, titulo, resaltado, subtitulo, centrado = true, nivel = 'h2' }) => {
  const Titulo = nivel;
  return (
    <div className={`max-w-3xl mb-10 ${centrado ? 'mx-auto text-center' : 'text-left'}`}>
      {antetitulo && (
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-medical-500/10 border border-medical-500/20 text-medical-600 text-xs font-semibold uppercase tracking-wider mb-3">
          {iconoAntetitulo && <span className="shrink-0">{iconoAntetitulo}</span>}
          <span>{antetitulo}</span>
        </div>
      )}
      <Titulo className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {titulo}{' '}
        {resaltado && <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-blue-500">{resaltado}</span>}
      </Titulo>
      {subtitulo && <p className="mt-4 text-slate-600 text-base leading-relaxed">{subtitulo}</p>}
    </div>
  );
};
