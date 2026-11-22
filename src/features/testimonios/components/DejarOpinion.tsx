'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle2, MessageSquarePlus, Star, X } from 'lucide-react';
import { API_URL } from '../../../config/api';
import { useSitio } from '../../../components/providers/SitioContext';

interface DejarOpinionProps {
  /** Procedimiento a preseleccionar (por ejemplo, desde su página). */
  idServicio?: number;
  className?: string;
}

const claseInput =
  'w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20';
const claseEtiqueta = 'block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2';
const MINIMO = 20;

/**
 * Botón "Deja tu opinión" + formulario. El testimonio no se publica directamente:
 * llega al CMS como "Por revisar" y el administrador decide si lo aprueba.
 */
export const DejarOpinion: React.FC<DejarOpinionProps> = ({ idServicio, className = '' }) => {
  const { servicios } = useSitio();
  const [abierto, setAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [servicio, setServicio] = useState<string>(idServicio ? String(idServicio) : '');
  const [estrellas, setEstrellas] = useState(5);
  const [comentario, setComentario] = useState('');
  const [contacto, setContacto] = useState('');
  const [autoriza, setAutoriza] = useState(false);
  const [sitio, setSitio] = useState(''); // campo trampa para bots
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e: KeyboardEvent) => e.key === 'Escape' && cerrar();
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [abierto]);

  const cerrar = () => {
    setAbierto(false);
    if (enviado) {
      setEnviado(false);
      setNombre('');
      setComentario('');
      setContacto('');
      setEstrellas(5);
      setAutoriza(false);
    }
    setError(null);
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comentario.trim().length < MINIMO) {
      setError(`Cuéntanos un poco más (mínimo ${MINIMO} caracteres).`);
      return;
    }
    setEnviando(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/api/testimonios`, {
        NombrePaciente: nombre,
        IdServicioMedico: servicio ? Number(servicio) : null,
        CalificacionEstrellas: estrellas,
        Comentario: comentario,
        ContactoPaciente: contacto || null,
        AutorizaPublicacion: autoriza,
        Sitio: sitio || null,
      }, { timeout: 8000 });
      setEnviado(true);
    } catch (err) {
      const datos = axios.isAxiosError(err) ? (err.response?.data as { mensaje?: string; errors?: Record<string, string[]> } | undefined) : undefined;
      const primerError = datos?.errors ? Object.values(datos.errors)[0]?.[0] : undefined;
      setError(datos?.mensaje ?? primerError ?? 'No pudimos enviar tu opinión. Inténtalo de nuevo en unos minutos.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className={`inline-flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-xl text-sm border border-medical-200 bg-white text-medical-700 hover:bg-medical-50 hover:border-medical-300 transition-colors cursor-pointer ${className}`}
      >
        <MessageSquarePlus className="w-4 h-4" /> Deja tu opinión
      </button>

      {abierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-opinion"
          onClick={(e) => e.target === e.currentTarget && cerrar()}
        >
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-left">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
              <div>
                <h3 id="titulo-opinion" className="font-display font-bold text-navy-900 text-lg">Cuéntanos tu experiencia</h3>
                <p className="text-xs text-slate-500">Tu opinión ayuda a otros pacientes a decidir con confianza</p>
              </div>
              <button type="button" onClick={cerrar} aria-label="Cerrar" className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
              {enviado ? (
                <div className="text-center py-6 space-y-5">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-2xl font-bold text-navy-900">¡Gracias, {nombre.split(' ')[0]}!</h4>
                    <p className="text-slate-600">Recibimos tu opinión. Se publicará en la web cuando el consultorio la revise.</p>
                  </div>
                  <button type="button" onClick={cerrar} className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-8 py-3 rounded-xl text-sm cursor-pointer">
                    Listo
                  </button>
                </div>
              ) : (
                <form onSubmit={enviar} className="space-y-5">
                  {error && (
                    <div role="alert" className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <fieldset className="min-w-0">
                    <legend className={claseEtiqueta}>Calificación *</legend>
                    <div className="flex gap-1" role="radiogroup" aria-label="Calificación">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={estrellas === n}
                          aria-label={`${n} ${n === 1 ? 'estrella' : 'estrellas'}`}
                          onClick={() => setEstrellas(n)}
                          className="p-1 cursor-pointer"
                        >
                          <Star className={`w-7 h-7 ${n <= estrellas ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="op-comentario" className={claseEtiqueta}>Tu experiencia *</label>
                    <textarea
                      id="op-comentario" required rows={4} maxLength={1000}
                      placeholder="¿Cómo fue la atención, la cirugía y tu recuperación?"
                      value={comentario} onChange={(e) => setComentario(e.target.value)} className={claseInput}
                    />
                    <p className="mt-1 text-xs text-slate-400 text-right">{comentario.length}/1000</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="op-nombre" className={claseEtiqueta}>Nombre a mostrar *</label>
                      <input id="op-nombre" type="text" required maxLength={100} placeholder="Ej. María F. López" value={nombre} onChange={(e) => setNombre(e.target.value)} className={claseInput} />
                    </div>
                    <div>
                      <label htmlFor="op-servicio" className={claseEtiqueta}>Procedimiento</label>
                      <select id="op-servicio" value={servicio} onChange={(e) => setServicio(e.target.value)} className={claseInput}>
                        <option value="">Prefiero no decirlo</option>
                        {servicios.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="op-contacto" className={claseEtiqueta}>Teléfono o correo (opcional)</label>
                    <input id="op-contacto" type="text" maxLength={150} placeholder="Solo para confirmar que fuiste paciente" value={contacto} onChange={(e) => setContacto(e.target.value)} className={claseInput} />
                    <p className="mt-1 text-xs text-slate-500">No se publica.</p>
                  </div>

                  {/* Campo trampa: oculto para personas; si se llena, es un bot */}
                  <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                    <label htmlFor="op-sitio">Sitio web</label>
                    <input id="op-sitio" type="text" tabIndex={-1} autoComplete="off" value={sitio} onChange={(e) => setSitio(e.target.value)} />
                  </div>

                  <label className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" required checked={autoriza} onChange={(e) => setAutoriza(e.target.checked)} className="mt-0.5 w-4 h-4 accent-medical-600 shrink-0" />
                    <span>
                      Autorizo que mi opinión se publique en esta web con el nombre que indiqué, según la{' '}
                      <a href="/privacidad" target="_blank" rel="noopener" className="font-semibold text-medical-700 underline">política de privacidad</a>.
                    </span>
                  </label>

                  <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4 border-t border-slate-200">
                    <button type="button" onClick={cerrar} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold cursor-pointer">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={enviando}
                      className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md shadow-medical-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {enviando ? 'Enviando…' : 'Enviar opinión'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
