
// No 'use client' here - this is now a Server Component

import { getConteudoById } from '@/lib/mock-data/index';
import type { Conteudo } from '@/lib/types';
import { notFound } from 'next/navigation';
import ArticlePageClient from '@/components/conteudo/ArticlePageClient'; // Import the new client component

interface ConteudoPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ConteudoPageProps) {
  const conteudo = getConteudoById(params.id);
  if (!conteudo) {
    return { title: 'Conteúdo Não Encontrado | PsychDaily' };
  }
  return {
    title: `${conteudo.titulo} | PsychDaily`,
    description: conteudo.subtitulo || "Leia este artigo em PsychDaily.",
  };
}

// The default export is now a Server Component
export default async function ConteudoPage({ params }: ConteudoPageProps) {
  const conteudo = getConteudoById(params.id);

  if (!conteudo) {
    notFound();
  }

  return <ArticlePageClient conteudo={conteudo} />;
}
