import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Shield, Scissors, Stethoscope, Clock, ArrowRight, Check } from 'lucide-react';

import type { ServicioMedico } from '../types';
export type { ServicioMedico };

interface ServicesSectionProps {
  onSelectService: (service: ServicioMedico) => void;
}

const SERVICIOS_FALLBACK: ServicioMedico[] = [
  {
    id: 1,
    nombre: 'Colecistectomía Laparoscópica (Cirugía de Vesícula)',
    slug: 'cirugia-de-vesicula-laparoscopica',
    resumen: 'Extirpación de la vesícula biliar por mínima invasión. Rápida recuperación en 24 a 48 horas sin cicatrices visibles.',
    tiempoEstimadoMinutos: 60,
    precioReferencial: 3500.00,
    icono: 'Activity',
    especialidadNombre: 'Cirugía Laparoscópica',
    destacadoEnWeb: true
  },
  {
    id: 2,
    nombre: 'Reparación de Hernia Inguinal o Umbilical',
    slug: 'cirugia-de-hernia-inguinal-umbilical',
    resumen: 'Corrección quirúrgica con colocación de malla biocompatible de alta calidad para evitar recurrencias y aliviar el dolor al instante.',
    tiempoEstimadoMinutos: 60,
    precioReferencial: 3000.00,
    icono: 'Shield',
    especialidadNombre: 'Cirugía de Pared Abdominal',
    destacadoEnWeb: true
  },
  {
    id: 3,
    nombre: 'Apendicectomía Laparoscópica (Cirugía de Apéndice)',
    slug: 'cirugia-de-apendice-laparoscopica',
    resumen: 'Tratamiento seguro y oportuno para la apendicitis aguda con incisiones milimétricas, mínima estancia y recuperación inmediata.',
    tiempoEstimadoMinutos: 45,
    precioReferencial: 3200.00,
    icono: 'Activity',
    especialidadNombre: 'Cirugía Laparoscópica',
    destacadoEnWeb: true
  },
  {
    id: 4,
    nombre: 'Consulta de Valoración Quirúrgica Especializada',
    slug: 'consulta-valoracion-quirurgica',
    resumen: 'Evaluación médica integral para diagnóstico preciso, revisión ecográfica/tomográfica y planificación personalizada de cirugía.',
    tiempoEstimadoMinutos: 30,
    precioReferencial: 200.00,
    icono: 'Stethoscope',
    especialidadNombre: 'Cirugía General',
    destacadoEnWeb: true
  },
  {
    id: 5,
    nombre: 'Extirpación de Lipomas, Quistes y Lunares',
    slug: 'cirugia-lipomas-y-quistes',
    resumen: 'Procedimiento ambulatorio indoloro con anestesia local para lesiones en tejidos blandos con el mejor resultado estético.',
    tiempoEstimadoMinutos: 30,
    precioReferencial: 500.00,
    icono: 'Scissors',
    especialidadNombre: 'Cirugía Menor Ambulatoria',
    destacadoEnWeb: true
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [servicios, setServicios] = useState<ServicioMedico[]>(SERVICIOS_FALLBACK);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/servicios?soloDestacados=true', { timeout: 3000 });
        if (res.data && res.data.length > 0) {
          setServicios(res.data);
        }
      } catch {
        console.info('Usando catálogos de servicios locales (Fallback resiliente)');
      } finally {
        setLoading(false);
      }
    };
    fetchServicios();
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
      case 'Shield': return <Shield className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
      case 'Scissors': return <Scissors className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
      default: return <Stethoscope className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
    }
  };

  return (
    <section id="servicios" className="py-14 bg-slate-100/70 dark:bg-slate-900/40 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-semibold text-medical-600 dark:text-medical-400 tracking-widest uppercase mb-3">Especialidades & Procedimientos</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">
            Intervenciones Quirúrgicas de Vanguardia
          </h3>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed transition-colors">
            Utilizamos instrumental de alta tecnología y protocolos europeos para minimizar el trauma quirúrgico y asegurar un retorno óptimo a su rutina laboral y familiar.
          </p>
        </div>

        {/* Listado de Tarjetas */}
        {loading ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">Cargando catálogo de especialidades médicas...</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((s) => (
            <div 
              key={s.id} 
              className="glass-card rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Luz sutil al hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-medical-500/10 rounded-full blur-2xl group-hover:bg-medical-500/20 transition-all pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-inner group-hover:border-medical-500/50 transition-colors">
                    {getIcon(s.icono)}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/5">
                    {s.especialidadNombre}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
                  {s.nombre}
                </h4>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
                  {s.resumen}
                </p>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 space-y-2">
                  <div className="flex items-center text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4 mr-2 text-medical-600 dark:text-medical-400 shrink-0" />
                    <span>Tiempo de cirugía/consulta: ~{s.tiempoEstimadoMinutos} min</span>
                  </div>
                  <div className="flex items-center text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Check className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Recuperación asistida con seguimiento 24/7</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Inversión referencial</span>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {s.precioReferencial ? `S/ ${s.precioReferencial.toLocaleString()}` : 'A consultar'}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(s)}
                  className="bg-slate-900 hover:bg-medical-600 dark:bg-navy-900 dark:hover:bg-medical-500 text-white font-semibold px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 hover:border-medical-500 transition-all duration-300 flex items-center space-x-1.5 text-xs shadow-sm group-hover:shadow-medical-500/20"
                >
                  <span>Agendar Cita</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Llamado a la acción adicional */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-navy-900 text-white border border-slate-800 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-xl font-bold text-white">¿Necesita una segunda opinión médica o tiene una cirugía urgente?</h4>
            <p className="text-sm text-slate-300 mt-1">Atendemos emergencias de apendicitis y dolores vesiculares urgentes en clínicas aliadas.</p>
          </div>
          <button
            onClick={() => onSelectService(servicios[3] || SERVICIOS_FALLBACK[3])}
            className="bg-white text-navy-950 font-bold px-6 py-3.5 rounded-xl hover:bg-medical-100 transition-colors shrink-0 text-sm shadow-lg"
          >
            Solicitar Valoración Prioritaria
          </button>
        </div>

      </div>
    </section>
  );
};
