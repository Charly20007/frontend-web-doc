'use client';

import React from 'react';
import { whatsappHref } from '../../lib/formato';
import { numeroWhatsapp } from '../../lib/sitio';
import { useSitio } from '../providers/SitioContext';

/** Botón fijo de WhatsApp: el canal preferido de los pacientes para pedir cita. */
export const WhatsappFlotante: React.FC = () => {
  const { config } = useSitio();
  const numero = numeroWhatsapp(config);
  if (!numero) return null;

  const mensaje = encodeURIComponent(`Hola, quisiera agendar una consulta con el ${config.nombreDoctor}.`);

  return (
    <a
      href={`${whatsappHref(numero)}?text=${mensaje}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-lg shadow-black/20 pl-4 pr-5 py-3 font-bold text-sm transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="w-6 h-6 fill-current">
        <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.75 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.7c-2 0-3.95-.54-5.65-1.56l-.4-.24-3.97 1.04 1.06-3.86-.26-.4A10.66 10.66 0 0 1 5.33 16c0-5.9 4.8-10.7 10.71-10.7 5.9 0 10.67 4.8 10.67 10.7S21.94 26.7 16.04 26.7Zm5.86-8c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.25-.19.22-.38.24-.7.08-.32-.16-1.36-.5-2.58-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.65.15-.15.32-.38.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55h-.62c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.66 0 1.57 1.15 3.08 1.3 3.3.17.21 2.26 3.45 5.47 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="hidden sm:inline">Escríbenos</span>
    </a>
  );
};
