
import type { Conteudo } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { PenSquare, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import IndicadorConteudoPago from '../ui/IndicadorConteudoPago';
import ArticleAuthor from './ArticleAuthor';

interface ColunaFixaCardProps {
  conteudo: Conteudo;
}

export default function ColunaFixaCard({ conteudo }: ColunaFixaCardProps) {
  const firstParagraph = conteudo.corpo.find(el => el.tipo === 'paragrafo');
  // Ensure firstParagraph and its 'tipo' property exist before accessing 'texto'
  const textSnippet = 
    firstParagraph && firstParagraph.tipo === 'paragrafo' 
    ? firstParagraph.texto.substring(0, 200) + (firstParagraph.texto.length > 200 ? '...' : '') 
    : (conteudo.subtitulo || 'Leia a coluna...');

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out animate-in fade-in-50 slide-in-from-bottom-10 duration-500 border-primary/10 bg-muted/30">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-1 text-xs text-muted-foreground font-sans">
          <IndicadorConteudoPago isPremium={conteudo.isPremium} />
           <div className="flex items-center">
             <PenSquare className="mr-1.5 h-4 w-4 text-primary/70" />
             <span>{conteudo.tipo.replace(/_/g, ' ')}</span>
           </div>
        </div>
        <CardTitle className="text-lg sm:text-xl leading-tight mt-1">
          <Link href={`/artigos/${conteudo.id}`} className="hover:text-primary transition-colors">
            {conteudo.titulo}
          </Link>
        </CardTitle>
         <div className="text-xs text-muted-foreground font-sans pt-1">
            <ArticleAuthor author={conteudo.autor} persona={conteudo.persona_autor} />
         </div>
      </CardHeader>
      <CardContent className="flex-grow pt-1 pb-3">
        <p className="text-sm text-foreground/80 line-clamp-3 sm:line-clamp-4 leading-relaxed font-sans">{textSnippet}</p>
      </CardContent>
      <CardFooter className="pt-0 mt-auto">
        <Button variant="link" size="sm" asChild className="font-sans text-primary hover:text-primary/90 group p-0 h-auto">
          <Link href={`/artigos/${conteudo.id}`} className="flex items-center">
            Ler Coluna Completa <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

    