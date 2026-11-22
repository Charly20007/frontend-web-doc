import type { Metadata } from 'next';
import { PaginaLegalVista, metadataLegal } from '../../compartido/legal/PaginaLegalVista';

export function generateMetadata(): Promise<Metadata> {
  return metadataLegal('terminos');
}

export default function TerminosPage() {
  return <PaginaLegalVista clave="terminos" />;
}
