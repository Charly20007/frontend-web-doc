import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import type { Testimonio } from '../../../lib/cms-tipos';
import { DejarOpinion } from '../../testimonios/components/DejarOpinion';

interface TestimonialsSectionProps {
  testimonios: Testimonio[];
  etiqueta?: string;
  titulo?: string;
  descripcion?: string;
  /** Procedimiento a preseleccionar en "Deja tu opinión". */
  idServicio?: number;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonios,
  etiqueta = 'Experiencias Verificadas',
  titulo = 'Lo Que Dicen Nuestros Pacientes',
  descripcion = 'La mayor satisfacción de nuestra práctica quirúrgica es ver a nuestros pacientes recuperar plenamente su salud y calidad de vida.',
  idServicio,
}) => {
  // Sin testimonios publicados: solo la invitación a dejar el primero
  if (testimonios.length === 0) {
    return (
      <section id="testimonios" className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">¿Fuiste paciente del doctor?</h2>
          <p className="mt-2 text-slate-600">Cuéntanos tu experiencia: ayuda a otros pacientes a decidir con confianza.</p>
          <DejarOpinion idServicio={idServicio} className="mt-6" />
        </div>
      </section>
    );
  }

  return (
    <section id="testimonios" className="py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-medical-700">{etiqueta}</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">{titulo}</h2>
          <p className="mt-4 text-lg text-slate-600">{descripcion}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonios.map((t) => (
            <li key={t.id}>
              <figure className="h-full flex flex-col rounded-2xl bg-white border border-slate-200 p-7 relative">
                <Quote className="absolute top-6 right-6 w-9 h-9 text-medical-100" aria-hidden="true" />
                <div className="flex gap-0.5" aria-label={`${t.calificacionEstrellas} de 5 estrellas`}>
                  {Array.from({ length: t.calificacionEstrellas || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 text-slate-700 leading-relaxed flex-grow">“{t.comentario}”</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 font-bold text-navy-900">
                    {t.nombrePaciente}
                    <CheckCircle className="w-4 h-4 text-medical-600 shrink-0" aria-hidden="true" />
                  </span>
                  <span className="block text-sm text-medical-700 mt-0.5">{t.procedimiento}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600 mb-3">¿Fuiste paciente del doctor? Tu opinión ayuda a otros pacientes.</p>
          <DejarOpinion idServicio={idServicio} />
        </div>
      </div>
    </section>
  );
};
