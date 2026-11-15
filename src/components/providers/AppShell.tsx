'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { AppointmentModal } from '../../features/citas/components/AppointmentModal';
import type { ServicioMedico } from '../../features/catalogo-servicios/types';

interface BookingContextType {
  openBooking: (service?: ServicioMedico) => void;
  closeBooking: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within an AppShell');
  }
  return context;
};

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServicioMedico | null>(null);

  useEffect(() => {
    // Detect system dark mode preference or saved preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const openBooking = (service?: ServicioMedico) => {
    if (service) {
      setSelectedService(service);
    } else {
      setSelectedService(null);
    }
    setModalOpen(true);
  };

  const closeBooking = () => {
    setModalOpen(false);
  };

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, darkMode, toggleDarkMode }}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-navy-950 text-slate-100' : 'bg-slate-50 text-slate-800'} flex flex-col selection:bg-medical-500 selection:text-white`}>
        <Navbar 
          onOpenBooking={() => openBooking()} 
          darkMode={darkMode}
          onToggleTheme={toggleDarkMode}
        />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />

        <AppointmentModal
          isOpen={modalOpen}
          onClose={closeBooking}
          selectedService={selectedService}
          servicios={[]}
        />
      </div>
    </BookingContext.Provider>
  );
};

