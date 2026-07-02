import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'medical' | 'emerald' | 'blue' | 'slate' | 'amber';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'medical',
  icon,
  className = '',
}) => {
  const variantClasses = {
    medical: 'bg-medical-500/10 text-medical-600 dark:text-medical-400 border-medical-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    slate: 'bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/10',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border shrink-0 transition-colors ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
