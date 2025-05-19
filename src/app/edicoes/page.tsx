'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { edicoes as todasEdicoes } from '@/lib/mock-data/index';
import EdicaoCard from '@/components/EdicaoCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { parse, startOfDay, isBefore, isEqual } from 'date-fns';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 9;

export default function EdicoesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(startOfDay(new Date()));
  }, []);

  const publishedEdicoes = useMemo(() => {
    if (!today) return [];
    return todasEdicoes.filter(edicao => {
      const edicaoDate = parse(edicao.data, 'yyyy-MM-dd', new Date());
      return isEqual(edicaoDate, today) || isBefore(edicaoDate, today);
    });
  }, [today]);

  const sortedEdicoes = useMemo(() => {
    return [...publishedEdicoes].sort((a, b) => {
      const dateA = parse(a.data, 'yyyy-MM-dd', new Date());
      const dateB = parse(b.data, 'yyyy-MM-dd', new Date());
      const dateComparison = dateB.getTime() - dateA.getTime();
      if (dateComparison !== 0) return dateComparison;
      return parseInt(b.edicao) - parseInt(a.edicao);
    });
  }, [publishedEdicoes]);

  const totalPages = Math.ceil(sortedEdicoes.length / ITEMS_PER_PAGE);

  const currentEdicoes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedEdicoes.slice(startIndex, endIndex);
  }, [currentPage, sortedEdicoes]);

  useEffect(() => {
    // Reset to page 1 if the number of total pages changes and current page becomes invalid
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1); // Reset if no pages
    }
  }, [totalPages, currentPage]);


  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const generatePageNumbers = useCallback(() => {
    const pageNumbers: (number | string)[] = [];
    if (totalPages === 0) return [];
    const siblingCount = 1; 
    const totalNumbersToDisplay = siblingCount * 2 + 3; 
    const totalBlocks = totalNumbersToDisplay + 2; 

    if (totalPages <= totalBlocks) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      pageNumbers.push(1); 

      if (shouldShowLeftDots) {
        pageNumbers.push('...');
      }

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i > 1 && i < totalPages) {
          pageNumbers.push(i);
        }
      }
      
      if (shouldShowRightDots && rightSiblingIndex !== totalPages -1) {
         if (!pageNumbers.includes(totalPages-1) && rightSiblingIndex < totalPages -1) {
            pageNumbers.push('...');
         }
      }
      
      if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages); 
      }
    }
    return pageNumbers.filter((item, index, self) => {
        if (item === '...') {
            return self[index-1] !== '...' && typeof self[index-1] === 'number' && typeof self[index+1] === 'number' && (self[index+1] as number) > (self[index-1] as number) + 1;
        }
        return true;
    }).filter((item, index, self) => item !== self[index -1] || typeof item === 'string' );

  }, [currentPage, totalPages]);

  if (!today) {
    return (
      <div className="text-center py-10 animate-pulse">
        <p className="text-2xl text-primary font-serif">PsychDaily</p>
        <p className="text-muted-foreground mt-2 font-sans">Carregando edições...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in-50 duration-500">
      <header className="text-center py-6 border-b-2 border-primary/20">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3 flex items-center justify-center">
          <BookOpen className="mr-3 h-10 w-10" />
          Edições Anteriores
        </h1>
        <p className="text-lg text-foreground/80">
          Explore nosso arquivo de publicações.
        </p>
      </header>

      {currentEdicoes.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {currentEdicoes.map((edicao) => (
            <EdicaoCard key={edicao.edicao} edicao={edicao} />
          ))}
        </section>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-10">
          Nenhuma edição anterior encontrada até o momento.
        </p>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-6 mt-12 py-4 border-t border-primary/15">
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="font-sans text-primary hover:text-accent-foreground hover:bg-accent group border-primary/30 hover:border-accent"
            >
              <ChevronLeft className="mr-1.5 h-4 w-4" />
              Anterior
            </Button>
            {generatePageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <Button
                  key={`${page}-${index}`}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageClick(page)}
                  className={cn(
                    "font-sans w-9 h-9 p-0",
                    currentPage !== page && "text-primary border-primary/30 hover:border-accent hover:bg-accent hover:text-accent-foreground",
                    currentPage === page && "bg-primary text-primary-foreground cursor-default"
                  )}
                >
                  {page}
                </Button>
              ) : (
                <span key={`dots-${index}`} className="text-muted-foreground font-sans px-1.5">
                  {page}
                </span>
              )
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="font-sans text-primary hover:text-accent-foreground hover:bg-accent group border-primary/30 hover:border-accent"
            >
              Próximo
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground font-sans">
            Página {currentPage} de {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}
