'use client';

import React, { createContext, useContext } from 'react';
import type { ConfiguracionSitio, Servicio } from '../../lib/cms-tipos';

interface Sitio {
  config: ConfiguracionSitio;
  servicios: Servicio[];
}

const SitioContext = createContext<Sitio | undefined>(undefined);

/** Datos globales del CMS disponibles en los componentes de cliente (navbar, footer, modal). */
export const SitioProvider: React.FC<Sitio & { children: React.ReactNode }> = ({ config, servicios, children }) => (
  <SitioContext.Provider value={{ config, servicios }}>{children}</SitioContext.Provider>
);

export const useSitio = () => {
  const ctx = useContext(SitioContext);
  if (!ctx) throw new Error('useSitio debe usarse dentro de SitioProvider');
  return ctx;
};
