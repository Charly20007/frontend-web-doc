'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/api';
import { X, Calendar, User, Mail, Phone, CheckCircle2, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import type { ServicioMedico } from '../../catalogo-servicios/types';
import { formatearTelefono, telHref } from '../../../config/site';
import { useSitio } from '../../../components/providers/SitioContext';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: ServicioMedico | null;
  servicios: ServicioMedico[];
}

interface Disponibilidad {
  reservasActivas: boolean;
  duracionTurnoMinutos: number;
  dias: { fecha: string; turnos: string[] }[];
}

const SLUG_CONSULTA = 'consulta-valoracion-quirurgica';
const claseInput =
  'w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20';
const claseEtiqueta = 'block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2';

/** "2026-11-25" → { dia: "mar", numero: "25", mes: "nov" } (sin depender de la zona horaria del navegador) */
const partesFecha = (iso: string) => {
  const [a, m, d] = iso.split('-').map(Number);
  const fecha = new Date(Date.UTC(a, m - 1, d, 12));
  const f = (o: Intl.DateTimeFormatOptions) => fecha.toLocaleDateString('es-PE', { ...o, timeZone: 'UTC' }).replace('.', '');
  return { dia: f({ weekday: 'short' }), numero: String(d), mes: f({ month: 'short' }), largo: f({ weekday: 'long', day: 'numeric', month: 'long' }) };
};

/**
 * Formulario de reserva: el paciente elige un turno libre de la agenda real
 * (horarios del CMS − citas ya tomadas − bloqueos). Al enviarlo, el turno queda ocupado.
 */
