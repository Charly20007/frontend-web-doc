'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { numeroWhatsapp, whatsappHref } from '../../config/site';
import { useSitio } from '../providers/SitioContext';

/** Botón "Escribir por WhatsApp" para usar dentro de las secciones. */
export const BotonWhatsapp: React.FC<{ variante?: 'contorno' | 'claro'; className?: string }> = ({ variante = 'contorno', className = '' }) => {
  const { config } = useSitio();
  const numero = numeroWhatsapp(config);
  if (!numero) return null;
  const mensaje = encodeURIComponent(`Hola, quisiera agendar una consulta con el ${config.nombreDoctor}.`);
  const estilos =
    variante === 'claro'
      ? 'border border-white/30 text-white hover:bg-white/10'
      : 'border border-slate-300 text-navy-900 hover:border-[#25D366] hover:text-[#128C7E] bg-white';

  return (
    <a
      href={`${whatsappHref(numero)}?text=${mensaje}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl text-sm transition-colors ${estilos} ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      Escribir por WhatsApp
    </a>
  );
};
