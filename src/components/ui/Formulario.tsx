import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

/** Estilos comunes de los formularios de la web (cita, opinión). */
export const claseInput =
  'w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20';
export const claseEtiqueta = 'block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2';
export const claseBotonPrincipal =
  'bg-medical-600 hover:bg-medical-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md shadow-medical-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
export const claseBotonSecundario = 'px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold cursor-pointer';

export const AlertaError: React.FC<{ mensaje: string }> = ({ mensaje }) => (
  <div role="alert" className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
    <AlertCircle className="w-5 h-5 shrink-0" />
    <span>{mensaje}</span>
  </div>
);

/** Pantalla de "enviado" que reemplaza al formulario. */
export const PantallaExito: React.FC<{ titulo: string; children: React.ReactNode; alCerrar: () => void }> = ({ titulo, children, alCerrar }) => (
  <div className="text-center py-6 space-y-5">
    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle2 className="w-8 h-8" />
    </div>
    <div className="space-y-2">
      <h4 className="font-display text-2xl font-bold text-navy-900">{titulo}</h4>
      {children}
    </div>
    <button type="button" onClick={alCerrar} className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-8 py-3 rounded-xl text-sm cursor-pointer">
      Listo
    </button>
  </div>
);
