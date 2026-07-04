import React from 'react';
import { Award, GraduationCap, HeartPulse, CheckCircle, Shield, Building2 } from 'lucide-react';

export const DoctorProfile: React.FC = () => {
  return (
    <section id="perfil" className="py-14 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Columna visual del perfil con fotos reales del doctor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-navy-900 p-6 sm:p-8 shadow-2xl relative transition-colors">
                
                {/* Banner Oficial del Dr. Juan Carlos Marcos Enriquez */}
                <div className="rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-white/10 shadow-md bg-slate-950">
                  <img 
                    loading="lazy"
                    src="/WhatsApp Image 2026-07-02 at 12.36.06 PM.jpeg" 
                    alt="Banner Dr. Juan Carlos Marcos Enriquez" 
                    className="w-full h-auto max-h-[160px] object-contain mx-auto"
                  />
                </div>

                {/* Foto en acción / cirugía */}
                <div className="relative rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-white/10 shadow-lg bg-slate-950 group">
                  <img 
                    loading="lazy"
                    src="/WhatsApp Image 2026-07-02 at 12.36.06 PM (4).jpeg" 
                    alt="Dr. Juan Carlos Marcos Enriquez realizando cirugía laparoscópica" 
                    className="w-full h-auto max-h-[380px] object-contain mx-auto group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="p-3 bg-slate-900 dark:bg-navy-950 border-t border-white/10 flex items-center justify-center text-center">
                    <span className="text-white text-xs font-semibold px-3 py-1 rounded-xl bg-medical-500/20 border border-medical-500/30 text-medical-400">
                      🏥 Cirugía del Aparato Digestivo de Alta Especialidad
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Dr. Juan Carlos Marcos Enriquez</h3>
                <p className="text-sm font-bold text-medical-600 dark:text-medical-400 mt-1">Especialista en Cirugía General y del Aparato Digestivo</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">CMP: 45892 | RNE: 23104</p>

                <div className="mt-6 space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <Building2 className="w-4 h-4 text-medical-600 dark:text-medical-400 mr-3 shrink-0" />
                    <span>Cirujano Especialista Titular en Hospitales y Clínicas de Prestigio</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <GraduationCap className="w-4 h-4 text-medical-600 dark:text-medical-400 mr-3 shrink-0" />
                    <span>Formación de Excelencia en Cirugía Laparoscópica Avanzada</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <Shield className="w-4 h-4 text-medical-600 dark:text-medical-400 mr-3 shrink-0" />
                    <span>Miembro Titular de la Sociedad Peruana de Cirugía Endoscópica</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/5 flex items-center justify-between text-xs transition-colors">
                  <span className="text-slate-500 dark:text-slate-400">Seguros Médicos Aliados</span>
                  <span className="font-bold text-slate-900 dark:text-white">Pacífico, Rímac, Mapfre y Sanitas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biografía y Filosofía Quirúrgica */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-medical-500/10 text-medical-600 dark:text-medical-400 text-xs font-bold uppercase tracking-wider">
              <HeartPulse className="w-4 h-4" />
              <span>Filosofía & Trayectoria</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">
              "La mejor cirugía es aquella que resuelve el problema con la menor invasión posible para el cuerpo."
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed transition-colors">
              Con más de 15 años de trayectoria ininterrumpida en quirófano, el **Dr. Juan Carlos Marcos Enriquez** ha dedicado su carrera profesional al perfeccionamiento de las técnicas de mínima invasión y al tratamiento integral de las enfermedades del aparato digestivo. A diferencia de las cirugías abiertas tradicionales que requieren grandes cortes y semanas de reposo, su enfoque laparoscópico utiliza micro-cámaras 4K y conductos milimétricos.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed transition-colors">
              Cada intervención se planifica con un rigor médico exhaustivo, priorizando la máxima seguridad del paciente, una hemostasia perfecta con instrumental ultrasónico y un protocolo de analgesia multimodal para que el dolor postoperatorio sea prácticamente nulo.
            </p>

            {/* Otra foto adicional del doctor operando */}
            <div className="pt-2">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg bg-slate-950 group max-w-lg">
                <img 
                  loading="lazy"
                  src="/WhatsApp Image 2026-07-02 at 12.36.06 PM (3).jpeg" 
                  alt="Dr. Juan Carlos Marcos Enriquez en intervención quirúrgica" 
                  className="w-full h-auto max-h-[380px] object-contain mx-auto group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="p-4 bg-slate-900 dark:bg-navy-950 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-extrabold text-medical-400 block">Compromiso Quirúrgico</span>
                    <p className="text-sm font-bold text-white mt-0.5 leading-snug">Tecnología de última generación y calidez humana en cada intervención.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 flex items-start space-x-3 transition-colors">
                <Award className="w-6 h-6 text-medical-600 dark:text-medical-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Seguridad Quirúrgica 360°</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Monitoreo continuo y evaluación pre-quirúrgica integral para reducir riesgos a cero.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 flex items-start space-x-3 transition-colors">
                <CheckCircle className="w-6 h-6 text-medical-600 dark:text-medical-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Transparencia & Ética</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Diagnósticos certeros sin recomendar cirugías innecesarias. Todo se explica al detalle.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
