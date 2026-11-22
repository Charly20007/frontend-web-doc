import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, AlertTriangle } from 'lucide-react';
import { MigasDePan } from '../../components/ui/MigasDePan';
import { BotonCita } from '../../components/ui/BotonCita';
import { formatearTelefono, telHref, whatsappHref } from '../../lib/formato';
import { construirMetadata, physicianJsonLd } from '../../lib/seo';
import { numeroWhatsapp, agruparHorarios, direccionCompleta } from '../../lib/sitio';
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
          <MigasDePan siteUrl={config.siteUrl} items={[{ nombre: 'Contacto', href: '/contacto' }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Contacto y ubicación
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            Agenda tu cita en línea, llámanos o visítanos en el consultorio en {config.distrito}.
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card rounded-3xl p-7 space-y-5">
                <h2 className="text-xl font-bold text-slate-900">Consultorio</h2>
                <p className="flex items-start gap-3 text-slate-700">
                  <MapPin className="w-5 h-5 shrink-0 text-medical-500 mt-0.5" />
                  <span>{direccion}</span>
                </p>
                <p className="flex items-center gap-3 text-slate-700">
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
                <p className="flex items-center gap-3 text-slate-700">
                  <Mail className="w-5 h-5 shrink-0 text-medical-500" />
                  <a href={`mailto:${config.correo}`} className="font-semibold hover:underline">{config.correo}</a>
                </p>
                {numeroWhatsapp(config) && (
                  <a href={whatsappHref(numeroWhatsapp(config))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold">
                    Escribir por WhatsApp
                  </a>
                )}
                {config.googleMapsUrl && (
                  <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block text-sm font-semibold text-medical-600 hover:underline">
                    Cómo llegar (Google Maps)
                  </a>
                )}
              </div>

              <div className="glass-card rounded-3xl p-7">
                <h2 className="text-xl font-bold text-slate-900">Horarios de atención</h2>
                <dl className="mt-4 divide-y divide-slate-200 text-sm">
                  {agruparHorarios(config).map((h) => (
                    <div key={h.dias} className="flex justify-between gap-4 py-2.5">
                      <dt className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 text-medical-500" /> {h.dias}
                      </dt>
                      <dd className="font-semibold text-slate-900 text-right">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
                {config.mostrarEmergencias && config.textoEmergencias && (
                  <p className="mt-4 flex items-start gap-2 text-sm text-red-700">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{config.textoEmergencias}{config.telefonoPrincipal && <>. Llama al {formatearTelefono(config.telefonoPrincipal)}.</>}</span>
                  </p>
                )}
              </div>

              <BotonCita>Agendar cita en línea</BotonCita>
            </div>

            <div className="rounded-3xl overflow-hidden border border-slate-200 min-h-[360px]">
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
