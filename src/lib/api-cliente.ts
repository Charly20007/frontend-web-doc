import axios from 'axios';
import { API_URL } from '../config/api';

/**
 * Cliente para las llamadas a la API desde el navegador (formularios, turnos libres).
 * Las lecturas de contenido se hacen en el servidor con lib/cms.ts.
 */
export const apiCliente = axios.create({ baseURL: API_URL, timeout: 8000 });

/** Código HTTP de un error de la API (por ejemplo 409 si otro paciente tomó el turno). */
export const codigoDeError = (err: unknown) => (axios.isAxiosError(err) ? err.response?.status : undefined);

/**
 * Mensaje para mostrar al paciente. La API responde { mensaje } en los errores de negocio
 * y { errors: { campo: [...] } } cuando falla una validación del formulario.
 */
export function mensajeDeError(err: unknown, respaldo: string): string {
  if (!axios.isAxiosError(err)) return respaldo;
  const datos = err.response?.data as { mensaje?: string; errors?: Record<string, string[]> } | undefined;
  return datos?.mensaje ?? (datos?.errors ? Object.values(datos.errors)[0]?.[0] : undefined) ?? respaldo;
}
