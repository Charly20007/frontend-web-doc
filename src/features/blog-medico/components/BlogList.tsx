'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Search, BookOpen, Sparkles, Filter } from 'lucide-react';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { ArticleCard } from './ArticleCard';
import { getArticulosBlog } from '../services/blogService';
import type { ArticuloMedico } from '../types';

export const BlogList: React.FC = () => {
  const [articulos, setArticulos] = useState<ArticuloMedico[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('todos');

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      const data = await getArticulosBlog();
      setArticulos(data);
      setLoading(false);
    };
    cargarDatos();
  }, []);

  // Extraer categorías únicas
  const categorias = useMemo(() => {
    const cats = articulos.map(a => a.categoria);
    const unicas = new Map<string, { id: number; nombre: string; slug: string }>();
    cats.forEach(c => unicas.set(c.slug, c));
    return [
      { id: 0, nombre: 'Todas las Especialidades', slug: 'todos' },
      ...Array.from(unicas.values())
    ];
  }, [articulos]);

  // Filtrar artículos
  const articulosFiltrados = useMemo(() => {
    return articulos.filter(art => {
      const coincideCat = categoriaSeleccionada === 'todos' || art.categoria.slug === categoriaSeleccionada;
      const coincideTxt = busqueda === '' || 
        art.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
        art.resumen.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCat && coincideTxt;
    });
  }, [articulos, categoriaSeleccionada, busqueda]);

  return (
    <div className="min-h-screen py-12 sm:py-16 bg-slate-50 dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          badge="Salud & Prevención Digestiva"
          badgeIcon={<Sparkles className="w-4 h-4 text-medical-500" />}
          title="Blog Quirúrgico & Consejos del"
          highlightedWord="Dr. Juan Marcos"
          subtitle="Información médica clara, veraz y fundamentada científicamente para cuidar tu sistema digestivo y prepararte con tranquilidad para una intervención."
        />

        {/* Buscador y Filtros */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por síntoma, enfermedad o procedimiento (ej. vesícula, hernia, dolor, dieta)..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500 shadow-sm text-sm sm:text-base transition-all"
            />
          </div>

          {/* Botones de categoría */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
            {categorias.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setCategoriaSeleccionada(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                  categoriaSeleccionada === cat.slug
                    ? 'bg-gradient-to-r from-medical-500 to-blue-600 text-white shadow-md shadow-medical-500/20'
                    : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-medical-500/50'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Artículos */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-3xl bg-slate-200 dark:bg-navy-900" />
            ))}
          </div>
        ) : articulosFiltrados.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-white/10 max-w-lg mx-auto p-8 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No se encontraron artículos</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Intenta con otra palabra clave o selecciona la pestaña de todas las especialidades.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulosFiltrados.map(art => (
              <ArticleCard key={art.id} articulo={art} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
