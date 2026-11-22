'use client';

import React, { useState } from 'react';
import { MessageSquarePlus, Star } from 'lucide-react';
import { apiCliente, mensajeDeError } from '../../../lib/api-cliente';
import { useSitio } from '../../../components/providers/SitioContext';
import { Modal } from '../../../components/ui/Modal';
import { AlertaError, PantallaExito, claseBotonPrincipal, claseBotonSecundario, claseEtiqueta, claseInput } from '../../../components/ui/Formulario';

interface DejarOpinionProps {
  /** Procedimiento a preseleccionar (por ejemplo, desde su página). */
  idServicio?: number;
  className?: string;
}

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
      await apiCliente.post('/api/testimonios', {
        NombrePaciente: nombre,
        IdServicioMedico: servicio ? Number(servicio) : null,
        CalificacionEstrellas: estrellas,
        Comentario: comentario,
        ContactoPaciente: contacto || null,
        AutorizaPublicacion: autoriza,
        Sitio: sitio || null,
      });
      setEnviado(true);
    } catch (err) {
      setError(mensajeDeError(err, 'No pudimos enviar tu opinión. Inténtalo de nuevo en unos minutos.'));
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
        <Modal titulo="Cuéntanos tu experiencia" subtitulo="Tu opinión ayuda a otros pacientes a decidir con confianza" ancho="lg" alCerrar={cerrar}>
          {enviado ? (
            <PantallaExito titulo={`¡Gracias, ${nombre.split(' ')[0]}!`} alCerrar={cerrar}>
              <p className="text-slate-600">Recibimos tu opinión. Se publicará en la web cuando el consultorio la revise.</p>
            </PantallaExito>
          ) : (
            <form onSubmit={enviar} className="space-y-5">
              {error && <AlertaError mensaje={error} />}

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
                <button type="button" onClick={cerrar} className={claseBotonSecundario}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={enviando}
                  className={claseBotonPrincipal}
                >
                  {enviando ? 'Enviando…' : 'Enviar opinión'}
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </>
  );
};
