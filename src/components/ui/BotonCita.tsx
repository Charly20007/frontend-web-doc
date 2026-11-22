'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { useReserva } from '../providers/MarcoSitio';
import { useSitio } from '../providers/SitioContext';

interface BotonCitaProps {
  /** Slug del procedimiento a preseleccionar en el modal. */
  servicioSlug?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'light';
  className?: string;
}

/**
 * Botón "Agendar cita" que se puede usar dentro de páginas del servidor.
 * Es la única parte interactiva; el resto de la página se renderiza en el servidor (mejor SEO).
 */
export const BotonCita: React.FC<BotonCitaProps> = ({
  servicioSlug,
  children = 'Agendar Cita',
  variant = 'primary',
  className = '',
}) => {
  const { abrirReserva } = useReserva();
  const { servicios } = useSitio();
  const servicio = servicioSlug ? servicios.find((s) => s.slug === servicioSlug) : undefined;

  const estilos =
    variant === 'primary'
      ? 'bg-medical-600 hover:bg-medical-700 text-white shadow-lg shadow-medical-600/20'
      : 'bg-white text-navy-950 hover:bg-medical-100 shadow-lg';

  return (
    <button
      type="button"
      onClick={() => abrirReserva(servicio)}
      className={`inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl transition-all duration-300 text-sm cursor-pointer ${estilos} ${className}`}
    >
      <Calendar className="w-4 h-4" />
      <span>{children}</span>
    </button>
  );
};
