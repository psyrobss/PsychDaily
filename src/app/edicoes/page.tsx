
'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { edicoes as todasEdicoes } from '@/lib/mock-data/index';
import EdicaoCard from '@/components/EdicaoCard';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { parse, startOfDay, isEqual, isBefore } from 'date-fns';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const ITEMS_PER_PAGE = 9;

export default function EdicoesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [today, setToday] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    setToday(startOfDay(new Date())); // Set today on client mount
    setIsLoading(false); // Set loading to false once today is set
  }, []);

  const publishedEdicoes = useMemo(() => {
    if (!today) return []; // Wait for today to be set
    const todayDateOnly = today;
    return [...todasEdicoes].filter(edicao => {
      const edicaoDate = parse(edicao.data, 'yyyy-MM-dd', new Date());
      return isEqual(edicaoDate, todayDateOnly) || isBefore(edicaoDate, todayDateOnly);
    }).sort((a, b) => {
      const dateA = parse(a.data, 'yyyy-MM-dd', new Date());
      const dateB = parse(b.data, 'yyyy-MM-dd', new Date());
      const dateComparison = dateB.getTime() - dateA.getTime();
      if (dateComparison !== 0) return dateComparison;
      return parseInt(b.edicao) - parseInt(a.edicao);
    });
  }, [today]);

  const totalPages = useMemo(() => {
    if (isLoading) return 0; // Avoid calculation if still loading
    return Math.ceil(publishedEdicoes.length / ITEMS_PER_PAGE);
  }, [publishedEdicoes, isLoading]);

  const currentEdicoes = useMemo(() => {
    if (isLoading) return []; // Avoid calculation if still loading
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return publishedEdicoes.slice(startIndex, endIndex);
  }, [currentPage, publishedEdicoes, isLoading]);

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
    if (totalPages === 0) return [];
    const DOTS = '...';
    const pageNumbers: (string | number)[] = [];
    const siblingCount = 1; 

    if (totalPages <= (2 * siblingCount + 5)) { // Threshold to show all pages
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    pageNumbers.push(1);

    const leftSiblingStart = Math.max(2, currentPage - siblingCount);
    const leftSiblingEnd = Math.min(totalPages -1, currentPage - siblingCount + (siblingCount > 0 ? siblingCount-1 : 0) ); // adjust for range
    
    const rightSiblingStart = Math.max(2, currentPage +1 - (siblingCount >0 ? siblingCount-1 : 0));
    const rightSiblingEnd = Math.min(totalPages - 1, currentPage + siblingCount);


    if (leftSiblingStart > 2) {
      pageNumbers.push(DOTS);
    }

    for (let i = leftSiblingStart; i <= Math.min(currentPage -1, totalPages -1) ; i++) {
        if (i > 1 && !pageNumbers.includes(i)) pageNumbers.push(i);
    }
    
    if (currentPage > 1 && currentPage < totalPages && !pageNumbers.includes(currentPage)) {
        pageNumbers.push(currentPage);
    }

     for (let i = Math.max(2, currentPage + 1) ; i <= rightSiblingEnd; i++) {
        if (i < totalPages && !pageNumbers.includes(i)) pageNumbers.push(i);
    }

    if (rightSiblingEnd < totalPages - 1) {
      if(pageNumbers[pageNumbers.length -1] !== DOTS) pageNumbers.push(DOTS);
    }
    
    if (!pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
    }
    
    // Deduplication and final cleanup for edge cases like [1, ..., 2]
    const finalPages: (string | number)[] = [];
    if(pageNumbers.length > 0) {
        finalPages.push(pageNumbers[0]);
        for(let i = 1; i < pageNumbers.length; i++) {
            if(pageNumbers[i] === DOTS && finalPages[finalPages.length -1] === DOTS) continue;
            if(pageNumbers[i] === DOTS && typeof pageNumbers[i-1] === 'number' && typeof pageNumbers[i+1] === 'number' && (pageNumbers[i+1] as number) === (pageNumbers[i-1] as number) + 1) continue;
            finalPages.push(pageNumbers[i]);
        }
    }
    // Ensure first page is not followed by DOTS then 2, e.g. [1, ..., 2, 3] should be [1, 2, 3]
    if (finalPages.length > 2 && finalPages[0] === 1 && finalPages[1] === DOTS && finalPages[2] === 2) {
        finalPages.splice(1, 1);
    }
    // Ensure last page is not preceded by X, DOTS, totalPages e.g. [1, 2, ..., 4] should be [1, 2, 3, 4] if totalPages is 4
    if (finalPages.length > 2 && finalPages[finalPages.length - 1] === totalPages && finalPages[finalPages.length - 2] === DOTS && finalPages[finalPages.length - 3] === totalPages -1) {
        finalPages.splice(finalPages.length - 2, 1);
    }


    return finalPages;

  }, [currentPage, totalPages]);


  if (isLoading) { // Show skeleton while today's date is being determined
    return (
      <div className="space-y-12 animate-in fade-in-50 duration-500">
        <header className="text-center py-6 border-b-2 border-primary/20">
          <div className="flex items-center justify-center mb-3">
            <Skeleton className="h-10 w-10 mr-3 rounded-full" />
            <Skeleton className="h-10 w-64" />
          </div>
          <Skeleton className="h-6 w-80 mx-auto" />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
            <Card className="flex flex-col h-full border border-primary/10" key={i}>
              <Skeleton className="w-full h-56 sm:h-64" />
              <CardHeader className="pb-3">
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-full mt-1" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </CardHeader>
              <CardFooter className="mt-auto pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
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
        <p className="text-center text-muted-foreground text-lg font-sans py-10">
          Nenhuma edição anterior encontrada para datas publicadas.
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
                  key={`page-${page}-${index}`}
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
// Dummy Card and Header/Footer for skeleton
const Card = ({className, children}: {className?:string, children: React.ReactNode}) => <div className={className}>{children}</div>;
const CardHeader = ({className, children}: {className?:string, children: React.ReactNode}) => <div className={className}>{children}</div>;
const CardFooter = ({className, children}: {className?:string, children: React.ReactNode}) => <div className={className}>{children}</div>;

