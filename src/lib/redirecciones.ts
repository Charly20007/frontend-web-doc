import { permanentRedirect, redirect } from 'next/navigation';
import { buscarRedireccion } from './cms';

/**
 * Si la ruta tiene una redirección configurada en el CMS (por ejemplo, porque cambió
 * la URL de un procedimiento), redirige allí. Si no, no hace nada.
 */
export async function redirigirSiCorresponde(ruta: string): Promise<void> {
  const r = await buscarRedireccion(ruta);
  if (!r) return;
  if (r.esPermanente) permanentRedirect(r.rutaDestino);
  redirect(r.rutaDestino);
}
