
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import type { Conteudo } from '@/lib/types';

interface RelatedLinksProps {
  links: Conteudo['links_relacionados'];
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <>
      <Separator className="my-8 border-primary/20" />
      <div> {/* Removed font-sans from parent */}
        <h4 className="text-md font-semibold mb-3 text-primary">Conteúdo Relacionado:</h4> {/* Should be serif by default */}
        <ul className="space-y-2">
          {links.map(link => (
            <li key={link.url}>
              <Link href={link.url} className="text-primary hover:underline hover:text-accent transition-colors font-sans"> {/* Added font-sans for link text for differentiation */}
                {link.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
