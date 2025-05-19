
import { getMembroEquipeById } from '@/lib/mock-data/index';
import type { MembroEquipeEditorial } from '@/lib/types';
import { notFound }
from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit3, Briefcase } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface MembroEquipePageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: MembroEquipePageProps) {
  const membro = getMembroEquipeById(params.id);
  if (!membro) {
    return { title: 'Membro da Equipe Não Encontrado | PsychDaily' };
  }
  return {
    title: `Perfil de ${membro.nome} | PsychDaily`,
    description: `Conheça mais sobre ${membro.nome}, ${membro.cargo} no PsychDaily.`,
  };
}

export default function MembroEquipePage({ params }: MembroEquipePageProps) {
  const membro = getMembroEquipeById(params.id);

  if (!membro) {
    notFound();
  }

  // Redirect for Dr. Robson Savoldi should be handled by the MembroEquipeCard
  // This page should ideally not be reached if externalProfileUrl exists for him.
  // However, as a fallback, if someone navigates here directly:
  if (membro.id === 'dr-robson-savoldi' && membro.externalProfileUrl) {
     // This won't work in a Server Component. Redirection must happen client-side or at build time.
     // For now, we rely on the card component correctly linking externally.
     // If direct navigation occurs, this page will render, which is acceptable.
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in-50 duration-500">
      <article className="bg-card p-6 sm:p-8 rounded-lg shadow-xl border border-primary/10">
        <header className="mb-8 text-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-primary/20 mb-6">
            <Image
              src={membro.imageUrl}
              alt={`Foto de ${membro.nome}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 160px, 192px"
              priority
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">{membro.nome}</h1>
          {membro.persona && (
            <p className="text-lg text-accent font-sans flex items-center justify-center mb-1">
              <Edit3 className="mr-2 h-5 w-5" />
              {membro.persona}
            </p>
          )}
          <p className="text-md text-muted-foreground font-sans flex items-center justify-center">
            <Briefcase className="mr-2 h-4 w-4" />
            {membro.cargo}
          </p>
        </header>

        <Separator className="my-8 border-primary/20" />

        <div className="prose prose-lg max-w-none dark:prose-invert 
                       prose-headings:font-serif prose-headings:text-primary 
                       prose-p:font-serif prose-p:leading-relaxed 
                       prose-li:font-serif prose-li:my-1
                       prose-strong:text-foreground/90 prose-em:text-foreground/80
                       prose-a:text-primary hover:prose-a:text-accent">
          <h2 className="text-2xl font-semibold text-primary mb-4">Sobre {membro.nome.split(' ')[0]}</h2>
          {membro.biografia.map((paragrafo, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragrafo}
            </p>
          ))}
        </div>

        <Separator className="my-10 border-primary/20" />

        <div className="text-center mt-10">
          <Button variant="outline" asChild className="font-sans text-primary hover:text-accent-foreground hover:bg-accent group">
            <Link href="/equipe" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Voltar para Nossa Equipe
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
