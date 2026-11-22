'use client';

import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  titulo: string;
  subtitulo?: string;
  icono?: React.ReactNode;
  ancho?: 'lg' | '2xl';
  alCerrar: () => void;
  children: React.ReactNode;
}

/** Ventana modal de la web: se cierra con Escape, con la X o haciendo clic fuera. */
export const Modal: React.FC<ModalProps> = ({ titulo, subtitulo, icono, ancho = '2xl', alCerrar, children }) => {
  const idTitulo = useId();
  // Siempre la versión más reciente de alCerrar, sin volver a registrar el evento
  const cerrar = useRef(alCerrar);
  useEffect(() => {
    cerrar.current = alCerrar;
  });

  useEffect(() => {
    const alPresionar = (e: KeyboardEvent) => e.key === 'Escape' && cerrar.current();
    window.addEventListener('keydown', alPresionar);
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', alPresionar);
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={idTitulo}
      onClick={(e) => e.target === e.currentTarget && alCerrar()}
    >
      <div className={`relative w-full ${ancho === 'lg' ? 'max-w-lg' : 'max-w-2xl'} bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-left`}>
        <div className="flex items-center justify-between gap-4 p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            {icono && <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center shrink-0">{icono}</div>}
            <div>
              <h3 id={idTitulo} className="font-display font-bold text-navy-900 text-lg">{titulo}</h3>
              {subtitulo && <p className="text-xs text-slate-500">{subtitulo}</p>}
            </div>
          </div>
          <button type="button" onClick={alCerrar} aria-label="Cerrar" className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
