'use client';

export default function ErrorPagina({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="py-24 text-center px-4">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">No pudimos cargar esta página</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Hubo un problema temporal. Inténtelo nuevamente en unos segundos.</p>
      <button type="button" onClick={reset} className="mt-8 px-5 py-3 rounded-xl bg-medical-500 hover:bg-medical-600 text-white font-bold text-sm cursor-pointer">
        Reintentar
      </button>
    </section>
  );
}
