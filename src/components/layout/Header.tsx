
'use client';

import Link from 'next/link';
import { Newspaper, Home, BookCopy, Search, ChevronDown, Menu, Users, Info, UserCircle, Languages } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { edicoes as todasEdicoes } from '@/lib/mock-data/index';
import type { Edicao } from '@/lib/types';
import { useState, useEffect, useMemo } from 'react';
import { format, startOfDay, isEqual, isBefore, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors font-sans">
    <Newspaper className="h-7 w-7" />
    PsychDaily
  </Link>
);

const navItemsBase = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/busca', label: 'Buscar', icon: Search },
  { href: '/sobre', label: 'Sobre', icon: Info },
  { href: '/equipe', label: 'Equipe', icon: Users },
];

const userMenuItems = [
  { href: '/assine', label: 'Assine' },
  // { href: '/login', label: 'Login (Construção)' }, // Temporariamente removido
  // { href: '/cadastro', label: 'Cadastro (Construção)' }, // Temporariamente removido
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditionsDropdownOpen, setIsEditionsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const [today, setToday] = useState<Date | null>(null);
  const [mostRecentPublishedEdition, setMostRecentPublishedEdition] = useState<Edicao | null>(null);
  const [lastSevenPublishedEditions, setLastSevenPublishedEditions] = useState<Edicao[]>([]);

  useEffect(() => {
    setToday(startOfDay(new Date()));
  }, []);

  useEffect(() => {
    if (!today || todasEdicoes.length === 0) {
      setMostRecentPublishedEdition(null);
      setLastSevenPublishedEditions([]);
      return;
    }

    const publishedEditions = todasEdicoes.filter(edicao => {
      const edicaoDate = parse(edicao.data, 'yyyy-MM-dd', new Date());
      return isEqual(edicaoDate, today) || isBefore(edicaoDate, today);
    });
    
    const sortedPublished = [...publishedEditions].sort((a, b) => parse(b.data, 'yyyy-MM-dd', new Date()).getTime() - parse(a.data, 'yyyy-MM-dd', new Date()).getTime());
    setLastSevenPublishedEditions(sortedPublished.slice(0, 7));

    if (sortedPublished.length > 0) {
      setMostRecentPublishedEdition(sortedPublished[0]);
    } else {
      // Fallback: if no editions are "published" yet, show the next one to be published
      const sortedFutureEditions = [...todasEdicoes].sort((a, b) => parse(a.data, 'yyyy-MM-dd', new Date()).getTime() - parse(b.data, 'yyyy-MM-dd', new Date()).getTime());
      setMostRecentPublishedEdition(sortedFutureEditions.length > 0 ? sortedFutureEditions[0] : null);
    }
  }, [today]);

  const handleMenuNavigation = (href?: string) => {
    setIsMobileMenuOpen(false);
    setIsEditionsDropdownOpen(false);
    setIsUserDropdownOpen(false);
    if (href) router.push(href);
  };

  const handleTranslate = () => {
    if (typeof window !== 'undefined') {
      const currentPageUrl = window.location.href;
      const googleTranslateUrl = `https://translate.google.com/translate?sl=pt&tl=en&u=${encodeURIComponent(currentPageUrl)}`;
      window.open(googleTranslateUrl, '_blank');
    }
  };

  const commonLinkClasses = (href: string, isActive?: boolean) => cn(
    "text-foreground/70 hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-md",
    (pathname === href || isActive) && "text-primary bg-primary/10 font-semibold"
  );

  const commonDropdownTriggerClasses = (pathStartsWith: string[]) => cn(
    "text-foreground/70 hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-md flex items-center gap-2",
    pathStartsWith.some(path => pathname.startsWith(path)) && "text-primary bg-primary/10 font-semibold"
  );

  const NavLinksContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navItemsBase.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          asChild
          className={cn(commonLinkClasses(item.href), isMobile && "w-full justify-start text-base py-3")}
          onClick={() => handleMenuNavigation(item.href)}
        >
          <Link href={item.href} className="flex items-center gap-2">
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        </Button>
      ))}

      <DropdownMenu open={isMobile ? undefined : isEditionsDropdownOpen} onOpenChange={isMobile ? undefined : setIsEditionsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(commonDropdownTriggerClasses(['/edicoes', '/edicao/']), isMobile && "w-full justify-start text-base py-3")}
          >
            <BookCopy className="h-5 w-5" />
            <span>Edições</span>
            <ChevronDown className="h-4 w-4 opacity-70 ml-auto sm:ml-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align={isMobile ? "start" : "end"}
            className={cn("font-sans", isMobile ? "w-[calc(100%-2rem)] ml-4" : "w-64" )}
            onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {!today ? (
            <DropdownMenuItem disabled>Carregando edições...</DropdownMenuItem>
          ) : (
            <>
              {mostRecentPublishedEdition && (
                 <DropdownMenuItem key="mais-recente" asChild onClick={() => handleMenuNavigation(`/edicao/${mostRecentPublishedEdition.edicao}`)}>
                  <Link href={`/edicao/${mostRecentPublishedEdition.edicao}`}>
                    Mais Recente ({format(parse(mostRecentPublishedEdition.data, 'yyyy-MM-dd', new Date()), "dd MMM yy", { locale: ptBR })})
                  </Link>
                </DropdownMenuItem>
              )}

              {mostRecentPublishedEdition && lastSevenPublishedEditions.length > 0 && (
                <DropdownMenuSeparator />
              )}

              {lastSevenPublishedEditions
                .filter(edicao => edicao.edicao !== mostRecentPublishedEdition?.edicao) 
                .slice(0, mostRecentPublishedEdition ? 6 : 7) 
                .map((edicao: Edicao) => (
                <DropdownMenuItem key={edicao.edicao} asChild onClick={() => handleMenuNavigation(`/edicao/${edicao.edicao}`)}>
                  <Link href={`/edicao/${edicao.edicao}`}>
                    Ed. {edicao.edicao} - {format(parse(edicao.data, 'yyyy-MM-dd', new Date()), "dd MMM yy", { locale: ptBR })}
                  </Link>
                </DropdownMenuItem>
              ))}
              
              {(mostRecentPublishedEdition || lastSevenPublishedEditions.length > 0) && <DropdownMenuSeparator />}
              
              <DropdownMenuItem asChild onClick={() => handleMenuNavigation("/edicoes")}>
                <Link href="/edicoes">Ver Todas as Edições</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Options Dropdown */}
      <DropdownMenu open={isMobile ? undefined : isUserDropdownOpen} onOpenChange={isMobile ? undefined : setIsUserDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon" 
            className={cn(
              "text-foreground/70 hover:text-primary hover:bg-primary/10",
              isMobile && "w-full justify-start text-base py-3 px-3", 
              (pathname === '/assine') && !isMobile && "text-primary bg-primary/10"
            )}
          >
            <UserCircle className="h-5 w-5" />
            {isMobile ? <span className="ml-2">Opções de Usuário</span> : <span className="sr-only">Opções de Usuário</span>}
            {isMobile && <ChevronDown className="h-4 w-4 opacity-70 ml-auto" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isMobile ? "start" : "end"}
          className={cn("font-sans", isMobile ? "w-[calc(100%-2rem)] ml-4" : "w-56" )}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {userMenuItems.map((item) => (
            <DropdownMenuItem key={item.label} asChild onClick={() => handleMenuNavigation(item.href)}>
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
           <DropdownMenuItem onClick={() => handleMenuNavigation("/login")}>
            Login (Construção)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuNavigation("/cadastro")}>
            Cadastro (Construção)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  );

  return (
    <header className="bg-background/80 backdrop-blur-md shadow-sm sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          <NavLinksContent />
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="text-left">
                   <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4">
                <NavLinksContent isMobile={true} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
