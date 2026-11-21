/**
 * URL base de la API .NET (backend-doc).
 * Se define con NEXT_PUBLIC_API_URL en .env.local (ver .env.example).
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5029').replace(/\/$/, '');
