import type { Metadata } from 'next';
import { PaginaLegalVista, metadataLegal } from '../../shared/legal/PaginaLegalVista';

export function generateMetadata(): Promise<Metadata> {
  return metadataLegal('privacidad');
}

export default function PrivacidadPage() {
  return <PaginaLegalVista clave="privacidad" />;
}
