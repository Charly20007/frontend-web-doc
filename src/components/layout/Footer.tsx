'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { formatearTelefono, numeroWhatsapp, agruparHorarios, direccionCompleta, telHref, whatsappHref } from '../../config/site';
import { useSitio } from '../providers/SitioContext';

export const Footer: React.FC = () => {
  const { config, servicios, legales } = useSitio();
  const redes = [
    { url: config.facebookUrl, nombre: 'Facebook' },
    { url: config.instagramUrl, nombre: 'Instagram' },
    { url: config.tikTokUrl, nombre: 'TikTok' },
    { url: config.youTubeUrl, nombre: 'YouTube' },
    { url: config.linkedInUrl, nombre: 'LinkedIn' },
  ].filter((r) => r.url);

  return (
    <footer id="contacto" className="bg-navy-950 border-t border-white/10 text-slate-300 text-sm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Bio y Marca */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/imagenes/logo-dr-juan-carlos-marcos.jpg" alt="" width={44} height={44} className="w-11 h-11 rounded-full bg-white object-contain shrink-0" />
              <Link href="/dr-juan-carlos-marcos" className="font-bold text-white text-base hover:text-medical-400">{config.nombreDoctor}</Link>
            </div>
            {config.descripcionPie && <p className="text-sm text-slate-300 leading-relaxed">{config.descripcionPie}</p>}
            <p className="text-xs text-slate-400 leading-relaxed">
              {config.especialidad ?? 'Especialista en Cirugía General y del Aparato Digestivo.'}
              {config.cmp && <> CMP {config.cmp}{config.rne && <> · RNE {config.rne}</>}.</>}
            </p>
            {redes.length > 0 && (
              <ul className="flex flex-wrap gap-3 text-xs">
                {redes.map((r) => (
                  <li key={r.nombre}><a href={r.url!} target="_blank" rel="noopener noreferrer me" className="hover:text-medical-400">{r.nombre}</a></li>
                ))}
              </ul>
            )}
          </div>

          {/* Columna 2: Ubicación */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Consultorio & Clínica</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-medical-400 shrink-0 mt-0.5" />
                <Link href="/contacto" className="hover:text-medical-400">{direccionCompleta(config)}</Link>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-medical-400 shrink-0" />
                <span>
                  Citas:{' '}
                  <a href={telHref(config.telefonoPrincipal)} className="hover:text-medical-400">{formatearTelefono(config.telefonoPrincipal)}</a>
                  {config.telefonoSecundario && (
                    <>
                      {' / '}
                      <a href={telHref(config.telefonoSecundario)} className="hover:text-medical-400">{formatearTelefono(config.telefonoSecundario)}</a>
                    </>
                  )}
                </span>
              </div>
              {numeroWhatsapp(config) && (
                <div className="flex items-center space-x-2.5">
                  <MessageCircle className="w-4 h-4 text-medical-400 shrink-0" />
                  <a href={whatsappHref(numeroWhatsapp(config))} target="_blank" rel="noopener noreferrer" className="hover:text-medical-400">WhatsApp {formatearTelefono(numeroWhatsapp(config))}</a>
                </div>
              )}
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-medical-400 shrink-0" />
                <a href={`mailto:${config.correo}`} className="hover:text-medical-400">{config.correo}</a>
              </div>
            </div>
          </div>

          {/* Columna 3: Horarios */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Horarios de Atención</h4>
            <div className="space-y-2 text-xs">
              {agruparHorarios(config).map((h) => (
                <div key={h.dias} className="flex items-start justify-between gap-3 py-1 border-b border-white/5">
                  <span className="flex items-center gap-1.5 shrink-0"><Clock className="w-3.5 h-3.5 text-medical-400" /> {h.dias}</span>
                  <span className="text-white font-medium text-right">{h.horas}</span>
                </div>
              ))}
              {config.mostrarEmergencias && config.textoEmergencias && (
                <p className="pt-2 text-red-300 font-semibold">{config.textoEmergencias}</p>
              )}
            </div>
          </div>

          {/* Columna 4: Enlaces SEO rápidos */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Especialidades Quirúrgicas</h4>
            <ul className="space-y-2 text-xs">
              {servicios.map((p) => (
                <li key={p.slug}>
                  <Link href={`/procedimientos/${p.slug}`} className="hover:text-medical-400 transition-colors">{p.nombre}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {config.nombreDoctor}. Todos los derechos reservados.</p>
          {legales.length > 0 && (
            <nav aria-label="Enlaces legales">
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 sm:mt-0">
                {legales.map((l) => (
                  <li key={l.clave}><Link href={l.ruta} className="hover:text-slate-300">{l.titulo.split(' y ')[0]}</Link></li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
};
