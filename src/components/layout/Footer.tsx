
'use client';

import { useState, useEffect, useRef } from 'react';
import PixDonationCard from '../PixDonationCard';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { BookOpen, Home, Info, Search, Users } from 'lucide-react';

const footerNavItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/sobre', label: 'Sobre Nós', icon: Info },
  { href: '/equipe', label: 'Nossa Equipe', icon: Users },
  { href: '/edicoes', label: 'Edições', icon: BookOpen },
  { href: '/busca', label: 'Buscar', icon: Search },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [showPixCard, setShowPixCard] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShowPixCard(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-muted/50 text-muted-foreground py-8 mt-12 font-sans">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 min-h-[280px] md:min-h-[300px]">
          {showPixCard && (
            <div className="w-full md:w-auto animate-in fade-in-50 slide-in-from-bottom-10 duration-700">
              <PixDonationCard />
            </div>
          )}
        </div>
        
        <Separator className="border-primary/20" />

        <nav className="mb-6">
          <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm">
            {footerNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <item.icon className="mr-1.5 h-4 w-4 opacity-80" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Separator className="border-primary/20" />

        <div className="text-center">
          <p className="text-sm">
            &copy; {currentYear || '....'} PsychDaily. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-1">
            Conteúdo para fins informativos, reflexivos e de entretenimento. Consulte sempre um profissional.
          </p>
        </div>
      </div>
    </footer>
  );
}
