import Link from 'next/link';

export default function NoEncontrada() {
  return (
    <section className="py-24 text-center px-4">
      <p className="text-sm font-bold text-medical-600 dark:text-medical-400">Error 404</p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">No encontramos esta página</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Puede que la dirección haya cambiado. Revise nuestros procedimientos o vuelva al inicio.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="px-5 py-3 rounded-xl bg-medical-500 hover:bg-medical-600 text-white font-bold text-sm">Ir al inicio</Link>
        <Link href="/procedimientos" className="px-5 py-3 rounded-xl border border-slate-300 dark:border-white/10 font-bold text-sm text-slate-700 dark:text-slate-200">Ver procedimientos</Link>
      </div>
    </section>
  );
}