export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, selectedService, servicios }) => {
  const { config } = useSitio();
  const consulta = servicios.find((s) => s.slug === SLUG_CONSULTA);
  const [idServicio, setIdServicio] = useState<number>(0);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);

  const [agenda, setAgenda] = useState<Disponibilidad | null>(null);
  const [cargandoAgenda, setCargandoAgenda] = useState(false);
  const [errorAgenda, setErrorAgenda] = useState(false);
  const [fecha, setFecha] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Turnos libres en el momento (sin caché: cambian con cada reserva)
  const cargarAgenda = useCallback(async () => {
    setCargandoAgenda(true);
    setErrorAgenda(false);
    try {
      const { data } = await axios.get<Disponibilidad>(`${API_URL}/api/agenda/disponibilidad`, { timeout: 8000, params: { _: Date.now() } });
      setAgenda(data);
      setFecha((actual) => (actual && data.dias.some((d) => d.fecha === actual) ? actual : data.dias[0]?.fecha ?? null));
      setHora(null);
    } catch {
      setErrorAgenda(true);
    } finally {
      setCargandoAgenda(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    // Preselecciona el procedimiento desde el que se abrió el modal (o la consulta de valoración)
    setIdServicio(selectedService?.id ?? consulta?.id ?? servicios[0]?.id ?? 0);
    void cargarAgenda();
  }, [isOpen, selectedService, consulta, servicios, cargarAgenda]);

  const turnosDelDia = useMemo(() => agenda?.dias.find((d) => d.fecha === fecha)?.turnos ?? [], [agenda, fecha]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fecha || !hora) {
      setError('Elige un día y un horario disponible.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/api/citas`, {
        IdServicioMedico: Number(idServicio),
        Nombres: nombres,
        Apellidos: apellidos,
        Telefono: telefono,
        Correo: correo,
        FechaHoraInicio: `${fecha}T${hora}:00`,
        MotivoConsulta: motivo || null,
      }, { timeout: 8000 });
      setEnviado(true);
    } catch (err) {
      const respuesta = axios.isAxiosError(err) ? err.response : undefined;
      const mensajeApi = (respuesta?.data as { mensaje?: string } | undefined)?.mensaje;
      setError(mensajeApi ?? 'No pudimos registrar tu reserva en este momento. Inténtalo de nuevo o llámanos directamente.');
      // Si otro paciente tomó el turno, se actualizan los horarios libres
      if (respuesta?.status === 409) void cargarAgenda();
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setEnviado(false);
    setError(null);
    setNombres('');
    setApellidos('');
    setTelefono('');
    setCorreo('');
    setMotivo('');
    setHora(null);
    setAceptaPrivacidad(false);
    onClose();
  };

  const telefonoConsultorio = formatearTelefono(config.telefonoPrincipal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="titulo-reserva">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-left">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 id="titulo-reserva" className="font-display font-bold text-navy-900 text-lg">Reservar consulta</h3>
              <p className="text-xs text-slate-500">Elige un horario disponible y completa tus datos</p>
            </div>
          </div>
          <button type="button" onClick={handleResetAndClose} aria-label="Cerrar" className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {enviado && fecha && hora ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-display text-2xl font-bold text-navy-900">¡Turno reservado!</h4>
                <p className="text-slate-600">
                  {nombres}, tu turno es el <strong className="text-navy-900">{partesFecha(fecha).largo}</strong> a las <strong className="text-navy-900">{hora}</strong>.
                </p>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Te contactaremos al {telefono} para confirmarlo. Si necesitas cambiarlo, llámanos{telefonoConsultorio && <> al <a href={telHref(config.telefonoPrincipal)} className="font-semibold text-medical-700">{telefonoConsultorio}</a></>}.
                </p>
              </div>
              <button type="button" onClick={handleResetAndClose} className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-8 py-3 rounded-xl text-sm cursor-pointer">
                Listo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div role="alert" className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. Motivo de la consulta */}
              <div>
                <label htmlFor="cita-servicio" className={claseEtiqueta}>¿Sobre qué quieres consultar?</label>
                <select id="cita-servicio" value={idServicio} onChange={(e) => setIdServicio(Number(e.target.value))} className={claseInput}>
                  {servicios.map((s) => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
              </div>

              {/* 2. Turno */}
              <fieldset className="min-w-0">
                <legend className={claseEtiqueta}>Elige día y hora *</legend>
                {cargandoAgenda && !agenda && <p className="text-sm text-slate-500 flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Buscando horarios disponibles…</p>}

                {errorAgenda && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 flex flex-wrap items-center justify-between gap-3">
                    <span>No pudimos cargar los horarios.{telefonoConsultorio && <> También puedes llamarnos al {telefonoConsultorio}.</>}</span>
                    <button type="button" onClick={() => void cargarAgenda()} className="font-bold underline cursor-pointer">Reintentar</button>
                  </div>
                )}

                {agenda && !agenda.reservasActivas && (
                  <p className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
                    Por ahora las citas se agendan por teléfono{telefonoConsultorio && <>: <a href={telHref(config.telefonoPrincipal)} className="font-semibold text-medical-700">{telefonoConsultorio}</a></>}.
                  </p>
                )}

                {agenda?.reservasActivas && agenda.dias.length === 0 && (
                  <p className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
                    No hay turnos disponibles en los próximos días.{telefonoConsultorio && <> Llámanos al <a href={telHref(config.telefonoPrincipal)} className="font-semibold text-medical-700">{telefonoConsultorio}</a> y te buscamos un espacio.</>}
                  </p>
                )}

                {agenda?.reservasActivas && agenda.dias.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1" role="radiogroup" aria-label="Día">
                      {agenda.dias.map((d) => {
                        const p = partesFecha(d.fecha);
                        const activo = d.fecha === fecha;
                        return (
                          <button
                            key={d.fecha}
                            type="button"
                            role="radio"
                            aria-checked={activo}
                            aria-label={p.largo}
                            onClick={() => { setFecha(d.fecha); setHora(null); }}
                            className={`shrink-0 w-16 py-2 rounded-xl border text-center cursor-pointer transition-colors ${activo ? 'bg-medical-600 border-medical-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-medical-300'}`}
                          >
                            <span className="block text-[11px] uppercase font-semibold opacity-80">{p.dia}</span>
                            <span className="block text-lg font-bold leading-tight">{p.numero}</span>
                            <span className="block text-[11px] opacity-80">{p.mes}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="Hora">
                      {turnosDelDia.map((t) => (
                        <button
                          key={t}
                          type="button"
                          role="radio"
                          aria-checked={hora === t}
                          onClick={() => setHora(t)}
                          className={`py-2 rounded-lg border text-sm font-semibold cursor-pointer transition-colors ${hora === t ? 'bg-medical-600 border-medical-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-medical-300'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Cada turno dura {agenda.duracionTurnoMinutos} minutos. Solo se muestran horarios libres.
                    </p>
                  </div>
                )}
              </fieldset>

              {/* 3. Datos del paciente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cita-nombres" className={claseEtiqueta}>Nombres *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input id="cita-nombres" type="text" required maxLength={100} placeholder="Ej. Carlos Eduardo" value={nombres} onChange={(e) => setNombres(e.target.value)} className={`${claseInput} pl-10`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="cita-apellidos" className={claseEtiqueta}>Apellidos *</label>
                  <input id="cita-apellidos" type="text" required maxLength={100} placeholder="Ej. Mendoza Silva" value={apellidos} onChange={(e) => setApellidos(e.target.value)} className={claseInput} />
                </div>
                <div>
                  <label htmlFor="cita-telefono" className={claseEtiqueta}>Teléfono / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input id="cita-telefono" type="tel" required placeholder="+51 987 654 321" value={telefono} onChange={(e) => setTelefono(e.target.value)} className={`${claseInput} pl-10`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="cita-correo" className={claseEtiqueta}>Correo electrónico *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input id="cita-correo" type="email" required maxLength={100} placeholder="paciente@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} className={`${claseInput} pl-10`} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="cita-motivo" className={claseEtiqueta}>Síntomas u observaciones</label>
                <textarea id="cita-motivo" rows={2} maxLength={500} placeholder="Ej. Dolor luego de comer, tengo una ecografía…" value={motivo} onChange={(e) => setMotivo(e.target.value)} className={claseInput} />
              </div>

              {/* Consentimiento para el tratamiento de datos (Ley N.° 29733) */}
              <label className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" required checked={aceptaPrivacidad} onChange={(e) => setAceptaPrivacidad(e.target.checked)} className="mt-0.5 w-4 h-4 accent-medical-600 shrink-0" />
                <span>
                  Acepto que mis datos se usen para gestionar mi cita, según la{' '}
                  <a href="/privacidad" target="_blank" rel="noopener" className="font-semibold text-medical-700 underline">política de privacidad</a>.
                </span>
              </label>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4 border-t border-slate-200">
                <button type="button" onClick={handleResetAndClose} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold cursor-pointer">
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading || !hora || !agenda?.reservasActivas}
                  className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md shadow-medical-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? 'Reservando…' : hora && fecha ? `Reservar ${partesFecha(fecha).dia} ${partesFecha(fecha).numero} · ${hora}` : 'Elige un horario'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
