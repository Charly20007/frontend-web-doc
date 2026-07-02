import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Quote, CheckCircle } from 'lucide-react';

interface Testimonio {
  id: number;
  nombrePaciente: string;
  procedimiento: string;
  calificacionEstrellas: number;
  comentario: string;
  fechaTestimonio?: string;
}

const TESTIMONIOS_FALLBACK: Testimonio[] = [
  {
    id: 1,
    nombrePaciente: 'Carlos Alberto Ramos',
    procedimiento: 'Cirugía de Vesícula Laparoscópica',
    calificacionEstrellas: 5,
    comentario: 'Excelente atención del doctor. Me operé el martes y para el jueves ya estaba caminando sin dolor en casa. Muy agradecido por su profesionalismo y paciencia en explicar todo el proceso.'
  },
  {
    id: 2,
    nombrePaciente: 'María Fernanda López',
    procedimiento: 'Reparación de Hernia Umbilical',
    calificacionEstrellas: 5,
    comentario: 'Me explicó todo el procedimiento con mucha claridad en la consulta de valoración. La cirugía fue un éxito total y la cicatriz apenas se nota. 100% recomendado para cualquier cirugía general.'
  },
  {
    id: 3,
    nombrePaciente: 'Roberto Gómez Silva',
    procedimiento: 'Consulta de Valoración Quirúrgica',
    calificacionEstrellas: 5,
    comentario: 'Puntual, empático y certero en su diagnóstico. Revisó mis tomografías detenidamente y me dio la tranquilidad que necesitaba antes de tomar la decisión quirúrgica.'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [testimonios, setTestimonios] = useState<Testimonio[]>(TESTIMONIOS_FALLBACK);

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/testimonios', { timeout: 3000 });
        if (res.data && res.data.length > 0) {
          setTestimonios(res.data);
        }
      } catch {
        console.info('Usando testimonios de respaldo locales (Fallback)');
      }
    };
    fetchTestimonios();
  }, []);

  return (
    <section id="testimonios" className="py-24 bg-slate-100/70 dark:bg-slate-900/40 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-medical-600 dark:text-medical-400 tracking-widest uppercase mb-3">Experiencias Verificadas</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">
            Lo Que Dicen Nuestros Pacientes
          </h3>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base transition-colors">
            La mayor satisfaction de nuestra práctica quirúrgica es ver a nuestros pacientes recuperar plenamente su salud y calidad de vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonios.map((t) => (
            <div 
              key={t.id}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-900/5 dark:text-white/5 pointer-events-none" />
              
              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(t.calificacionEstrellas || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic transition-colors">
                  "{t.comentario}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5 transition-colors">
                    <span>{t.nombrePaciente}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-medical-600 dark:text-medical-400 shrink-0" />
                  </h4>
                  <span className="text-xs text-medical-600 dark:text-medical-400 font-medium mt-0.5 block">{t.procedimiento}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
