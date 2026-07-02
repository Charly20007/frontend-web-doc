import React, { useState, useEffect, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import type { ServicioMedico } from './components/ServicesSection';
import { LoadingFallback } from './components/LoadingFallback';

// Carga diferida (Lazy Loading) de componentes bajo la página para optimización del rendimiento
const ServicesSection = React.lazy(() => import('./components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const DoctorProfile = React.lazy(() => import('./components/DoctorProfile').then(m => ({ default: m.DoctorProfile })));
const TestimonialsSection = React.lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const Footer = React.lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const AppointmentModal = React.lazy(() => import('./components/AppointmentModal').then(m => ({ default: m.AppointmentModal })));

export function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServicioMedico | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenBooking = (service?: ServicioMedico) => {
    if (service) {
      setSelectedService(service);
    } else {
      setSelectedService(null);
    }
    setModalOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-navy-950 text-slate-100' : 'bg-slate-50 text-slate-800'} flex flex-col selection:bg-medical-500 selection:text-white`}>
      {/* Barra de navegación con botón Sol/Luna (Carga Inmediata) */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      {/* Contenido de la página */}
      <main className="flex-grow">
        {/* Hero Section (Carga Inmediata para optimizar LCP / Core Web Vitals) */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* Secciones con Lazy Loading & Suspense */}
        <Suspense fallback={<LoadingFallback texto="Cargando catálogo de procedimientos..." />}>
          <ServicesSection onSelectService={(service) => handleOpenBooking(service)} />
        </Suspense>

        <Suspense fallback={<LoadingFallback texto="Cargando perfil del especialista..." />}>
          <DoctorProfile />
        </Suspense>

        <Suspense fallback={<LoadingFallback texto="Cargando testimonios verificados..." />}>
          <TestimonialsSection />
        </Suspense>
      </main>

      {/* Pie de página con Lazy Loading */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Modal interactivo de agendamiento (Carga Diferida al requerir) */}
      <Suspense fallback={null}>
        {modalOpen && (
          <AppointmentModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            selectedService={selectedService}
            servicios={[]}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
