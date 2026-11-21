import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { ETIQUETA_CMS } from '../../../lib/cms';

/**
 * La API .NET llama a este endpoint cada vez que se guarda algo en el CMS.
 * Invalida la caché de datos para que la web muestre los cambios en la siguiente visita.
 */
export async function POST(request: Request) {
  const secreto = process.env.REVALIDATE_SECRET;
  const recibido = request.headers.get('x-revalidate-secret') ?? '';

  if (!secreto) {
    return Response.json({ mensaje: 'REVALIDATE_SECRET no está configurado en la web.' }, { status: 500 });
  }
  const a = Buffer.from(recibido);
  const b = Buffer.from(secreto);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ mensaje: 'No autorizado' }, { status: 401 });
  }

  // expire: 0 → la próxima visita ya obtiene los datos nuevos (sin servir contenido antiguo)
  revalidateTag(ETIQUETA_CMS, { expire: 0 });
  return Response.json({ revalidado: true, fecha: new Date().toISOString() });
}
