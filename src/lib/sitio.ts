import type { ConfiguracionSitio } from './cms-tipos';

/**
 * Datos derivados de la configuración del consultorio. Los datos en sí se editan en el CMS
 * (Datos del consultorio) y llegan desde la API con getConfiguracion().
 */

/** Foto principal del doctor (portada y perfil), editable en el CMS. */
export const FOTO_DOCTOR_RESPALDO = '/imagenes/dr-juan-carlos-marcos-cirujano.jpg';
export const fotoDoctor = (c: ConfiguracionSitio) => c.fotoDoctorUrl || FOTO_DOCTOR_RESPALDO;

export const nombreMarca = (c: ConfiguracionSitio) => c.nombreCorto || c.nombreDoctor;

export const direccionCompleta = (c: ConfiguracionSitio) =>
  [c.direccion, c.distrito, c.ciudad].filter(Boolean).join(', ');

/** Número de WhatsApp: el configurado, o el celular si el secundario es un móvil peruano. */
export function numeroWhatsapp(c: ConfiguracionSitio): string | null {
  if (c.whatsApp) return c.whatsApp;
  const d = (c.telefonoSecundario ?? '').replace(/\D/g, '').replace(/^51(?=9\d{8}$)/, '');
  return /^9\d{8}$/.test(d) ? `+51${d}` : null;
}

const DIAS = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

/**
 * Agrupa los tramos por día y une los días consecutivos con el mismo horario:
 * [{ dias: 'Lunes - Viernes', horas: '09:00 - 13:00 / 16:00 - 20:00' }, ...]
 */
export function agruparHorarios(c: ConfiguracionSitio): { dias: string; horas: string }[] {
  const porDia = new Map<number, string>();
  for (const h of [...c.horarios].sort((a, b) => a.diaSemana - b.diaSemana || a.horaInicio.localeCompare(b.horaInicio))) {
    const tramo = `${h.horaInicio} - ${h.horaFin}`;
    porDia.set(h.diaSemana, porDia.has(h.diaSemana) ? `${porDia.get(h.diaSemana)} / ${tramo}` : tramo);
  }
  const grupos: { desde: number; hasta: number; horas: string }[] = [];
  for (const [dia, horas] of porDia) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.horas === horas && ultimo.hasta === dia - 1) ultimo.hasta = dia;
    else grupos.push({ desde: dia, hasta: dia, horas });
  }
  return grupos.map((g) => ({ dias: g.desde === g.hasta ? DIAS[g.desde] : `${DIAS[g.desde]} - ${DIAS[g.hasta]}`, horas: g.horas }));
}
