
import Link from 'next/link';
import Image from 'next/image';
import type { Conteudo } from '@/lib/types';
import { getSnippetFromConteudo } from '@/lib/mock-data/index';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, LockKeyhole, Sparkles } from 'lucide-react';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FeaturedArticleCardProps {
  conteudo: Conteudo;
}

export default function FeaturedArticleCard({ conteudo }: FeaturedArticleCardProps) {
  const snippet = getSnippetFromConteudo(conteudo, 200);
  const publicationDate = parse(conteudo.data_publicacao, 'yyyy-MM-dd', new Date());

  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-xl flex flex-col md:flex-row gap-6 items-center border border-primary/10">
      {conteudo.imageUrl && (
        <div className="w-full md:w-1/2 relative aspect-[16/10] rounded-md overflow-hidden shadow-md">
          <Image
            src={conteudo.imageUrl}
            alt={conteudo.titulo}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={conteudo.imageHint || 'psychology concept'}
            priority
          />
        </div>
      )}
      <div className="w-full md:w-1/2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant={conteudo.isPremium ? "destructive" : "secondary"} className="font-sans text-xs">
            {conteudo.isPremium ? <LockKeyhole className="mr-1 h-3 w-3" /> : <Sparkles className="mr-1 h-3 w-3" />}
            {conteudo.isPremium ? 'Premium' : 'Gratuito'}
          </Badge>
          <span className="text-xs text-muted-foreground font-sans">
            {conteudo.tipo.replace(/_/g, ' ')} - {publicationDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <h2 id="featured-article-title" className="text-2xl lg:text-3xl font-bold mb-3 hover:text-primary transition-colors">
          <Link href={`/artigos/${conteudo.id}`}>{conteudo.titulo}</Link>
        </h2>
        <p className="text-foreground/80 mb-4 line-clamp-3 sm:line-clamp-4 text-base leading-relaxed">{snippet}</p>
        <Button asChild className="font-sans bg-primary hover:bg-primary/90 text-primary-foreground group">
          <Link href={`/artigos/${conteudo.id}`}>
            Ler Artigo Completo <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

