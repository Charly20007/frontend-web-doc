import type { Metadata } from 'next';
import { BlogList } from '../../features/blog-medico/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog Médico y Consejos Quirúrgicos',
  description: 'Aprende sobre síntomas, prevención, tratamientos y cuidados postoperatorios en cirugía digestiva, laparoscópica y hernias con el Dr. Juan Marcos.',
  alternates: {
    canonical: 'https://cirujanogeneral.pe/blog',
  },
  openGraph: {
    title: 'Blog Quirúrgico & Consejos de Salud | Dr. Juan Carlos Marcos',
    description: 'Información médica clara y fundamentada para cuidar tu sistema digestivo.',
    url: 'https://cirujanogeneral.pe/blog',
  },
};

export default function BlogPage() {
  return <BlogList />;
}

