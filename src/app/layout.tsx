import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppShell } from '../components/providers/AppShell';

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cirujanogeneral.pe'),
  title: {
    default: 'Dr. Juan Carlos Marcos Enriquez | Cirugía General & Laparoscópica',
    template: '%s | Dr. Juan Carlos Marcos Enriquez',
  },
  description: 'Especialista en Cirugía General y del Aparato Digestivo por Mínima Invasión. Cirugía de vesícula, hernias, apendicitis y laparoscopía avanzada en Lima, Perú.',
  keywords: [
    'Cirujano General',
    'Cirugía Laparoscópica',
    'Cirugía de Vesícula',
    'Colecistectomía',
    'Hernia Inguinal',
    'Hernia Umbilical',
    'Apendicectomía',
    'Dr. Juan Carlos Marcos',
    'Cirujano en Lima',
    'Aparato Digestivo'
  ],
  authors: [{ name: 'Dr. Juan Carlos Marcos Enriquez' }],
  creator: 'Dr. Juan Carlos Marcos Enriquez',
  publisher: 'Dr. Juan Carlos Marcos Enriquez',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://cirujanogeneral.pe',
    title: 'Dr. Juan Carlos Marcos Enriquez | Cirugía General & Laparoscópica',
    description: 'Cirugía de mínima invasión con recuperación acelerada. Especialista en vesícula, hernias y patologías digestivas.',
    siteName: 'Dr. Juan Carlos Marcos Enriquez',
    images: [
      {
        url: '/WhatsApp Image 2026-07-02 at 12.36.06 PM (2).jpeg',
        width: 1200,
        height: 630,
        alt: 'Dr. Juan Carlos Marcos Enriquez - Cirujano General',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Juan Carlos Marcos Enriquez | Cirugía General & Laparoscópica',
    description: 'Cirugía de mínima invasión con recuperación acelerada en Lima, Perú.',
    images: ['/WhatsApp Image 2026-07-02 at 12.36.06 PM (2).jpeg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
