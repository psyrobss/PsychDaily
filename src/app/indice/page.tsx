import { edicoes as todasEdicoes, getConteudoById } from '@/lib/mock-data/index';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Índice Completo | PsychDaily',
  description: 'Navegue por todas as edições e matérias publicadas no PsychDaily em um índice completo.',
};

export default function IndicePage() {
  
  // Ordena as edições da mais recente para a mais antiga
  const edicoesOrdenadas = [...todasEdicoes].sort((a, b) => parseInt(b.edicao) - parseInt(a.edicao));

  return (
    <div className="font-sans">
      <header className="mb-4 pb-4 border-b">
        <h1 className="text-2xl font-bold text-primary">
          Índice Completo
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Navegue por todas as edições e matérias publicadas.
        </p>
      </header>

      <main>
        {edicoesOrdenadas.map((edicao) => {
          // Coleta todos os IDs de conteúdo da edição, evitando duplicatas
          const todosIds = new Set<string>();
          edicao.capa.links_manchetes.forEach(link => todosIds.add(link.id_conteudo));
          edicao.secoes.forEach(secao => {
            secao.conteudo_ids.forEach(id => todosIds.add(id));
          });
          const idsUnicos = Array.from(todosIds);

          return (
            <section key={edicao.edicao} className="mb-4">
              <h2 className="text-base font-bold text-primary mb-1">
                <Link href={`/edicao/${edicao.edicao}`} className="hover:underline">
                  Edição Nº {edicao.edicao}: {edicao.capa.titulo_principal}
                </Link>
              </h2>
              <ul className="pl-5">
                {idsUnicos.map(id => {
                  const conteudo = getConteudoById(id);
                  if (!conteudo) return null;
                  return (
                    <li key={id} className="text-xs py-0.5">
                      <Link href={`/artigos/${conteudo.id}`} className="text-foreground/90 hover:text-primary">
                        {conteudo.titulo}
                      </Link>
                      {conteudo.isPremium && <LockKeyhole className="inline-block ml-1.5 h-3 w-3 text-destructive/80" />}
                      <span className="text-xs text-muted-foreground ml-1">({conteudo.tipo.replace(/_/g, ' ')})</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </main>
    </div>
  );
}
