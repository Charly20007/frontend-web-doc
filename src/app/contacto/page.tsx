import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, AlertTriangle } from 'lucide-react';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { BookingButton } from '../../components/ui/BookingButton';
import { formatearTelefono, numeroWhatsapp, agruparHorarios, construirMetadata, direccionCompleta, physicianJsonLd, telHref, whatsappHref } from '../../config/site';
import { getConfiguracion, getPaginaSeo } from '../../lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const [config, pagina] = await Promise.all([getConfiguracion(), getPaginaSeo('contacto')]);
  return construirMetadata({
    config,
    ruta: '/contacto',
    seo: pagina?.seo,
    tituloRespaldo: 'Contacto y ubicación',
    descripcionRespaldo: `Consultorio del ${config.nombreDoctor} en ${direccionCompleta(config)}.`,
  });
}

export default async function ContactoPage() {
  const config = await getConfiguracion();
  const direccion = direccionCompleta(config);
  const mapaUrl = `https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd(config)) }} />

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs siteUrl={config.siteUrl} items={[{ nombre: 'Contacto', href: '/contacto' }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Contacto y ubicación
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
            Agenda tu cita en línea, llámanos o visítanos en el consultorio en {config.distrito}.
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card rounded-3xl p-7 space-y-5">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Consultorio</h2>
                <p className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-5 h-5 shrink-0 text-medical-500 mt-0.5" />
                  <span>{direccion}</span>
                </p>
                <p className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Phone className="w-5 h-5 shrink-0 text-medical-500" />
                  <span>
                    <a href={telHref(config.telefonoPrincipal)} className="font-semibold hover:underline">{formatearTelefono(config.telefonoPrincipal)}</a>
                    {config.telefonoSecundario && (
                      <>
                        {' / '}
                        <a href={telHref(config.telefonoSecundario)} className="font-semibold hover:underline">{formatearTelefono(config.telefonoSecundario)}</a>
                      </>
                    )}
                  </span>
                </p>
                <p className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Mail className="w-5 h-5 shrink-0 text-medical-500" />
                  <a href={`mailto:${config.correo}`} className="font-semibold hover:underline">{config.correo}</a>
                </p>
                {numeroWhatsapp(config) && (
                  <a href={whatsappHref(numeroWhatsapp(config))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold">
                    Escribir por WhatsApp
                  </a>
                )}
                {config.googleMapsUrl && (
                  <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block text-sm font-semibold text-medical-600 dark:text-medical-400 hover:underline">
                    Cómo llegar (Google Maps)
                  </a>
                )}
              </div>

              <div className="glass-card rounded-3xl p-7">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Horarios de atención</h2>
                <dl className="mt-4 divide-y divide-slate-200 dark:divide-white/10 text-sm">
                  {agruparHorarios(config).map((h) => (
                    <div key={h.dias} className="flex justify-between gap-4 py-2.5">
                      <dt className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Clock className="w-4 h-4 text-medical-500" /> {h.dias}
                      </dt>
                      <dd className="font-semibold text-slate-900 dark:text-white text-right">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 flex items-start gap-2 text-sm text-red-700 dark:text-red-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  Emergencias quirúrgicas las 24 horas: llama al {formatearTelefono(config.telefonoPrincipal)}.
                </p>
              </div>

              <BookingButton>Agendar cita en línea</BookingButton>
            </div>

            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 min-h-[360px]">
              <iframe
                title={`Mapa del consultorio en ${config.distrito ?? ''}`}
                src={mapaUrl}
                className="w-full h-full min-h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
