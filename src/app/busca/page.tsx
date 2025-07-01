'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import ArticleCard from '@/components/ArticleCard';
import { conteudos as todosConteudos } from '@/lib/mock-data/index';
import type { Conteudo } from '@/lib/types';
import { Search, Frown, Library } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BuscaPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Conteudo[]>([]);

  useEffect(() => {
    // Update search term if URL query changes
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const filteredConteudos = useMemo(() => {
    if (!searchTerm.trim()) {
      return []; // Retorna vazio ou todos os artigos se preferir, mas para busca é melhor vazio
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return todosConteudos.filter((conteudo) => {
      const inTitle = conteudo.titulo.toLowerCase().includes(lowerCaseSearchTerm);
      const inSubtitle = conteudo.subtitulo?.toLowerCase().includes(lowerCaseSearchTerm) || false;
      const inTags = conteudo.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm));
      // Futuramente, pode-se adicionar busca no corpo do texto, mas é mais complexo e pesado para client-side.
      // const inBody = conteudo.corpo.some(elemento => {
      //   if (elemento.tipo === 'paragrafo' || elemento.tipo === 'sub_cabecalho' || elemento.tipo === 'citacao') {
      //     return elemento.texto.toLowerCase().includes(lowerCaseSearchTerm);
      //   }
      //   if (elemento.tipo === 'dialogo') {
      //     return elemento.fala.toLowerCase().includes(lowerCaseSearchTerm);
      //   }
      //   return false;
      // });
      return inTitle || inSubtitle || inTags;
    });
  }, [searchTerm]);

  useEffect(() => {
    setSearchResults(filteredConteudos);
  }, [filteredConteudos]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  // We don't need a form submission if we search on type or use a button that just updates state.
  // If a navigation with query param is desired on submit, a form would be needed.
  // For now, typing in the input directly filters.

  return (
    <div className="space-y-10 animate-in fade-in-50 duration-500">
      <header className="text-center py-6 border-b-2 border-primary/20">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3 flex items-center justify-center">
          <Search className="mr-3 h-10 w-10" />
          Buscar no PsychDaily
        </h1>
        <p className="text-lg text-foreground/80">
          Encontre artigos, insights e narrativas.
        </p>
      </header>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Digite sua busca..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full text-lg p-4 pl-12 rounded-md border-primary/30 focus:border-primary focus:ring-primary"
            aria-label="Campo de busca"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="text-center">
            <Button variant="link" asChild>
                <Link href="/indice" className='text-muted-foreground font-sans'>
                    <Library className="mr-2 h-4 w-4" />
                    Ou navegue pelo índice completo de matérias
                </Link>
            </Button>
        </div>
      </div>

      <Separator className="border-primary/15" />

      {searchTerm.trim() && (
        <section>
          {searchResults.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-primary/90 text-center">
                Resultados para "{searchTerm}"
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {searchResults.map((conteudo) => (
                  <ArticleCard key={conteudo.id} article={conteudo} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <Frown className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">
                Nenhum resultado encontrado para "{searchTerm}".
              </p>
              <p className="text-sm text-muted-foreground/80 mt-2">
                Tente termos diferentes ou verifique a ortografia.
              </p>
            </div>
          )}
        </section>
      )}
       {!searchTerm.trim() && (
         <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
                Digite algo no campo de busca para ver os resultados.
            </p>
         </div>
       )}
    </div>
  );
}