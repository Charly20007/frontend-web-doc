import React from 'react';
import { Activity } from 'lucide-react';

export const LoadingFallback: React.FC<{ texto?: string }> = ({ texto = "Cargando sección quirúrgica..." }) => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center space-y-3 text-slate-500 dark:text-slate-400 animate-pulse">
      <div className="w-10 h-10 rounded-2xl bg-medical-500/10 dark:bg-medical-500/20 text-medical-600 dark:text-medical-400 flex items-center justify-center border border-medical-500/30">
        <Activity className="w-5 h-5 animate-spin" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider">{texto}</span>
    </div>
  );
};
