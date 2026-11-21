import type { Metadata } from 'next';
import { PaginaLegalVista, metadataLegal } from '../../components/legal/PaginaLegalVista';

export function generateMetadata(): Promise<Metadata> {
  return metadataLegal('consentimiento');
}

export default function ConsentimientoPage() {
  return <PaginaLegalVista clave="consentimiento" />;
}
