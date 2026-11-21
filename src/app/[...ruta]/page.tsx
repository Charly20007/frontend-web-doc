import { notFound } from 'next/navigation';
import { redirigirSiCorresponde } from '../../lib/redirecciones';

/**
 * Atrapa cualquier URL que no corresponde a una página existente.
 * Si el CMS tiene una redirección para ella (p. ej. de una web anterior), redirige;
 * si no, muestra la página 404.
 */
export default async function RutaDesconocida({ params }: { params: Promise<{ ruta: string[] }> }) {
  const { ruta } = await params;
  await redirigirSiCorresponde(`/${ruta.join('/')}`);
  notFound();
}
