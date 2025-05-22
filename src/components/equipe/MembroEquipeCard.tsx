
import type { MembroEquipeEditorial } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link'; // Import Link from Next.js
import { Edit3 } from 'lucide-react'; 

interface MembroEquipeCardProps {
  membro: MembroEquipeEditorial;
}

export default function MembroEquipeCard({ membro }: MembroEquipeCardProps) {
  const cardContent = (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-primary/10 animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={membro.imageUrl}
          alt={`Foto de ${membro.nome}`}
          fill
          className="object-cover"
          data-ai-hint={membro.imageHint}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl sm:text-2xl leading-tight text-primary">{membro.nome}</CardTitle>
        {membro.persona && (
          <CardDescription className="text-sm text-accent font-sans flex items-center pt-1">
            <Edit3 className="mr-1.5 h-4 w-4" />
            {membro.persona}
          </CardDescription>
        )}
        <p className="text-xs text-muted-foreground font-sans pt-1">{membro.cargo}</p>
      </CardHeader>
      <CardContent className="flex-grow pt-0 pb-4">
        {/* Show only the first paragraph of the bio on the team page card */}
        {membro.biografia && membro.biografia.length > 0 && (
          <p className="text-sm text-foreground/80 leading-relaxed font-serif">
            {membro.biografia[0]}
          </p>
        )}
      </CardContent>
      {/* Footer can be added here if needed, e.g., for a "Read More" that isn't the whole card */}
    </Card>
  );

  if (membro.externalProfileUrl) {
    return (
      <a
        href={membro.externalProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver perfil externo de ${membro.nome}`}
        className="block hover:ring-2 hover:ring-primary/50 rounded-lg transition-all"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={`/equipe/${membro.id}`} legacyBehavior>
      <a aria-label={`Ver perfil de ${membro.nome}`} className="block hover:ring-2 hover:ring-primary/50 rounded-lg transition-all">
        {cardContent}
      </a>
    </Link>
  );
}
