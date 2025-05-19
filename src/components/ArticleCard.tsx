
import Link from 'next/link';
import Image from 'next/image';
import type { Conteudo } from '@/lib/types'; // Updated import
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import IndicadorConteudoPago from '@/components/ui/IndicadorConteudoPago'; // Import new component
import { ArrowRight, CalendarDays } from 'lucide-react';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getSnippetFromConteudo } from '@/lib/mock-data/index'; 

interface ArticleCardProps {
  article: Conteudo; 
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const snippet = getSnippetFromConteudo(article, 100); 
  const publicationDate = parse(article.data_publicacao, 'yyyy-MM-dd', new Date());

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out animate-in fade-in-50 slide-in-from-bottom-10 duration-500 border border-primary/10">
      {article.imageUrl && (
        <Link href={`/artigos/${article.id}`} className="block relative w-full h-48 overflow-hidden group">
          <Image
            src={article.imageUrl}
            alt={article.titulo}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={article.imageHint || 'article image'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center mb-2">
          <IndicadorConteudoPago isPremium={article.isPremium} />
          <span className="text-xs text-muted-foreground font-sans uppercase tracking-wide">{article.tipo.replace(/_/g, ' ')}</span>
        </div>
        <CardTitle className="text-lg leading-tight">
          <Link href={`/artigos/${article.id}`} className="hover:text-primary transition-colors">
            {article.titulo}
          </Link>
        </CardTitle>
         <CardDescription className="text-xs text-muted-foreground font-sans pt-1 flex items-center">
            <CalendarDays className="mr-1.5 h-3 w-3" />
            {format(publicationDate, "dd MMM yyyy", { locale: ptBR })}
          </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pt-0 pb-4">
        <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">{snippet}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" asChild className="w-full font-sans hover:bg-accent hover:text-accent-foreground group border-primary/30 hover:border-accent">
          <Link href={`/artigos/${article.id}`}>
            Leia Mais <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

    
