'use client';

import React, { createContext, useContext, useState } from 'react';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { WhatsappFlotante } from '../layout/WhatsappFlotante';
import { AppointmentModal } from '../../features/citas/components/AppointmentModal';
import type { ServicioMedico } from '../../features/catalogo-servicios/types';
import type { ConfiguracionSitio, Servicio } from '../../lib/cms-tipos';
import { SitioProvider } from './SitioContext';

interface BookingContextType {
  openBooking: (service?: ServicioMedico) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within an AppShell');
  }
  return context;
};

export const AppShell: React.FC<{ children: React.ReactNode; config: ConfiguracionSitio; servicios: Servicio[] }> = ({ children, config, servicios }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServicioMedico | null>(null);

  const openBooking = (service?: ServicioMedico) => {
    setSelectedService(service ?? null);
    setModalOpen(true);
  };

  const closeBooking = () => setModalOpen(false);

  return (
    <SitioProvider config={config} servicios={servicios}>
      <BookingContext.Provider value={{ openBooking, closeBooking }}>
        <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-medical-500 selection:text-white">
          <Navbar onOpenBooking={() => openBooking()} />

          <main className="flex-grow">{children}</main>

          <Footer />

          <WhatsappFlotante />

          <AppointmentModal isOpen={modalOpen} onClose={closeBooking} selectedService={selectedService} servicios={servicios} />
        </div>
      </BookingContext.Provider>
    </SitioProvider>
  );
};
