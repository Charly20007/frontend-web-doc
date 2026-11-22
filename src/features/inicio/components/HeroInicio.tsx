import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import type { ConfiguracionSitio } from '../../../lib/cms-tipos';
import { fotoDoctor } from '../../../lib/sitio';
import { BotonCita } from '../../../components/ui/BotonCita';
import { BotonWhatsapp } from '../../../components/ui/BotonWhatsapp';

export const HeroInicio: React.FC<{ config: ConfiguracionSitio }> = ({ config }) => (
  <section className="relative overflow-hidden bg-gradient-to-b from-medical-50/70 via-white to-white">
    <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-medical-100/60 blur-3xl pointer-events-none" aria-hidden="true" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pt-10 lg:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      <div className="lg:col-span-7">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-medical-700">
          <span className="w-8 h-px bg-medical-500" aria-hidden="true" />
          Cirujano general en {config.distrito ? `${config.distrito}, ` : ''}{config.ciudad ?? 'Lima'}
        </p>

        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.08] tracking-tight text-navy-900">
          Cirugía general y del aparato digestivo con <span className="text-medical-600">mínima invasión</span>
        </h1>

        <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl">
          Atención especializada en vesícula, hernias, apendicitis y lesiones de piel. Te explicamos tu diagnóstico con claridad
          y, si necesitas cirugía, usamos técnica laparoscópica para una recuperación más cómoda.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <BotonCita servicioSlug="consulta-valoracion-quirurgica">Agendar consulta</BotonCita>
          <BotonWhatsapp />
        </div>

        {(config.cmp || config.rne) && (
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="w-5 h-5 text-medical-600 shrink-0" />
            <span>
              {config.nombreDoctor}
              {config.cmp && <> · CMP {config.cmp}</>}
              {config.rne && <> · RNE {config.rne}</>}
            </span>
          </p>
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="relative mx-auto max-w-lg mr-4 sm:mr-auto lg:mr-4">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-medical-600/90" aria-hidden="true" />
          <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl shadow-navy-900/20 bg-slate-100">
            <Image
              src={fotoDoctor(config)}
              alt={`${config.nombreDoctor}, cirujano general, en sala de operaciones`}
              width={840}
              height={620}
              priority
              className="w-full h-auto aspect-[4/3] object-cover object-[60%_25%]"
            />
          </div>
          <div className="absolute -bottom-6 left-4 right-10 sm:right-auto sm:-left-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4">
            <p className="font-display font-extrabold text-navy-900">{config.nombreDoctor}</p>
            <p className="text-sm text-medical-700 font-semibold">{config.especialidad ?? 'Cirugía General y del Aparato Digestivo'}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
