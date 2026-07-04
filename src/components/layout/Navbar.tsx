import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Phone, ShieldCheck, Sun, Moon, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, darkMode, onToggleTheme }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/80 dark:border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 cursor-pointer" onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 flex items-center justify-center p-1 shadow-md overflow-hidden shrink-0">
            <img 
              src="/WhatsApp Image 2026-07-02 at 12.36.06 PM (1).jpeg" 
              alt="Logo Dr. Juan Carlos Marcos Enriquez" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white block transition-colors leading-tight">
              Dr. Juan Marcos
            </span>
            <span className="text-[10px] sm:text-xs text-medical-600 dark:text-medical-400 font-semibold tracking-wider uppercase flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-medical-500" /> Cirugía General y Digestiva
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href={isHome ? "#servicios" : "/#servicios"} className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Procedimientos</a>
          <a href={isHome ? "#perfil" : "/#perfil"} className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Especialista</a>
          <a href={isHome ? "#testimonios" : "/#testimonios"} className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors">Testimonios</a>
          <Link 
            to="/blog" 
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl transition-all font-bold ${
              location.pathname.startsWith('/blog')
                ? 'bg-medical-500/10 text-medical-600 dark:text-medical-400 border border-medical-500/20'
                : 'hover:text-medical-600 dark:hover:text-medical-400'
            }`}
          >
            <BookOpen className="w-4 h-4 text-medical-500" />
            <span>Blog Médico</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Botón de cambio de tema (Sol / Luna) */}
          <button
            onClick={onToggleTheme}
            title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>

          <a 
            href="tel:+51999888777" 
            className="hidden sm:flex items-center text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-medical-600 dark:text-medical-400" />
            Urgencias: (01) 999-8887
          </a>

          <button
            onClick={onOpenBooking}
            className="bg-gradient-to-r from-medical-500 to-blue-600 hover:from-medical-600 hover:to-blue-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-medical-500/25 hover:shadow-medical-500/40 transition-all duration-300 flex items-center space-x-2 text-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Cita</span>
          </button>
        </div>
      </div>
    </header>
  );
};
