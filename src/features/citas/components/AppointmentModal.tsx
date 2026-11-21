'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/api';
import { X, Calendar, User, Mail, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ServicioMedico } from '../../catalogo-servicios/types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: ServicioMedico | null;
  servicios: ServicioMedico[];
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedService,
  servicios
}) => {
  const listaServicios = servicios && servicios.length > 0 ? servicios : [
    { id: 1, nombre: 'Colecistectomía Laparoscópica (Cirugía de Vesícula)', slug: 'vesicula', resumen: '', tiempoEstimadoMinutos: 60, especialidadNombre: 'Laparoscopia', destacadoEnWeb: true },
    { id: 2, nombre: 'Reparación de Hernia Inguinal o Umbilical', slug: 'hernia', resumen: '', tiempoEstimadoMinutos: 60, especialidadNombre: 'Hernias', destacadoEnWeb: true },
    { id: 3, nombre: 'Apendicectomía Laparoscópica', slug: 'apendice', resumen: '', tiempoEstimadoMinutos: 45, especialidadNombre: 'Laparoscopia', destacadoEnWeb: true },
    { id: 4, nombre: 'Consulta de Valoración Quirúrgica', slug: 'consulta', resumen: '', tiempoEstimadoMinutos: 30, especialidadNombre: 'General', destacadoEnWeb: true },
    { id: 5, nombre: 'Extirpación de Lipomas y Quistes', slug: 'quistes', resumen: '', tiempoEstimadoMinutos: 30, especialidadNombre: 'Menor', destacadoEnWeb: true }
  ];

  const [idServicio, setIdServicio] = useState<number>(selectedService?.id || 1);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaDeseada, setFechaDeseada] = useState('');
  const [horaDeseada, setHoraDeseada] = useState('10:00');
  const [motivo, setMotivo] = useState('');

  // Preselecciona el procedimiento desde el que se abrió el modal
  useEffect(() => {
    if (isOpen) setIdServicio(selectedService?.id || 1);
  }, [isOpen, selectedService]);

  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const citaDto = {
      IdServicioMedico: Number(idServicio),
      Nombres: nombres,
      Apellidos: apellidos,
      Telefono: telefono,
      Correo: correo,
      FechaHoraInicio: `${fechaDeseada}T${horaDeseada}:00`,
      MotivoConsulta: motivo || 'Solicitud de valoración desde el portal web'
    };

    try {
      await axios.post(`${API_URL}/api/citas`, citaDto, { timeout: 8000 });
      setEnviado(true);
    } catch (err) {
      // No simular éxito: el paciente debe saber si su solicitud no llegó
      const mensajeApi = axios.isAxiosError(err) ? (err.response?.data as { mensaje?: string } | undefined)?.mensaje : undefined;
      setError(mensajeApi ?? 'No pudimos registrar tu solicitud en este momento. Inténtalo de nuevo o llámanos directamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setEnviado(false);
    setNombres('');
    setApellidos('');
    setTelefono('');
    setCorreo('');
    setMotivo('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden text-left transition-colors">
        
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-medical-500/10 dark:bg-medical-500/20 text-medical-600 dark:text-medical-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Reserva de Cita Médica</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Atención personalizada y sin demoras</p>
            </div>
          </div>
          <button 
            onClick={handleResetAndClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {enviado ? (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">¡Reserva Registrada con Éxito!</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Estimado/a <span className="text-slate-900 dark:text-white font-semibold">{nombres}</span>, hemos recibido su solicitud para la consulta de <span className="text-medical-600 dark:text-medical-400 font-semibold">{listaServicios.find(s => s.id === Number(idServicio))?.nombre}</span>.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nuestra coordinadora médica se pondrá en contacto por teléfono ({telefono}) en los próximos 15 minutos para confirmar el consultorio y pre-evaluación.
                </p>
              </div>
              <button
                onClick={handleResetAndClose}
                className="bg-gradient-to-r from-medical-500 to-blue-600 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-lg shadow-medical-500/20 hover:from-medical-600"
              >
                Volver a la Página Principal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center space-x-3 text-red-600 dark:text-red-400 text-xs">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Selección de Servicio */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Procedimiento o Consulta Requerida
                </label>
                <select
                  value={idServicio}
                  onChange={(e) => setIdServicio(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-medical-500 transition-colors"
                >
                  {listaServicios.map((s) => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Datos del Paciente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Nombres del Paciente *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Eduardo"
                      value={nombres}
                      onChange={(e) => setNombres(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-medical-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Mendoza Silva"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-medical-500"
                  />
                </div>
              </div>

              {/* Contacto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="+51 987 654 321"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-medical-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="paciente@correo.com"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-medical-500"
                    />
                  </div>
                </div>
              </div>

              {/* Horario deseado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Fecha Preferida *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={fechaDeseada}
                    onChange={(e) => setFechaDeseada(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-medical-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Hora Aproximada *
                  </label>
                  <select
                    value={horaDeseada}
                    onChange={(e) => setHoraDeseada(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-medical-500"
                  >
                    <option value="09:00">09:00 - Mañana</option>
                    <option value="10:30">10:30 - Mañana</option>
                    <option value="12:00">12:00 - Mediodía</option>
                    <option value="16:00">16:00 - Tarde</option>
                    <option value="17:30">17:30 - Tarde</option>
                    <option value="19:00">19:00 - Noche</option>
                  </select>
                </div>
              </div>

              {/* Síntomas / Motivo */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Síntomas Breves u Observaciones
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej. Dolor punzante luego de comer, tengo tomografía lista..."
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-white/10 rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-medical-500"
                />
              </div>

              {/* Botones */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-medical-500 to-blue-600 hover:from-medical-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg shadow-medical-500/25 flex items-center space-x-2 transition-all disabled:opacity-50"
                >
                  <span>{loading ? 'Transmitiendo...' : 'Confirmar Reserva Médica'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
