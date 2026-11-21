import React from 'react';
import Image from 'next/image';
import { BadgeCheck, CheckCircle2, HeartHandshake, Stethoscope } from 'lucide-react';
import type { ConfiguracionSitio } from '../../../lib/cms-tipos';

const ENFOQUE = [
  { titulo: 'Diagnóstico claro', texto: 'Revisamos tus síntomas y exámenes y te explicamos tu caso con palabras sencillas, junto con todas las alternativas.' },
  { titulo: 'Cirugía solo si es necesaria', texto: 'Cuando el tratamiento médico es suficiente, lo indicamos. La decisión de operar se toma contigo e informada.' },
  { titulo: 'Mínima invasión', texto: 'Siempre que es posible usamos técnica laparoscópica: incisiones pequeñas, menos dolor y una recuperación más cómoda.' },
  { titulo: 'Acompañamiento', texto: 'Te orientamos en la preparación, el día de la cirugía y los controles posteriores hasta tu recuperación.' },
];

/** Perfil del doctor (página /dr-juan-carlos-marcos). Solo muestra datos verificables del CMS. */
export const DoctorProfile: React.FC<{ config: ConfiguracionSitio }> = ({ config }) => (
  <>
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5">
          <Image
            src="/imagenes/dr-juan-carlos-marcos-cirujano.jpg"
            alt={`${config.nombreDoctor} en sala de operaciones`}
            width={840}
            height={620}
            className="rounded-3xl w-full h-auto object-cover shadow-xl"
          />
          <dl className="mt-6 rounded-2xl border border-slate-200 divide-y divide-slate-200 text-sm">
            {config.especialidad && (
              <div className="flex items-start gap-3 p-4">
                <dt><Stethoscope className="w-5 h-5 text-medical-600" /><span className="sr-only">Especialidad</span></dt>
                <dd className="text-slate-700">{config.especialidad}</dd>
              </div>
            )}
            {(config.cmp || config.rne) && (
              <div className="flex items-start gap-3 p-4">
                <dt><BadgeCheck className="w-5 h-5 text-medical-600" /><span className="sr-only">Colegiatura</span></dt>
                <dd className="text-slate-700">
                  {config.cmp && <>Colegio Médico del Perú: <strong className="text-navy-900">CMP {config.cmp}</strong></>}
                  {config.rne && <> · Registro Nacional de Especialista: <strong className="text-navy-900">RNE {config.rne}</strong></>}
                </dd>
              </div>
            )}
            {config.segurosAliados && (
              <div className="flex items-start gap-3 p-4">
                <dt><HeartHandshake className="w-5 h-5 text-medical-600" /><span className="sr-only">Seguros</span></dt>
                <dd className="text-slate-700">Seguros aliados: {config.segurosAliados}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-widest text-medical-700">Sobre el doctor</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
            Cirugía con criterio, explicada con claridad
          </h2>
          <div className="mt-6 space-y-4 text-lg text-slate-600 leading-relaxed">
            <p>
              El {config.nombreDoctor} es especialista en cirugía general y del aparato digestivo. Su práctica se centra en el
              tratamiento de enfermedades de la vesícula, hernias de la pared abdominal, apendicitis y lesiones de piel y tejidos blandos.
            </p>
            <p>
              Trabaja con técnicas de mínima invasión siempre que el caso lo permite, y da especial importancia a que cada paciente
              entienda su diagnóstico, sus opciones y lo que puede esperar antes y después de la cirugía.
            </p>
          </div>

          <h3 className="mt-10 font-display text-xl font-bold text-navy-900">Nuestro enfoque</h3>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENFOQUE.map((e) => (
              <li key={e.titulo} className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <p className="flex items-center gap-2 font-bold text-navy-900">
                  <CheckCircle2 className="w-5 h-5 text-medical-600 shrink-0" /> {e.titulo}
                </p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{e.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  </>
);
