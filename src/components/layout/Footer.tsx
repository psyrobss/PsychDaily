
'use client';

import { useState, useEffect, useRef } from 'react';
import PixDonationCard from '../PixDonationCard';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { BookOpen, Home, Info, Search, Users } from 'lucide-react';
import { usePathname } from 'next/navigation'; // Import usePathname

const footerNavItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/sobre', label: 'Sobre Nós', icon: Info },
  { href: '/equipe', label: 'Nossa Equipe', icon: Users },
  { href: '/edicoes', label: 'Edições', icon: BookOpen },
  { href: '/busca', label: 'Buscar', icon: Search },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [showPixCardState, setShowPixCardState] = useState(false); // Renamed to avoid conflict if PixDonationCard also uses a showPixCard
  const footerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname(); // Get current pathname

  const displayDonationCardPaths = ['/sobre', '/equipe'];
  const shouldDisplayDonationCard = displayDonationCardPaths.includes(pathname);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (!shouldDisplayDonationCard) return; // Only run observer if card should be displayed

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShowPixCardState(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    const currentFooterRef = footerRef.current;
    if (currentFooterRef) {
      observer.observe(currentFooterRef);
    }

    return () => {
      if (currentFooterRef) {
        observer.unobserve(currentFooterRef);
      }
    };
  }, [shouldDisplayDonationCard]); // Re-run if shouldDisplayDonationCard changes (though it won't after initial load for a given page)

  return (
    <footer ref={footerRef} className="bg-muted/50 text-muted-foreground py-8 mt-12 font-sans">
      <div className="container mx-auto px-4 space-y-8">
        {shouldDisplayDonationCard && (
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 min-h-[280px] md:min-h-[300px]">
            {showPixCardState && (
              <div className="w-full md:w-auto animate-in fade-in-50 slide-in-from-bottom-10 duration-700">
                <PixDonationCard />
              </div>
            )}
            {/* If showPixCardState is false, this div will still take up space unless we conditionally render it too, 
                or ensure its parent min-height is only applied when shouldDisplayDonationCard is true.
                For simplicity, keeping min-height, it will just be empty space if not on /sobre or /equipe and card not yet visible.
                Alternatively, conditionally render the whole donation section:
            */}
          </div>
        )}
        
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
