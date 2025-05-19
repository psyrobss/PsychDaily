
'use client';

import { useState, useEffect, useMemo } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { edicoes as todasEdicoes, getConteudoById } from '@/lib/mock-data/index';
import type { Conteudo, Edicao } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, BookOpen, Lightbulb, RefreshCw, Newspaper } from 'lucide-react';
import { format, startOfDay, isEqual, isBefore, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import FeaturedArticleCard from '@/components/conteudo/FeaturedArticleCard';
import { gerarInsightDiario, type InsightDiarioOutput } from '@/ai/flows/insightDiarioFlow';

export default function HomePage() {
  const [dailyInsight, setDailyInsight] = useState<string | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState<boolean>(false);
  
  const [effectiveEdition, setEffectiveEdition] = useState<Edicao | null>(null);
  const [displayDate, setDisplayDate] = useState<string | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(startOfDay(new Date()));
  }, []);

  useEffect(() => {
    if (!today || todasEdicoes.length === 0) {
      if (todasEdicoes.length === 0) { // Se não há edições, para de carregar
        setIsLoadingPage(false);
      }
      // Se 'today' ainda não está pronto mas há edições, pode continuar carregando
      // ou definir um fallback se 'today' demorar muito (não implementado aqui)
      return;
    }

    const todayDateOnly = today;

    // Filter for editions published on or before today
    const publishedEditions = todasEdicoes.filter(
      (edicao) => {
        const edicaoDate = parse(edicao.data, 'yyyy-MM-dd', new Date());
        return isEqual(edicaoDate, todayDateOnly) || isBefore(edicaoDate, todayDateOnly);
      }
    );

    let currentEd: Edicao | null = null;
    if (publishedEditions.length > 0) {
      currentEd = publishedEditions.sort((a, b) => parse(b.data, 'yyyy-MM-dd', new Date()).getTime() - parse(a.data, 'yyyy-MM-dd', new Date()).getTime())[0];
    } else {
      const sortedFutureEditions = [...todasEdicoes].sort((a, b) => parse(a.data, 'yyyy-MM-dd', new Date()).getTime() - parse(b.data, 'yyyy-MM-dd', new Date()).getTime());
      currentEd = sortedFutureEditions.length > 0 ? sortedFutureEditions[0] : null;
    }
    
    setEffectiveEdition(currentEd);
    setIsLoadingPage(false);
  }, [today]);

  useEffect(() => {
    if (effectiveEdition) {
      const editionDate = parse(effectiveEdition.data, 'yyyy-MM-dd', new Date());
      setDisplayDate(format(editionDate, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR }));
    } else {
      setDisplayDate(null);
    }
  }, [effectiveEdition]);

  const featuredConteudo = useMemo(() => {
    if (!effectiveEdition || !effectiveEdition.capa.links_manchetes || effectiveEdition.capa.links_manchetes.length === 0) {
      return undefined;
    }
    const featuredId = effectiveEdition.capa.links_manchetes[0].id_conteudo;
    return getConteudoById(featuredId);
  }, [effectiveEdition]);

  const otherConteudos = useMemo(() => {
    if (!effectiveEdition) return [];

    let allContentIdsInEdition: string[] = [];
    
    effectiveEdition.capa.links_manchetes.forEach(link => {
        if (link.id_conteudo !== featuredConteudo?.id && !allContentIdsInEdition.includes(link.id_conteudo)) {
            allContentIdsInEdition.push(link.id_conteudo);
        }
    });
    
    effectiveEdition.secoes.forEach(secao => {
      secao.conteudo_ids.forEach(id => {
        if (id !== featuredConteudo?.id && !allContentIdsInEdition.includes(id)) {
          allContentIdsInEdition.push(id);
        }
      });
    });

    return allContentIdsInEdition
      .map(id => getConteudoById(id))
      .filter(c => c !== undefined && c.id !== featuredConteudo?.id) // Ensure featured is not repeated
      .slice(0, 3) as Conteudo[];
  }, [effectiveEdition, featuredConteudo]);


  async function fetchInsight() {
    setIsLoadingInsight(true);
    try {
      const result: InsightDiarioOutput = await gerarInsightDiario();
      setDailyInsight(result.insight);
    } catch (error) {
      console.error("Erro ao gerar insight diário:", error);
      setDailyInsight("Lembre-se que pequenas pausas durante o dia podem renovar sua energia e clareza mental.");
    } finally {
      setIsLoadingInsight(false);
    }
  }

  if (isLoadingPage) {
    return (
      <div className="text-center py-10 animate-pulse">
        <p className="text-2xl text-primary font-serif">PsychDaily</p>
        <p className="text-muted-foreground mt-2 font-sans">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {effectiveEdition ? (
        <>
          <section aria-labelledby="main-title" className="text-center py-6 border-b-2 border-primary/20 mb-10">
            <h1 id="main-title" className="text-5xl md:text-6xl font-bold text-primary mb-3 font-serif">
              PsychDaily
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-3 font-serif">
              {effectiveEdition.capa.subtitulo || "Sua dose diária de insights psicológicos e narrativas inspiradoras."}
            </p>
            {displayDate && (
              <p className="text-sm text-muted-foreground font-sans flex items-center justify-center">
                <CalendarDays className="mr-2 h-4 w-4" /> Edição de {displayDate} (Nº {effectiveEdition.edicao})
              </p>
            )}
          </section>

          <section aria-labelledby="insight-title" className="my-12 animate-in fade-in-50 duration-700">
            <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <Lightbulb className="mr-2 h-6 w-6 text-accent" />
                <h3 id="insight-title" className="text-xl font-semibold text-accent-foreground font-serif">Insight do Dia</h3>
              </div>
              <div className="p-0">
                {isLoadingInsight ? (
                  <p className="text-accent-foreground/80 italic font-serif">Carregando insight...</p>
                ) : dailyInsight ? (
                  <p className="text-accent-foreground/90 text-base leading-relaxed font-serif">
                    "{dailyInsight}"
                  </p>
                ) : (
                  <p className="text-accent-foreground/80 italic font-serif">Clique abaixo para gerar seu insight do dia.</p>
                )}
                <Button
                    onClick={fetchInsight}
                    variant="outline"
                    size="sm"
                    className="mt-4 font-sans text-accent-foreground border-accent/50 hover:bg-accent/20"
                    disabled={isLoadingInsight}
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoadingInsight ? 'animate-spin' : ''}`} />
                    {dailyInsight ? "Gerar Novo Insight" : "Gerar Insight do Dia"}
                </Button>
              </div>
            </div>
          </section>

          {featuredConteudo && (
            <section aria-labelledby="featured-article-title" className="mb-12 animate-in fade-in-50 duration-700">
              <FeaturedArticleCard conteudo={featuredConteudo} />
            </section>
          )}

          {otherConteudos.length > 0 && (
            <section aria-labelledby="recent-articles-title">
              <h2 id="recent-articles-title" className="text-3xl font-bold mb-8 text-center text-primary/90 border-b pb-4 font-serif">
                Mais Destaques da Edição Atual
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {otherConteudos.map((conteudo) => (
                  <ArticleCard key={conteudo.id} article={conteudo} />
                ))}
              </div>
            </section>
          )}

          {otherConteudos.length === 0 && featuredConteudo && (
            <section aria-labelledby="no-other-articles-title">
              <p className="text-center text-muted-foreground mt-8 font-sans">Não há outras publicações nesta edição além da manchete principal.</p>
            </section>
          )}
          
          <section aria-labelledby="all-editions-cta" className="mt-12 py-8 text-center space-y-4">
            <Button size="lg" asChild className="font-sans bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
              <Link href={`/edicao/${effectiveEdition.edicao}`} className="flex items-center">
                <Newspaper className="mr-2 h-5 w-5" />
                Ver Edição Completa (Nº {effectiveEdition.edicao})
              </Link>
            </Button>
            <div> {/* Div to ensure the next button is on a new line or for better spacing control */}
              <Button size="lg" variant="outline" asChild className="font-sans text-primary hover:text-accent-foreground hover:bg-accent group border-primary/30 hover:border-accent">
                <Link href="/edicoes" className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Ver Todas as Edições
                </Link>
              </Button>
            </div>
          </section>

        </>
      ) : (
         <div className="text-center py-10">
           <p className="text-2xl text-primary font-serif">PsychDaily</p>
           <p className="text-muted-foreground mt-2 font-sans">Nenhuma edição encontrada para hoje ou datas anteriores. Verifique as edições futuras ou volte mais tarde.</p>
           <section aria-labelledby="all-editions-cta-fallback" className="mt-12 py-8 text-center">
              <Button size="lg" variant="outline" asChild className="font-sans text-primary hover:text-accent-foreground hover:bg-accent group border-primary/30 hover:border-accent">
                <Link href="/edicoes" className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Ver Todas as Edições Disponíveis
                </Link>
              </Button>
           </section>
         </div>
       )}

      <section aria-labelledby="subscribe-cta" className="mt-10 py-12 bg-accent/20 rounded-lg text-center px-4">
         <h2 id="subscribe-cta" className="text-3xl font-bold mb-4 text-accent-foreground font-serif">
          Gostou do que leu?
        </h2>
        <p className="text-lg text-accent-foreground/80 mb-6 max-w-xl mx-auto font-sans">
          Assine o PsychDaily para acesso ilimitado a conteúdos premium, narrativas exclusivas e edições anteriores completas.
        </p>
        <Button size="lg" asChild className="font-sans bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
          <Link href="/assine">
            Assine Agora
          </Link>
        </Button>
      </section>
    </div>
  );
}
