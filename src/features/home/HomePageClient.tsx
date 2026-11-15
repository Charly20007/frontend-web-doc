'use client';

import React from 'react';
import { HeroSection } from '../perfil-medico/components/HeroSection';
import { ServicesSection } from '../catalogo-servicios/components/ServicesSection';
import { DoctorProfile } from '../perfil-medico/components/DoctorProfile';
import { TestimonialsSection } from '../perfil-medico/components/TestimonialsSection';
import { useBooking } from '../../components/providers/AppShell';

export const HomePageClient: React.FC = () => {
  const { openBooking } = useBooking();

  return (
    <>
      <HeroSection onOpenBooking={() => openBooking()} />
      <ServicesSection onSelectService={(service) => openBooking(service)} />
      <DoctorProfile />
      <TestimonialsSection />
    </>
  );
};

