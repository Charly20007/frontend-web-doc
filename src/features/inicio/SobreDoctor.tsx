import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ConfiguracionSitio } from '../../lib/cms-tipos';
import { Encabezado } from './Encabezado';

const PUNTOS = [
  'Diagnóstico claro: te explicamos tu caso y todas las alternativas.',
  'Cirugía solo cuando es necesaria; si no, tratamiento médico y seguimiento.',
  'Técnica laparoscópica para menos dolor y un regreso más rápido a casa.',
  'Acompañamiento antes y después de la operación.',
];

export const SobreDoctor: React.FC<{ config: ConfiguracionSitio }> = ({ config }) => (
  <section className="py-20 lg:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="relative order-2 lg:order-1">
        <Image
          src="/imagenes/cirugia-laparoscopica-quirofano.jpg"
          alt={`${config.nombreDoctor} durante una cirugía laparoscópica`}
          width={960}
          height={760}
          className="rounded-3xl w-full h-auto object-cover shadow-xl"
        />
        <div className="absolute -bottom-5 right-5 bg-navy-900 text-white rounded-2xl px-5 py-4 shadow-xl max-w-[16rem]">
          <p className="text-xs uppercase tracking-wider text-medical-300 font-bold">Especialidad</p>
          <p className="mt-1 text-sm font-semibold leading-snug">{config.especialidad ?? 'Cirugía General y del Aparato Digestivo'}</p>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <Encabezado antetitulo="El especialista" titulo={config.nombreDoctor} />
        <p className="mt-5 text-lg text-slate-600 leading-relaxed">
          Cirujano general y del aparato digestivo dedicado a la cirugía de mínima invasión. Su prioridad es que cada paciente
          entienda su diagnóstico y tome decisiones informadas y con tranquilidad.
        </p>
        <ul className="mt-7 space-y-3">
          {PUNTOS.map((p) => (
            <li key={p} className="flex items-start gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-medical-600" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <Link href="/dr-juan-carlos-marcos" className="mt-8 inline-flex items-center gap-1.5 font-bold text-medical-700 hover:text-medical-800">
          Conocer su trayectoria <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);
