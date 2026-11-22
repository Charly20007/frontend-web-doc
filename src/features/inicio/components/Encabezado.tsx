import React from 'react';

/** Encabezado de sección: antetítulo, título (H2) y bajada. */
export const Encabezado: React.FC<{ antetitulo: string; titulo: string; bajada?: string; centrado?: boolean; claro?: boolean }> = ({ antetitulo, titulo, bajada, centrado, claro }) => (
  <div className={centrado ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
    <p className={`text-xs font-bold uppercase tracking-widest ${claro ? 'text-medical-300' : 'text-medical-700'}`}>{antetitulo}</p>
    <h2 className={`mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${claro ? 'text-white' : 'text-navy-900'}`}>{titulo}</h2>
    {bajada && <p className={`mt-4 text-lg leading-relaxed ${claro ? 'text-slate-300' : 'text-slate-600'}`}>{bajada}</p>}
  </div>
);
