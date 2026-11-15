import type { Metadata } from 'next';
import { HomePageClient } from '../features/home/HomePageClient';

export const metadata: Metadata = {
  title: 'Cirugía General y Laparoscópica en Lima | Dr. Juan Carlos Marcos',
  description: 'Tratamiento quirúrgico avanzado de vesícula, hernias abdominales, apendicitis y patologías digestivas con técnicas de mínima invasión y rápida recuperación.',
  alternates: {
    canonical: 'https://cirujanogeneral.pe',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Juan Carlos Marcos Enriquez',
    url: 'https://cirujanogeneral.pe',
    image: 'https://cirujanogeneral.pe/WhatsApp Image 2026-07-02 at 12.36.06 PM (1).jpeg',
    telephone: '+51 999 8887',
    medicalSpecialty: [
      'General Surgery',
      'Laparoscopic Surgery',
      'Digestive System Surgery',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Javier Prado Este 1234, Consultorio 502',
      addressLocality: 'San Isidro',
      addressRegion: 'Lima',
      addressCountry: 'PE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    priceRange: '$$',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}

