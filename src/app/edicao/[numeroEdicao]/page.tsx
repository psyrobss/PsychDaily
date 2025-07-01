//src\app\edicao\[numeroEdicao]\page.tsx


import { getEdicaoByNumero, getConteudoById } from '@/lib/mock-data/index';
import type { Edicao, Conteudo, Secao } from '@/lib/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Newspaper, LockKeyhole, CalendarDays } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ArticleCard from '@/components/ArticleCard';
import ColunaFixaCard from '@/components/conteudo/ColunaFixaCard';
import TableOfContents from '@/components/edicao/TableOfContents';
import { cn } from '@/lib/utils';

interface EdicaoPageProps {
  params: { numeroEdicao: string };
}

export async function generateMetadata({ params }: EdicaoPageProps) {
  const edicao = getEdicaoByNumero(params.numeroEdicao);
  if (!edicao) {
    return { title: 'Edição Não Encontrada | PsychDaily' };
  }
  const editionDate = parse(edicao.data, 'yyyy-MM-dd', new Date());
  return {
    title: `Edição Nº ${edicao.edicao}: ${edicao.capa.titulo_principal} | PsychDaily`,
    description: edicao.capa.subtitulo || `Explore a edição ${edicao.edicao} do PsychDaily, publicada em ${format(editionDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}.`,
  };
}

// Layout types for single column presentation
const singleColumnSectionTypes = ['colunas', 'editorial'];

export default async function EdicaoPage({ params }: EdicaoPageProps) {
  const edicao = getEdicaoByNumero(params.numeroEdicao);

  if (!edicao) {
    notFound();
  }

  const { capa, secoes } = edicao;
  const editionDate = parse(edicao.data, 'yyyy-MM-dd', new Date());

  return (
    <div className="space-y-12 animate-in fade-in-50 duration-500">
      <header className="bg-card p-6 sm:p-8 rounded-lg shadow-lg border border-primary/10">
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-2 leading-tight font-serif">{capa.titulo_principal}</h1>
          {capa.subtitulo && <p className="text-lg text-foreground/80 mb-4 font-serif">{capa.subtitulo}</p>}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-sans">
            <div className="flex items-center">
              <Newspaper className="mr-1.5 h-4 w-4 text-primary/70" />
              <span>Edição Nº {edicao.edicao}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="mr-1.5 h-4 w-4 text-primary/70" />
              <span>{format(editionDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
            </div>
          </div>
        </div>

        {capa.imagem_destaque && (
          <div className="relative w-full max-w-3xl mx-auto aspect-[16/9] rounded-md overflow-hidden shadow-md mb-6">
            <Image
              src={capa.imagem_destaque}
              alt={`Capa da Edição ${edicao.edicao}: ${capa.titulo_principal}`}
              fill
              className="object-cover"
              data-ai-hint={capa.imageHint || "newspaper cover"}
              priority
            />
             {capa.credito_imagem && (
              <p className="absolute bottom-2 right-2 text-xs bg-black/50 text-white p-1 rounded font-sans">
                Crédito: {capa.credito_imagem}
              </p>
            )}
          </div>
        )}
        
        {capa.links_manchetes && capa.links_manchetes.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-primary mb-3 text-center font-serif">Manchetes Principais</h3>
            <ul className="space-y-2 max-w-xl mx-auto">
              {capa.links_manchetes.map(link => {
                const conteudoManchete = getConteudoById(link.id_conteudo);
                return (
                  <li key={link.id_conteudo} className="text-center">
                    <Link href={`/artigos/${link.id_conteudo}`} className="text-lg text-foreground hover:text-primary hover:underline transition-colors font-serif">
                      {link.titulo}
                      {conteudoManchete?.isPremium && <LockKeyhole className="inline-block ml-1.5 h-4 w-4 text-destructive/80" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      <TableOfContents secoes={secoes} className="my-8 shadow-md border-primary/10" />

      <main className="space-y-10">
        {secoes.map((secao: Secao) => {
          const conteudosDaSecao: Conteudo[] = secao.conteudo_ids
            .map(id => getConteudoById(id))
            .filter(c => c !== undefined) as Conteudo[];
          
          if (conteudosDaSecao.length === 0 && secao.tipo !== 'capa') return null;

          const isSingleColumnLayout = singleColumnSectionTypes.includes(secao.tipo);
          const isCadernoEspecial = secao.tipo === 'caderno_especial';
          
          const secaoGridClasses = isSingleColumnLayout
            ? "grid grid-cols-1 gap-x-6 gap-y-8 md:max-w-2xl md:mx-auto" 
            : "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8"; 

          const secaoTitleId = `secao-title-${secao.nome_secao.replace(/\s+/g, '-').toLowerCase()}`;

          return (
            (secao.tipo !== 'capa') && 
            <section key={secao.nome_secao} id={secaoTitleId} aria-labelledby={secaoTitleId}>
              <h2 
                className={cn(
                  "text-3xl font-bold mb-6", 
                  isCadernoEspecial
                    ? "text-primary bg-primary/5 p-4 rounded-md border-l-4 border-primary shadow" 
                    : "text-primary/90 border-b-2 border-primary/15 pb-3" 
                )}
              >
                {secao.nome_secao}
              </h2>
              {conteudosDaSecao.length > 0 ? (
                <div className={secaoGridClasses}>
                  {conteudosDaSecao.map(conteudo => {
                    if (conteudo.tipo === 'coluna_fixa') {
                      return <ColunaFixaCard key={conteudo.id} conteudo={conteudo} />;
                    }
                    return <ArticleCard key={conteudo.id} article={conteudo} />;
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground font-sans">Nenhum conteúdo nesta seção para esta edição.</p>
              )}
            </section>
          );
        })}
      </main>
      
      <Separator className="my-8 border-primary/20" />
      
      <div className="text-center mt-8">
        <Button variant="outline" asChild className="font-sans text-primary hover:text-accent-foreground hover:bg-accent group">
          <Link href="/edicoes" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para Todas as Edições
          </Link>
        </Button>
      </div>
    </div>
  );
}
