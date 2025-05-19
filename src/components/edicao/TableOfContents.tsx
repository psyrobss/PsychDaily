
import type { Secao } from '@/lib/types';
import Link from 'next/link';
import { List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TableOfContentsProps {
  secoes: Secao[];
  className?: string;
}

export default function TableOfContents({ secoes, className }: TableOfContentsProps) {
  // Filter out the 'capa' section as it's usually handled differently (main headlines, etc.)
  // and sections that might have no content_ids (though ideally all defined sections should)
  const contentSections = secoes.filter(s => s.tipo !== 'capa' && s.conteudo_ids && s.conteudo_ids.length > 0);

  if (contentSections.length === 0) {
    return null;
  }

  return (
    <Card className={`my-8 shadow-md border-primary/10 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-primary flex items-center">
          <List className="mr-2 h-5 w-5" />
          Nesta Edição
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {contentSections.map((secao) => (
            <li key={secao.nome_secao}>
              <Link
                href={`#secao-title-${secao.nome_secao.replace(/\s+/g, '-').toLowerCase()}`}
                className="font-sans text-foreground/90 hover:text-primary hover:underline transition-colors"
              >
                {secao.nome_secao}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
