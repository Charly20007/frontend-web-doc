import React from 'react';
import { ShieldCheck, Activity, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 lg:pt-6 lg:pb-16 transition-colors duration-300">
      {/* Luces decorativas de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-medical-500/15 dark:bg-medical-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Contenido principal */}
          <div className="lg:col-span-7 space-y-4 lg:space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-medical-500/10 border border-medical-500/20 text-medical-600 dark:text-medical-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Certificado en Cirugía General y del Aparato Digestivo</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight transition-colors">
              Cirugía General y del <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 via-blue-500 to-cyan-500 dark:from-medical-400 dark:via-blue-300 dark:to-cyan-400">Aparato Digestivo</span> por Mínima Invasión
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed transition-colors">
              Recuperación hasta <span className="text-slate-900 dark:text-white font-semibold underline decoration-medical-500 decoration-2">3 veces más rápida</span> con técnicas laparoscópicas avanzadas y precisión quirúrgica para enfermedades del sistema digestivo, vesícula y pared abdominal.
            </p>

            {/* Puntos clave */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-medical-600 dark:text-medical-400 shrink-0" />
                <span>Incisiones Milimétricas</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-medical-600 dark:text-medical-400 shrink-0" />
                <span>Alta Hospitalaria 24h</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-medical-600 dark:text-medical-400 shrink-0" />
                <span>Recuperación Sin Dolor</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-gradient-to-r from-medical-500 to-blue-600 hover:from-medical-600 hover:to-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-medical-500/30 hover:shadow-medical-500/50 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base group"
              >
                <span>Agendar Consulta de Valoración</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#servicios"
                className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-5 py-3.5 rounded-xl border border-slate-300 dark:border-white/10 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <span>Ver Procedimientos</span>
              </a>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">+1,500</div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Cirugías Exitosas</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">15+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-medical-600 dark:text-medical-400">99.8%</div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Satisfacción Pacientes</div>
              </div>
            </div>
          </div>

          {/* Tarjeta visual con la FOTO DE CIRUGÍA REAL del Dr. Juan Carlos Marcos Enriquez */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-gradient-to-b from-white to-slate-100 dark:from-slate-800/80 dark:to-navy-900 shadow-2xl p-6 transition-colors">
                
                {/* Cabecera del card médico */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 mb-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 flex items-center justify-center p-1 shadow-sm shrink-0">
                      <img 
                        src="/WhatsApp Image 2026-07-02 at 12.36.06 PM (1).jpeg" 
                        alt="Logo Dr." 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-extrabold text-sm sm:text-base leading-tight">Dr. Juan Marcos</h3>
                      <p className="text-xs text-medical-600 dark:text-medical-400 font-semibold">Cirugía General y Digestiva</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20 shrink-0">
                    En Quirófano
                  </span>
                </div>

                {/* Foto oficial del cirujano operando en quirófano */}
                <div className="relative rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-white/10 shadow-lg bg-slate-950 group">
                  <img 
                    src="/WhatsApp Image 2026-07-02 at 12.36.06 PM (2).jpeg" 
                    alt="Dr. Juan Carlos Marcos Enriquez en Quirófano" 
                    className="w-full h-auto max-h-[320px] object-contain mx-auto group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="p-3 bg-slate-900 dark:bg-navy-950 border-t border-white/10 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold px-3 py-1 rounded-xl bg-medical-500/20 border border-medical-500/30 text-medical-400">
                      ⚡ Precisión Laparoscópica en Tiempo Real
                    </span>
                  </div>
                </div>

                {/* Características destacadas en la tarjeta */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/5 flex items-start space-x-3 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Visión Laparoscópica 3D / 4K Ultra HD</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">Máxima precisión quirúrgica para intervenciones seguras y sin daño al tejido sano.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/5 flex items-start space-x-3 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-medical-500/10 text-medical-600 dark:text-medical-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Bisturí Armónico & Sellador Vascular</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">Tecnología hemostática que minimiza el sangrado y acelera la cicatrización.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
