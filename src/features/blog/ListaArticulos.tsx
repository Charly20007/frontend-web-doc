'use client';

import React, { useMemo, useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { TarjetaArticulo } from './TarjetaArticulo';
import type { CategoriaBlog, ResumenArticulo } from './tipos';

const TODAS = 'todas';
/** Cuántos artículos van en la columna junto a la portada. */
const EN_LATERAL = 3;

/** Listado del blog en formato revista: portada, columna lateral y el resto en lista. */
interface ListaArticulosProps {
  articulos: ResumenArticulo[];
  /** Título de la columna junto a la portada (editable en el CMS). */
  tituloLateral: string;
}

export const ListaArticulos: React.FC<ListaArticulosProps> = ({ articulos, tituloLateral }) => {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState(TODAS);

  const categorias = useMemo(() => {
    const unicas = new Map<string, CategoriaBlog>();
    articulos.forEach((a) => unicas.set(a.categoria.slug, a.categoria));
    return Array.from(unicas.values());
  }, [articulos]);

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return articulos.filter(
      (a) =>
        (categoria === TODAS || a.categoria.slug === categoria) &&
        (!texto || a.titulo.toLowerCase().includes(texto) || a.resumen.toLowerCase().includes(texto)),
    );
  }, [articulos, categoria, busqueda]);

  const filtrando = categoria !== TODAS || busqueda.trim() !== '';
  // Portada: la que eligió el consultorio en el CMS o, si no hay, la más reciente
  const portada = filtrados.find((a) => a.destacado) ?? filtrados[0];
  const siguientes = filtrados.filter((a) => a !== portada);
  const lateral = siguientes.slice(0, EN_LATERAL);
  const resto = siguientes.slice(EN_LATERAL);

  const pestanas = [{ slug: TODAS, nombre: 'Todos' }, ...categorias];

  return (
    <div className="mt-8">
      {/* Pestañas de categoría + búsqueda */}
      <div className="flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200">
        <nav aria-label="Categorías" className="flex gap-6 overflow-x-auto scrollbar-none -mb-px">
          {pestanas.map((c) => {
            const activa = categoria === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                aria-pressed={activa}
                onClick={() => setCategoria(c.slug)}
                className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activa ? 'border-medical-600 text-navy-900' : 'border-transparent text-slate-500 hover:text-navy-900'
                }`}
              >
                {c.nombre}
              </button>
            );
          })}
        </nav>
        <label className="relative md:w-72 md:mb-3 shrink-0">
          <span className="sr-only">Buscar artículos</span>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Buscar un tema…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500"
          />
        </label>
      </div>

      {filtrados.length === 0 ? (
        <div className="mt-10 text-center py-12">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-slate-900">No encontramos artículos sobre eso</p>
          <p className="mt-1 text-sm text-slate-500">Prueba con otra palabra o vuelve a «Todos».</p>
        </div>
      ) : filtrando ? (
        // Resultados: una sola lista, con resumen
        <div className="mt-8 max-w-4xl divide-y divide-slate-200">
          {filtrados.map((a) => (
            <TarjetaArticulo key={a.id} articulo={a} conResumen />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className={lateral.length ? 'lg:col-span-3' : 'lg:col-span-5'}>
              <TarjetaArticulo articulo={portada} variante="portada" />
            </div>
            {lateral.length > 0 && (
              <aside className="lg:col-span-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{tituloLateral}</h2>
                <div className="divide-y divide-slate-200">
                  {lateral.map((a) => (
                    <TarjetaArticulo key={a.id} articulo={a} />
                  ))}
                </div>
              </aside>
            )}
          </div>

          {resto.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-extrabold text-navy-900 pb-4 border-b border-slate-200">Más artículos</h2>
              <div className="mt-6 max-w-4xl divide-y divide-slate-200">
                {resto.map((a) => (
                  <TarjetaArticulo key={a.id} articulo={a} conResumen />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};
