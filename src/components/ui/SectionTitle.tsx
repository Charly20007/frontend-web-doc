import React from 'react';

interface SectionTitleProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  highlightedWord?: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  badgeIcon,
  title,
  highlightedWord,
  subtitle,
  centered = true,
}) => {
  return (
    <div className={`max-w-3xl mb-16 ${centered ? 'mx-auto text-center' : 'text-left'}`}>
      {badge && (
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-medical-500/10 border border-medical-500/20 text-medical-600 dark:text-medical-400 text-xs font-semibold uppercase tracking-wider mb-3">
          {badgeIcon && <span className="shrink-0">{badgeIcon}</span>}
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors leading-tight">
        {title}{' '}
        {highlightedWord && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-blue-500 dark:from-medical-400 dark:to-blue-300">
            {highlightedWord}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed transition-colors">
          {subtitle}
        </p>
      )}
    </div>
  );
};
