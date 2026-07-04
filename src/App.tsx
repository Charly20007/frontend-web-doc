import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './features/perfil-medico/components/HeroSection';
import type { ServicioMedico } from './features/catalogo-servicios/types';
import { LoadingFallback } from './components/feedback/LoadingFallback';

// Carga diferida (Lazy Loading) por Features / Módulos de Negocio (Feature-Driven Architecture)
const ServicesSection = React.lazy(() => import('./features/catalogo-servicios/components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const DoctorProfile = React.lazy(() => import('./features/perfil-medico/components/DoctorProfile').then(m => ({ default: m.DoctorProfile })));
const TestimonialsSection = React.lazy(() => import('./features/perfil-medico/components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const Footer = React.lazy(() => import('./components/layout/Footer').then(m => ({ default: m.Footer })));
const AppointmentModal = React.lazy(() => import('./features/citas/components/AppointmentModal').then(m => ({ default: m.AppointmentModal })));

// Nuevos Módulos con Lazy Loading: Blog Quirúrgico y Educación Médica
const BlogList = React.lazy(() => import('./features/blog-medico/components/BlogList').then(m => ({ default: m.BlogList })));
const ArticleDetail = React.lazy(() => import('./features/blog-medico/components/ArticleDetail').then(m => ({ default: m.ArticleDetail })));

export function App() {
  const [darkMode, setDarkMode] = useState(false);
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
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-navy-950 text-slate-100' : 'bg-slate-50 text-slate-800'} flex flex-col selection:bg-medical-500 selection:text-white`}>
        {/* Barra de navegación con soporte para Enrutador y Modo Oscuro */}
        <Navbar 
          onOpenBooking={() => handleOpenBooking()} 
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />

        {/* Contenido dinámico con Enrutamiento (React Router DOM) */}
        <main className="flex-grow">
          <Routes>
            {/* Ruta Principal (/): Landing Page de Alto Impacto con Scroll Suave */}
            <Route path="/" element={
              <>
                <HeroSection onOpenBooking={() => handleOpenBooking()} />

                <Suspense fallback={<LoadingFallback texto="Cargando catálogo de procedimientos..." />}>
                  <ServicesSection onSelectService={(service) => handleOpenBooking(service)} />
                </Suspense>

                <Suspense fallback={<LoadingFallback texto="Cargando perfil del especialista..." />}>
                  <DoctorProfile />
                </Suspense>

                <Suspense fallback={<LoadingFallback texto="Cargando testimonios verificados..." />}>
                  <TestimonialsSection />
                </Suspense>
              </>
            } />

            {/* Ruta Listado de Blog (/blog): Catálogo de artículos médicos y buscador */}
            <Route path="/blog" element={
              <Suspense fallback={<LoadingFallback texto="Cargando artículos y consejos médicos..." />}>
                <BlogList />
              </Suspense>
            } />

            {/* Ruta Lectura de Artículo (/blog/:slug): Vista editorial SEO con conversión */}
            <Route path="/blog/:slug" element={
              <Suspense fallback={<LoadingFallback texto="Cargando lectura del artículo..." />}>
                <ArticleDetail onOpenBooking={() => handleOpenBooking()} />
              </Suspense>
            } />
          </Routes>
        </main>

        {/* Pie de página con Lazy Loading */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        {/* Modal interactivo de agendamiento (Carga Diferida al requerir el feature) */}
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
    </BrowserRouter>
  );
}

export default App;
