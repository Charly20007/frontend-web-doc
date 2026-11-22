'use client';

import React, { createContext, useContext, useState } from 'react';
import { BarraNavegacion } from '../layout/BarraNavegacion';
import { PiePagina } from '../layout/PiePagina';
import { WhatsappFlotante } from '../layout/WhatsappFlotante';
import { ModalCita } from '../../features/citas/ModalCita';
import type { ConfiguracionSitio, PaginaLegalResumen, Servicio } from '../../lib/cms-tipos';
import { SitioProvider } from './SitioContext';

interface ReservaContextType {
  abrirReserva: (servicio?: Servicio) => void;
  cerrarReserva: () => void;
}

const ReservaContext = createContext<ReservaContextType | undefined>(undefined);

export const useReserva = () => {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error('useReserva debe usarse dentro de MarcoSitio');
  }
  return context;
};

export const MarcoSitio: React.FC<{ children: React.ReactNode; config: ConfiguracionSitio; servicios: Servicio[]; legales: PaginaLegalResumen[] }> = ({ children, config, servicios, legales }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicioInicial, setServicioInicial] = useState<Servicio | null>(null);

  const abrirReserva = (servicio?: Servicio) => {
    setServicioInicial(servicio ?? null);
    setModalAbierto(true);
  };

  const cerrarReserva = () => setModalAbierto(false);

  return (
    <SitioProvider config={config} servicios={servicios} legales={legales}>
      <ReservaContext.Provider value={{ abrirReserva, cerrarReserva }}>
        <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-medical-500 selection:text-white">
          <BarraNavegacion alAbrirReserva={() => abrirReserva()} />

          <main className="flex-grow">{children}</main>

          <PiePagina />

          <WhatsappFlotante />

          <ModalCita abierto={modalAbierto} alCerrar={cerrarReserva} servicioInicial={servicioInicial} servicios={servicios} />
        </div>
      </ReservaContext.Provider>
    </SitioProvider>
  );
};
