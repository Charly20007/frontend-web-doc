'use client';

import React from 'react';
import { ArticleDetail } from './ArticleDetail';
import { useBooking } from '../../../components/providers/AppShell';
import type { ArticuloMedico } from '../types';

interface ArticleDetailClientProps {
  articulo: ArticuloMedico;
}

export const ArticleDetailClient: React.FC<ArticleDetailClientProps> = ({ articulo }) => {
  const { openBooking } = useBooking();

  return (
    <ArticleDetail 
      articulo={articulo} 
      onOpenBooking={() => openBooking()} 
    />
  );
};

