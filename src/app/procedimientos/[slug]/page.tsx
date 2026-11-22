import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, Clock, ArrowRight, AlertTriangle, HeartPulse, BookOpen } from 'lucide-react';
import { TestimonialsSection } from '../../../features/perfil-medico/components/TestimonialsSection';
import { BookingButton } from '../../../components/ui/BookingButton';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';
import { formatearTelefono, construirMetadata, telHref } from '../../../config/site';
import { getArticulos, getConfiguracion, getServicio, getServicios, getTestimonios } from '../../../lib/cms';
import { redirigirSiCorresponde } from '../../../lib/redirecciones';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Los procedimientos nuevos creados en el CMS se generan bajo demanda (sin recompilar)
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getServicios()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [config, p] = await Promise.all([getConfiguracion(), getServicio(slug)]);
  if (!p) return { title: 'Procedimiento no encontrado', robots: { index: false } };

  return construirMetadata({
    config,
    ruta: `/procedimientos/${p.slug}`,
    seo: p.seo,
    tituloRespaldo: p.nombre,
    descripcionRespaldo: p.resumen,
  });
}

export default async function ProcedimientoPage({ params }: PageProps) {
  const { slug } = await params;
  const [config, p] = await Promise.all([getConfiguracion(), getServicio(slug)]);
  if (!p) {
    await redirigirSiCorresponde(`/procedimientos/${slug}`);
    notFound();
  }

  const [testimonios, todosArticulos, servicios] = await Promise.all([getTestimonios(p.slug), getArticulos(), getServicios()]);
  const articulos = todosArticulos.filter((a) => a.servicioRelacionado?.slug === p.slug);
  const otros = servicios.filter((o) => o.slug !== p.slug);
  const SITE_URL = config.siteUrl;
  const nombreCorto = p.nombreCorto || p.nombre;
  const metaTitulo = p.seo.metaTitulo || p.nombre;
  const metaDescripcion = p.seo.metaDescripcion || p.resumen;

  const url = `${SITE_URL}/procedimientos/${p.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      '@id': url,
      url,
      name: metaTitulo,
      description: metaDescripcion,
      inLanguage: 'es-PE',
      reviewedBy: { '@id': `${SITE_URL}/#physician` },
      about: {
        '@type': 'MedicalProcedure',
        name: p.nombre,
        procedureType: 'https://schema.org/SurgicalProcedure',
        ...(p.condicionTratada && {
          indication: { '@type': 'MedicalCondition', name: p.condicionTratada },
        }),
      },
      provider: {
        '@type': 'Physician',
        '@id': `${SITE_URL}/#physician`,
        name: config.nombreDoctor,
        url: `${SITE_URL}/dr-juan-carlos-marcos`,
      },
    },
    ...(p.preguntas.length === 0 ? [] : [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.preguntas.map((q) => ({
        '@type': 'Question',
        name: q.titulo,
        acceptedAnswer: { '@type': 'Answer', text: q.texto },
      })),
    },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Encabezado */}
      <section className="pt-8 pb-12 bg-slate-100/70 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs siteUrl={SITE_URL} items={[{ nombre: 'Procedimientos', href: '/procedimientos' }, { nombre: nombreCorto, href: `/procedimientos/${p.slug}` }]} />

          <span className="mt-6 inline-block text-xs font-semibold px-3 py-1 rounded-full bg-medical-500/10 text-medical-600 dark:text-medical-400 border border-medical-500/20">
            {p.especialidadNombre}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {p.nombre}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">{p.resumen}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-medical-500" /> Duración aprox.: {p.tiempoEstimadoMinutos} min
            </span>
            {p.precioReferencial && (
              <span>
                Inversión referencial:{' '}
                <strong className="text-slate-900 dark:text-white">S/ {p.precioReferencial.toLocaleString('es-PE')}</strong>
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <BookingButton servicioSlug={p.slug}>Agendar evaluación</BookingButton>
            {config.telefonoPrincipal && <a
              href={telHref(config.telefonoPrincipal)}
              className="inline-flex items-center px-6 py-3.5 rounded-xl border border-slate-300 dark:border-white/10 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/5 transition-colors"
            >
              Llamar: {formatearTelefono(config.telefonoPrincipal)}
            </a>}
          </div>
        </div>
      </section>

      <article className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Introducción */}
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            {p.introduccion.map((parrafo, i) => (
              <p key={i}>{parrafo.texto}</p>
            ))}
          </div>

          {/* Indicaciones / síntomas */}
          {p.indicaciones.length > 0 && <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{p.tituloIndicaciones || '¿Cuándo se recomienda?'}</h2>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {p.indicaciones.map(({ texto: item }) => {
                const urgente = /urgen/i.test(item);
                return (
                  <li
                    key={item}
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-sm leading-relaxed ${
                      urgente
                        ? 'border-red-300 bg-red-50 text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300'
                        : 'border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-navy-900/60 dark:text-slate-300'
                    }`}
                  >
                    {urgente ? (
                      <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-medical-500" />
                    )}
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </section>}

          {/* Cómo es el procedimiento */}
          {p.pasos.length > 0 && <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">¿Cómo es el procedimiento?</h2>
            <ol className="mt-6 space-y-4">
              {p.pasos.map((paso, i) => (
                <li key={i} className="flex gap-4 p-5 rounded-2xl glass-card">
                  <span className="w-9 h-9 shrink-0 rounded-xl bg-medical-500 text-white font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    {paso.titulo && <h3 className="font-bold text-slate-900 dark:text-white">{paso.titulo}</h3>}
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{paso.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>}

          {/* Recuperación */}
          {p.recuperacion.length > 0 && <section className="p-6 sm:p-8 rounded-3xl bg-medical-50 dark:bg-navy-900/80 border-l-4 border-medical-500">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <HeartPulse className="w-6 h-6 text-medical-500" />
              {p.slug === 'consulta-valoracion-quirurgica' ? 'Cómo prepararte para la consulta' : 'Recuperación'}
            </h2>
            <ul className="mt-4 space-y-2 text-slate-700 dark:text-slate-300">
              {p.recuperacion.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 shrink-0 text-emerald-500" />
                  <span>{r.texto}</span>
                </li>
              ))}
            </ul>
          </section>}

          {/* Preguntas frecuentes */}
          {p.preguntas.length > 0 && <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Preguntas frecuentes</h2>
            <div className="mt-6 space-y-3">
              {p.preguntas.map((q, i) => (
                <details key={i} className="group p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900/60">
                  <summary className="cursor-pointer list-none font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4">
                    <h3 className="text-base">{q.titulo}</h3>
                    <ArrowRight className="w-4 h-4 shrink-0 text-medical-500 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{q.texto}</p>
                </details>
              ))}
            </div>
          </section>}

          {/* Artículos relacionados del blog */}
          {articulos.length > 0 && (
            <section>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-medical-500" /> Artículos relacionados
              </h2>
              <ul className="mt-4 space-y-3">
                {articulos.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/blog/${a.slug}`} className="font-semibold text-medical-600 dark:text-medical-400 hover:underline underline-offset-4">
                      {a.titulo}
                    </Link>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{a.resumen}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      {testimonios.length > 0 && (
        <TestimonialsSection
          testimonios={testimonios}
          idServicio={p.id}
          etiqueta="Experiencias de pacientes"
          titulo={`Pacientes de ${nombreCorto.toLowerCase()}`}
          descripcion="Lo que cuentan quienes ya pasaron por este procedimiento."
        />
      )}

      {/* CTA final + otros procedimientos */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-navy-900 text-white border border-slate-800 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h2 className="text-xl font-bold">¿Tienes dudas sobre tu caso?</h2>
              <p className="text-sm text-slate-300 mt-1">
                Agenda una evaluación con el {config.nombreDoctor} y recibe un diagnóstico claro.
              </p>
            </div>
            <BookingButton servicioSlug={p.slug} variant="light" className="shrink-0">
              Agendar evaluación
            </BookingButton>
          </div>

          <h2 className="mt-14 text-xl font-extrabold text-slate-900 dark:text-white">Otros procedimientos</h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otros.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/procedimientos/${o.slug}`}
                  className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-medical-500/50 bg-white dark:bg-navy-900/60 text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  {o.nombre}
                  <ArrowRight className="w-4 h-4 shrink-0 text-medical-500" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
