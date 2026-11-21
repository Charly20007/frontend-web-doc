'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Menu, Phone, X } from 'lucide-react';
import { formatearTelefono, telHref } from '../../config/site';
import { useSitio } from '../providers/SitioContext';

const ENLACES = [
  { href: '/procedimientos', label: 'Procedimientos' },
  { href: '/dr-juan-carlos-marcos', label: 'El especialista' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
];

export const Navbar: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const pathname = usePathname();
  const { config } = useSitio();
  const [abierto, setAbierto] = useState(false);

  // Cierra el menú móvil al cambiar de página
  useEffect(() => setAbierto(false), [pathname]);

  const activo = (href: string) => pathname?.startsWith(href);
  const telefono = formatearTelefono(config.telefonoPrincipal);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={`${config.nombreDoctor} – inicio`}>
          <img src="/imagenes/logo-dr-juan-carlos-marcos.jpg" alt="" width={44} height={44} className="w-11 h-11 rounded-full object-contain" />
          <span className="leading-tight">
            <span className="block font-display font-extrabold text-[15px] sm:text-base text-navy-900">{config.nombreCorto || config.nombreDoctor}</span>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-medical-600">Cirugía general y digestiva</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:flex items-center gap-1 text-[15px] font-semibold text-slate-600">
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              aria-current={activo(e.href) ? 'page' : undefined}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activo(e.href) ? 'text-medical-700 bg-medical-50' : 'hover:text-navy-900 hover:bg-slate-50'}`}
            >
              {e.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {telefono && (
            <a href={telHref(config.telefonoPrincipal)} className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-bold text-navy-900 hover:text-medical-700">
              <Phone className="w-4 h-4 text-medical-600" />
              {telefono}
            </a>
          )}
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 bg-medical-600 hover:bg-medical-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md shadow-medical-600/20 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Agendar cita
          </button>
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            className="lg:hidden p-2.5 rounded-xl text-navy-900 hover:bg-slate-100 cursor-pointer"
          >
            {abierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {abierto && (
        <div id="menu-movil" className="lg:hidden border-t border-slate-200 bg-white">
          <nav aria-label="Menú móvil" className="max-w-7xl mx-auto px-4 py-4 flex flex-col">
            {ENLACES.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className={`px-3 py-3 rounded-xl text-base font-semibold ${activo(e.href) ? 'text-medical-700 bg-medical-50' : 'text-slate-700'}`}
              >
                {e.label}
              </Link>
            ))}
            <div className="mt-3 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button type="button" onClick={() => { setAbierto(false); onOpenBooking(); }} className="flex items-center justify-center gap-2 bg-medical-600 text-white font-bold px-5 py-3 rounded-xl cursor-pointer">
                <Calendar className="w-4 h-4" /> Agendar cita
              </button>
              {telefono && (
                <a href={telHref(config.telefonoPrincipal)} className="flex items-center justify-center gap-2 border border-slate-300 text-navy-900 font-bold px-5 py-3 rounded-xl">
                  <Phone className="w-4 h-4 text-medical-600" /> {telefono}
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
