
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import type { Conteudo } from '@/lib/types'; // Import Conteudo type

interface PaywallPlaceholderProps {
  conteudo: Conteudo; // Pass the whole article for potential image/snippet display
}

export default function PaywallPlaceholder({ conteudo }: PaywallPlaceholderProps) {
  // Prefer specific snippet from corpo if available, then subtitulo, then generic
  const firstParagraph = conteudo.corpo.find(el => el.tipo === 'paragrafo');
  let snippetForPaywall = 'Este é um conteúdo premium.';
  if (firstParagraph && firstParagraph.tipo === 'paragrafo') {
    snippetForPaywall = firstParagraph.texto.substring(0, 250) + '...';
  } else if (conteudo.subtitulo) {
    snippetForPaywall = conteudo.subtitulo.substring(0, 250) + (conteudo.subtitulo.length > 250 ? '...' : '');
  }

  return (
    <>
      {/* Show featured image for paywalled content if available */}
      {conteudo.imageUrl && (
        <div className="relative w-full aspect-[16/9] mb-8 rounded-md overflow-hidden shadow-md">
          <Image
            src={conteudo.imageUrl}
            alt={conteudo.titulo}
            fill
            className="object-cover rounded-md"
            data-ai-hint={conteudo.imageHint || 'article illustration'}
            priority // Prioritize if it's the main visual cue for a locked article
          />
        </div>
      )}
      <p className="text-base leading-relaxed mb-6">{snippetForPaywall}</p>
      <div className="mt-10 p-6 border-t-4 border-accent bg-accent/10 rounded-b-md text-center shadow-inner">
        <LockKeyhole className="h-10 w-10 text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2 text-accent-foreground">Acesso Exclusivo</h3> {/* Removed font-sans */}
        <p className="text-accent-foreground/80 mb-6 text-base font-sans"> {/* Kept font-sans for descriptive text */}
          Este é um conteúdo premium para assinantes PsychDaily. Assine para ler este artigo na íntegra e desbloquear todos os benefícios.
        </p>
        <Button asChild size="lg" className="font-sans bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
          <Link href="/assine">Assine Agora e Leia Completo</Link>
        </Button>
      </div>
    </>
  );
}
