import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Miga {
  nombre: string;
  href: string;
}

/** Migas de pan visibles + Schema.org BreadcrumbList para Google. */
export const Breadcrumbs: React.FC<{ items: Miga[]; siteUrl: string }> = ({ items, siteUrl }) => {
  const todas: Miga[] = [{ nombre: 'Inicio', href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: todas.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.nombre,
      item: `${siteUrl}${m.href === '/' ? '' : m.href}`,
    })),
  };

  return (
    <nav aria-label="Migas de pan" className="text-xs text-slate-500 dark:text-slate-400">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {todas.map((m, i) => (
          <li key={m.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3" />}
            {i === todas.length - 1 ? (
              <span aria-current="page" className="font-semibold text-slate-700 dark:text-slate-200">{m.nombre}</span>
            ) : (
              <Link href={m.href} className="hover:text-medical-600 dark:hover:text-medical-400">{m.nombre}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
