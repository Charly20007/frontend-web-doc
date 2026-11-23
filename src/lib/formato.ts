/** Formato de textos para mostrar en la web (teléfonos, enlaces, fechas). Sin dependencias del CMS. */

/** "+51 1 999 8887" → "tel:+5119998887" */
export const telHref = (telefono?: string | null) => (telefono ? `tel:${telefono.replace(/[^\d+]/g, '')}` : undefined);

/**
 * Muestra los números peruanos en el formato que la gente reconoce:
 * "+5119998887" → "(01) 999-8887" · "+51987654321" → "987 654 321".
 * Cualquier otro formato se deja como está.
 */
export function formatearTelefono(telefono?: string | null): string {
  if (!telefono) return '';
  let d = telefono.replace(/\D/g, '');
  if (d.startsWith('51') && (d.length === 11 || d.length === 10)) d = d.slice(2);
  if (d.length === 9 && d.startsWith('9')) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  if (d.length === 8 && d.startsWith('1')) return `(01) ${d.slice(1, 4)}-${d.slice(4)}`;
  return telefono;
}

/**
 * Enlace a la web de una clínica que, al abrirse, baja hasta el nombre del doctor y lo resalta
 * (fragmento de texto «#:~:text=»; los navegadores que no lo entienden simplemente abren la página).
 */
export const enlaceClinica = (url: string, texto?: string | null) => {
  const limpio = url.trim();
  if (!texto?.trim() || limpio.includes('#')) return limpio;
  return `${limpio}#:~:text=${encodeURIComponent(texto.trim())}`;
};

/** "+51 987 654 321" → "https://wa.me/51987654321" */
export const whatsappHref = (telefono?: string | null) => (telefono ? `https://wa.me/${telefono.replace(/\D/g, '')}` : undefined);

/** "2026-07-02T00:00:00" → "02 de Julio, 2026" */
export function formatearFecha(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .replace(/ de (\p{L}+) de (\d{4})/u, (_, mes: string, anio: string) => ` de ${mes[0].toUpperCase()}${mes.slice(1)}, ${anio}`);
}
