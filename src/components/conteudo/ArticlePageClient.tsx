
'use client';

import type { Conteudo } from '@/lib/types';
// import { useRouter } from 'next/navigation'; // Not needed if logout is removed
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, ArrowLeft } from 'lucide-react'; // User, LogOut removed
import { Separator } from '@/components/ui/separator';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import ConteudoRenderer from '@/components/conteudo/ConteudoRenderer';
import ArticleAuthor from '@/components/conteudo/ArticleAuthor';
import RelatedLinks from '@/components/conteudo/RelatedLinks';
import IndicadorConteudoPago from '@/components/ui/IndicadorConteudoPago';
import OuvirArtigoButton from '@/components/conteudo/OuvirArtigoButton';
import { Badge } from '@/components/ui/badge';

// import { useAuth } from '@/context/AuthContext'; // Auth temporarily disabled
// import { auth } from '@/lib/firebase'; // Not needed
// import { signOut } from 'firebase/auth'; // Not needed
// import { useToast } from '@/hooks/use-toast'; // Toast temporarily disabled

interface ArticlePageClientProps {
  conteudo: Conteudo;
}

export default function ArticlePageClient({ conteudo }: ArticlePageClientProps) {
  // const { user } = useAuth(); // Auth temporarily disabled
  // const router = useRouter(); // Not needed if logout is removed
  // const { toast } = useToast(); // Toast temporarily disabled

  const isSubscribed = true; // All content is free for now
  const publicationDate = parse(conteudo.data_publicacao, 'yyyy-MM-dd', new Date());

  // const handleLogout = async () => { // Logout temporarily disabled
  //   try {
  //     await signOut(auth);
  //     toast({ title: 'Logout realizado com sucesso!' });
  //     router.push('/'); 
  //   } catch (error) {
  //     toast({ variant: 'destructive', title: 'Erro no Logout', description: 'Não foi possível fazer logout.' });
  //     console.error('Erro ao fazer logout:', error);
  //   }
  // };

  return (
    <article className="max-w-3xl mx-auto bg-card p-6 sm:p-8 rounded-lg shadow-lg animate-in fade-in-50 duration-500 border border-primary/10">
      <header className="mb-6 text-center">
        <div className="flex justify-between items-center mb-4 max-w-md mx-auto">
          <span className="text-sm text-muted-foreground font-sans uppercase tracking-wider">{conteudo.tipo.replace(/_/g, ' ')}</span>
          <IndicadorConteudoPago isPremium={conteudo.isPremium} className="py-1 px-3 text-sm" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3 leading-tight font-serif">{conteudo.titulo}</h1>
        {conteudo.subtitulo && <p className="text-lg sm:text-xl text-foreground/80 mb-5 font-serif">{conteudo.subtitulo}</p>}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-3 text-sm text-muted-foreground font-sans mb-2">
          <div className="flex items-center">
            <CalendarDays className="mr-1.5 h-4 w-4 text-primary/70" />
            <span>{format(publicationDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
          </div>
          <ArticleAuthor author={conteudo.autor} persona={conteudo.persona_autor} />
        </div>
        
        {/* User info and logout button removed */}

        <OuvirArtigoButton
          corpo={conteudo.corpo}
          title={conteudo.titulo}
          audioUrl={conteudo.audioUrl}
        />
      </header>

      <Separator className="my-8 border-primary/20" />

      <ConteudoRenderer conteudo={conteudo} isSubscribed={isSubscribed} />

      {conteudo.tags && conteudo.tags.length > 0 && (
        <>
          <Separator className="my-8 border-primary/20" />
          <div className="font-sans">
            <h4 className="text-md font-semibold mb-3 text-primary font-serif">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {conteudo.tags.map(tag => (
                <Badge key={tag} variant="outline" className="font-normal hover:bg-accent/20 transition-colors cursor-pointer">
                  <Link href={`/busca?q=${encodeURIComponent(tag)}`}>{tag}</Link>
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}

      <RelatedLinks links={conteudo.links_relacionados} />

      <Separator className="my-8 border-primary/20" />

      <div className="text-center mt-10 space-x-4">
          <Button variant="outline" asChild className="font-sans text-primary hover:text-accent-foreground hover:bg-accent group">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Voltar para Início
              </Link>
          </Button>
          {/* Logout button removed */}
      </div>
    </article>
  );
}
