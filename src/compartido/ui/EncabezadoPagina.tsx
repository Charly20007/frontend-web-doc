import React from 'react';
import { MigasDePan } from './MigasDePan';

interface EncabezadoPaginaProps {
  siteUrl: string;
  /** Migas después de «Inicio». La última es la página actual. */
  migas: { nombre: string; href: string }[];
  titulo: string;
  descripcion?: React.ReactNode;
  /** Bajada corta y destacada (por ejemplo, la especialidad en el perfil). */
  destacada?: boolean;
}

/** Cabecera de una página interior: migas de pan, título principal (h1) y bajada. */
export const EncabezadoPagina: React.FC<EncabezadoPaginaProps> = ({ siteUrl, migas, titulo, descripcion, destacada }) => (
  <>
    <MigasDePan siteUrl={siteUrl} items={migas} />
    <div className="mt-6 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy-900">{titulo}</h1>
      {descripcion && (
        <p className={destacada ? 'mt-3 text-lg font-semibold text-medical-700' : 'mt-4 text-lg text-slate-600 leading-relaxed'}>{descripcion}</p>
      )}
    </div>
  </>
);
