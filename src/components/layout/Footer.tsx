import React from 'react';
import { Stethoscope, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-slate-900 dark:bg-navy-950 border-t border-slate-800 dark:border-white/10 text-slate-400 text-sm py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Bio y Marca */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-500 to-blue-700 flex items-center justify-center shadow-lg shadow-medical-500/20">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-base">Dr. Juan Carlos Marcos Enriquez</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Especialista en Cirugía General y del Aparato Digestivo. Miembro de la Sociedad de Cirujanos brindando atención médica oportuna y segura.
            </p>
          </div>

          {/* Columna 2: Ubicación */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Consultorio & Clínica</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-medical-400 shrink-0 mt-0.5" />
                <span>Av. Javier Prado Este 1234, Consultorio 502, San Isidro, Lima</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-medical-400 shrink-0" />
                <span>Citas: (01) 999-8887 / +51 987 654 321</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-medical-400 shrink-0" />
                <span>consultas@cirujanogeneral.pe</span>
              </div>
            </div>
          </div>

          {/* Columna 3: Horarios */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Horarios de Atención</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-medical-400" /> Lunes - Viernes</span>
                <span className="text-white font-medium">09:00 - 20:00</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-medical-400" /> Sábados</span>
                <span className="text-white font-medium">09:00 - 13:00</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-red-400 font-medium">Emergencias Quirúrgicas</span>
                <span className="text-white font-bold">24 / 7</span>
              </div>
            </div>
          </div>

          {/* Columna 4: Enlaces SEO rápidos */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Especialidades Quirúrgicas</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#servicios" className="hover:text-medical-400 transition-colors">Cirugía de Vesícula (Laparoscópica)</a></li>
              <li><a href="#servicios" className="hover:text-medical-400 transition-colors">Reparación de Hernia Inguinal</a></li>
              <li><a href="#servicios" className="hover:text-medical-400 transition-colors">Apendicectomía de Urgencia</a></li>
              <li><a href="#servicios" className="hover:text-medical-400 transition-colors">Cirugía Menor y Lipomas</a></li>
              <li><a href="#servicios" className="hover:text-medical-400 transition-colors">Consulta de Valoración Quirúrgica</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dr. Juan Carlos Marcos Enriquez. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacidad de Datos Médicos</span>
            <span className="hover:text-slate-400 cursor-pointer">Términos de Servicio</span>
            <span className="hover:text-slate-400 cursor-pointer">Aviso de Consentimiento Informado</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
