import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppShell } from '../components/providers/AppShell';
import { getConfiguracion, getPaginasLegales, getServicios } from '../lib/cms';
import { nombreMarca, urlAbsoluta } from '../config/site';

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
};

/** Metadatos globales: salen de "Datos del consultorio" en el CMS. */
export async function generateMetadata(): Promise<Metadata> {
  const c = await getConfiguracion();
  const titulo = c.metaTituloPorDefecto || c.nombreDoctor;
  const imagen = urlAbsoluta(c, c.imagenOgPorDefectoUrl);

  return {
    metadataBase: new URL(c.siteUrl),
    title: {
      default: titulo,
      // Sufijo corto para que Google no corte los títulos
      template: `%s | ${nombreMarca(c)}`,
    },
    description: c.metaDescripcionPorDefecto ?? undefined,
    authors: [{ name: c.nombreDoctor }],
    creator: c.nombreDoctor,
    publisher: c.nombreDoctor,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      type: 'website',
      locale: 'es_PE',
      url: c.siteUrl,
      title: titulo,
      description: c.metaDescripcionPorDefecto ?? undefined,
      siteName: c.nombreDoctor,
      images: imagen ? [{ url: imagen, width: 1200, height: 630, alt: c.nombreDoctor }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: titulo, description: c.metaDescripcionPorDefecto ?? undefined, images: imagen ? [imagen] : undefined },
    verification: c.googleSiteVerification ? { google: c.googleSiteVerification } : undefined,
    icons: { icon: '/favicon.svg' },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [config, servicios, legales] = await Promise.all([getConfiguracion(), getServicios(), getPaginasLegales()]);
  const ga = config.googleAnalyticsId;

  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <AppShell config={config} servicios={servicios} legales={legales}>
          {children}
        </AppShell>
        {ga && /^G-[A-Z0-9]+$/.test(ga) && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
