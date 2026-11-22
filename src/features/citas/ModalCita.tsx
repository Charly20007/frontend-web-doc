'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, User, Mail, Phone } from 'lucide-react';
import { apiCliente, codigoDeError, mensajeDeError } from '../../lib/api-cliente';
import { Modal } from '../../compartido/ui/Modal';
import { AlertaError, PantallaExito, claseBotonPrincipal, claseBotonSecundario, claseEtiqueta, claseInput } from '../../compartido/ui/Formulario';
import type { Servicio } from '../../lib/cms-tipos';
import { formatearTelefono, telHref } from '../../lib/formato';
import { useSitio } from '../../compartido/providers/SitioContext';
import { SelectorTurno } from './SelectorTurno';
import { partesFecha, type Disponibilidad } from './fechas';

interface ModalCitaProps {
  abierto: boolean;
  alCerrar: () => void;
  servicioInicial: Servicio | null;
  servicios: Servicio[];
}

const SLUG_CONSULTA = 'consulta-valoracion-quirurgica';

/**
 * Formulario de reserva: el paciente elige un turno libre de la agenda real
 * (horarios del CMS − citas ya tomadas − bloqueos). Al enviarlo, el turno queda ocupado.
 */
export const ModalCita: React.FC<ModalCitaProps> = ({ abierto, alCerrar, servicioInicial, servicios }) => {
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

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Turnos libres en el momento (sin caché: cambian con cada reserva)
  const cargarAgenda = useCallback(async () => {
    setCargandoAgenda(true);
    setErrorAgenda(false);
    try {
      const { data } = await apiCliente.get<Disponibilidad>('/api/agenda/disponibilidad', { params: { _: Date.now() } });
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
    if (!abierto) return;
    // Preselecciona el procedimiento desde el que se abrió el modal (o la consulta de valoración)
    setIdServicio(servicioInicial?.id ?? consulta?.id ?? servicios[0]?.id ?? 0);
    void cargarAgenda();
  }, [abierto, servicioInicial, consulta, servicios, cargarAgenda]);

  if (!abierto) return null;

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fecha || !hora) {
      setError('Elige un día y un horario disponible.');
      return;
    }
    setEnviando(true);
    setError(null);

    try {
      await apiCliente.post('/api/citas', {
        IdServicioMedico: Number(idServicio),
        Nombres: nombres,
        Apellidos: apellidos,
        Telefono: telefono,
        Correo: correo,
        FechaHoraInicio: `${fecha}T${hora}:00`,
        MotivoConsulta: motivo || null,
      });
      setEnviado(true);
    } catch (err) {
      setError(mensajeDeError(err, 'No pudimos registrar tu reserva en este momento. Inténtalo de nuevo o llámanos directamente.'));
      // Si otro paciente tomó el turno, se actualizan los horarios libres
      if (codigoDeError(err) === 409) void cargarAgenda();
    } finally {
      setEnviando(false);
    }
  };

  const cerrar = () => {
    setEnviado(false);
    setError(null);
    setNombres('');
    setApellidos('');
    setTelefono('');
    setCorreo('');
    setMotivo('');
    setHora(null);
    setAceptaPrivacidad(false);
    alCerrar();
  };

  const telefonoConsultorio = formatearTelefono(config.telefonoPrincipal);

  return (
    <Modal titulo="Reservar consulta" subtitulo="Elige un horario disponible y completa tus datos" icono={<Calendar className="w-5 h-5" />} alCerrar={cerrar}>
      {enviado && fecha && hora ? (
        <PantallaExito titulo="¡Turno reservado!" alCerrar={cerrar}>
          <p className="text-slate-600">
            {nombres}, tu turno es el <strong className="text-navy-900">{partesFecha(fecha).largo}</strong> a las <strong className="text-navy-900">{hora}</strong>.
          </p>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Te contactaremos al {telefono} para confirmarlo. Si necesitas cambiarlo, llámanos{telefonoConsultorio && <> al <a href={telHref(config.telefonoPrincipal)} className="font-semibold text-medical-700">{telefonoConsultorio}</a></>}.
          </p>
        </PantallaExito>
      ) : (
        <form onSubmit={enviar} className="space-y-6">
          {error && <AlertaError mensaje={error} />}

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
          <SelectorTurno
            agenda={agenda}
            cargando={cargandoAgenda}
            error={errorAgenda}
            fecha={fecha}
            hora={hora}
            telefono={config.telefonoPrincipal}
            alElegirFecha={(f) => { setFecha(f); setHora(null); }}
            alElegirHora={setHora}
            alReintentar={() => void cargarAgenda()}
          />

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
            <button type="button" onClick={cerrar} className={claseBotonSecundario}>
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando || !hora || !agenda?.reservasActivas}
              className={claseBotonPrincipal}
            >
              {enviando ? 'Reservando…' : hora && fecha ? `Reservar ${partesFecha(fecha).dia} ${partesFecha(fecha).numero} · ${hora}` : 'Elige un horario'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
