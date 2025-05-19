
import Link from 'next/link';
import Image from 'next/image';
import type { Edicao } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EdicaoCardProps {
  edicao: Edicao;
}

export default function EdicaoCard({ edicao }: EdicaoCardProps) {
  const editionDate = parse(edicao.data, 'yyyy-MM-dd', new Date());
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out animate-in fade-in-50 slide-in-from-bottom-10 duration-500 border border-primary/10">
      {edicao.capa.imagem_destaque && (
        <Link href={`/edicao/${edicao.edicao}`} className="block relative w-full h-56 sm:h-64 overflow-hidden">
          <Image
            src={edicao.capa.imagem_destaque}
            alt={`Capa da Edição ${edicao.edicao} - ${edicao.capa.titulo_principal}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={edicao.capa.imageHint || 'newspaper cover'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground font-sans uppercase tracking-wide">
            Edição Nº {edicao.edicao}
          </span>
          <div className="text-xs text-muted-foreground font-sans flex items-center">
            <CalendarDays className="mr-1.5 h-3 w-3" />
            {format(editionDate, "dd MMM yyyy", { locale: ptBR })}
          </div>
        </div>
        <CardTitle className="text-xl leading-tight">
          <Link href={`/edicao/${edicao.edicao}`} className="hover:text-primary transition-colors">
            {edicao.capa.titulo_principal}
          </Link>
        </CardTitle>
        {edicao.capa.subtitulo && (
          <CardDescription className="text-sm text-foreground/80 line-clamp-2 pt-1">
            {edicao.capa.subtitulo}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="mt-auto pt-0">
        <Button variant="outline" asChild className="w-full font-sans hover:bg-accent hover:text-accent-foreground group border-primary/30 hover:border-accent">
          <Link href={`/edicao/${edicao.edicao}`}>
            Ver Edição Completa <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

    
