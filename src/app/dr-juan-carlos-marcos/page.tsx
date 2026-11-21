import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DoctorProfile } from '../../features/perfil-medico/components/DoctorProfile';
import { TestimonialsSection } from '../../features/perfil-medico/components/TestimonialsSection';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { BookingButton } from '../../components/ui/BookingButton';
import { construirMetadata, physicianJsonLd } from '../../config/site';
import { getConfiguracion, getPaginaSeo, getServicios, getTestimonios } from '../../lib/cms';

const RUTA = '/dr-juan-carlos-marcos';

export async function generateMetadata(): Promise<Metadata> {
  const [config, pagina] = await Promise.all([getConfiguracion(), getPaginaSeo('perfil-doctor')]);
  return construirMetadata({
    config,
    ruta: RUTA,
    seo: pagina?.seo,
    tituloRespaldo: config.nombreDoctor,
    descripcionRespaldo: config.especialidad,
    tipo: 'profile',
    // El título ya incluye el nombre del doctor: sin sufijo para no repetirlo
    tituloAbsoluto: true,
  });
}

export default async function PerfilDoctorPage() {
  const [config, PROCEDIMIENTOS, testimonios] = await Promise.all([getConfiguracion(), getServicios(), getTestimonios()]);
  const SITE_URL = config.siteUrl;
  const jsonLd = {
    ...physicianJsonLd(config),
    description: config.especialidad ?? undefined,
    identifier: [
      config.cmp && { '@type': 'PropertyValue', propertyID: 'CMP', value: config.cmp },
      config.rne && { '@type': 'PropertyValue', propertyID: 'RNE', value: config.rne },
    ].filter(Boolean),
    availableService: PROCEDIMIENTOS.map((p) => ({
      '@type': 'MedicalProcedure',
      name: p.nombre,
      url: `${SITE_URL}/procedimientos/${p.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs siteUrl={SITE_URL} items={[{ nombre: 'El especialista', href: RUTA }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy-900">
            {config.nombreDoctor}
          </h1>
          <p className="mt-3 text-lg font-semibold text-medical-700">
            Cirujano general y del aparato digestivo{config.ciudad ? ` en ${config.ciudad}` : ''}
          </p>
        </div>
      </section>

      <DoctorProfile config={config} />

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Procedimientos que realiza</h2>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCEDIMIENTOS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/procedimientos/${p.slug}`}
                  className="h-full flex items-center justify-between gap-3 p-5 rounded-2xl glass-card text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {p.nombre}
                  <ArrowRight className="w-4 h-4 shrink-0 text-medical-500" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TestimonialsSection testimonios={testimonios} />

      <section className="py-14 text-center">
        <h2 className="text-2xl font-extrabold text-navy-900">Agenda tu consulta con el doctor</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Evaluación personalizada y un plan de tratamiento claro.</p>
        <div className="mt-6">
          <BookingButton servicioSlug="consulta-valoracion-quirurgica">Agendar consulta</BookingButton>
        </div>
      </section>
    </>
  );
}
