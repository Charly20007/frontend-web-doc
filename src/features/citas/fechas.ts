/** "2026-11-25" → { dia: "mar", numero: "25", mes: "nov", largo: "martes, 25 de noviembre" } (sin depender de la zona horaria del navegador) */
export const partesFecha = (iso: string) => {
  const [a, m, d] = iso.split('-').map(Number);
  const fecha = new Date(Date.UTC(a, m - 1, d, 12));
  const f = (o: Intl.DateTimeFormatOptions) => fecha.toLocaleDateString('es-PE', { ...o, timeZone: 'UTC' }).replace('.', '');
  return { dia: f({ weekday: 'short' }), numero: String(d), mes: f({ month: 'short' }), largo: f({ weekday: 'long', day: 'numeric', month: 'long' }) };
};

/** Turnos libres que devuelve GET /api/agenda/disponibilidad. */
export interface Disponibilidad {
  reservasActivas: boolean;
  duracionTurnoMinutos: number;
  dias: { fecha: string; turnos: string[] }[];
}
