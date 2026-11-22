import React from 'react';
import { direccionCompleta } from '../../lib/sitio';
import type { ConfiguracionSitio } from '../../lib/cms-tipos';

/** Mapa de Google con la dirección del consultorio configurada en el CMS. */
export const MapaConsultorio: React.FC<{ config: ConfiguracionSitio }> = ({ config }) => {
  const mapaUrl = `https://www.google.com/maps?q=${encodeURIComponent(direccionCompleta(config))}&output=embed`;
  return (
    <div className="rounded-3xl overflow-hidden border border-slate-200 min-h-[360px]">
      <iframe
        title={`Mapa del consultorio en ${config.distrito ?? ''}`}
        src={mapaUrl}
        className="w-full h-full min-h-[360px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
