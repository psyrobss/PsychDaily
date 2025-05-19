'use client';

import type { Conteudo, CorpoElemento } from '@/lib/types';
import Image from 'next/image';
import PaywallPlaceholder from './PaywallPlaceholder'; 
import CaixaTextoDestacada from '@/components/ui/CaixaTextoDestacada'; 

interface ConteudoRendererProps {
  conteudo: Conteudo;
  isSubscribed: boolean; 
}

const renderCorpoElemento = (elemento: CorpoElemento, index: number) => {
  switch (elemento.tipo) {
    case 'paragrafo':
      return <p key={index}>{elemento.texto}</p>; 
    case 'sub_cabecalho':
      // A classe font-serif aqui é redundante se o prose a estiver aplicando aos headings
      return <h3 key={index}>{elemento.texto}</h3>; 
    case 'dialogo':
      return (
        // A classe `prose-p:my-0` pode ser aplicada via config do typography ou aqui se necessário especificamente.
        <CaixaTextoDestacada key={index} className="my-4 p-3 border-l-4 border-accent/50 bg-muted/30 rounded-r-md italic prose-p:my-0">
          <span className="font-semibold text-primary/90 not-italic font-serif">{elemento.personagem}:</span>
          <p className="ml-2 inline font-serif">{elemento.fala}</p>
        </CaixaTextoDestacada>
      );
    case 'imagem':
      return (
        <figure key={index} className="my-6"> 
          <div className="relative w-full max-w-xl mx-auto aspect-[16/9] rounded-md overflow-hidden shadow-md">
           <Image src={elemento.url} alt={elemento.legenda || 'Imagem do artigo'} fill className="object-contain" data-ai-hint={elemento.dataAiHint || "article content image"} />
          </div>
          {elemento.legenda && <figcaption className="mt-2 text-sm text-muted-foreground font-sans text-center">{elemento.legenda}</figcaption>}
          {elemento.credito && <figcaption className="mt-1 text-xs text-muted-foreground/70 font-sans text-center">Crédito: {elemento.credito}</figcaption>}
        </figure>
      );
    case 'citacao':
      return ( 
        <blockquote key={index}>
          <p className="font-serif">"{elemento.texto}"</p> 
          {elemento.autor_citado && <footer className="text-sm font-sans mt-1">- {elemento.autor_citado}</footer>}
        </blockquote>
      );
    case 'lista_nao_ordenada':
      return ( 
        <ul key={index} className="list-disc pl-5">
          {elemento.itens.map((item, i) => <li key={i} className="font-serif">{item.texto}</li>)}
        </ul>
      );
    case 'lista_ordenada':
      return ( 
        <ol key={index} className="list-decimal pl-5">
          {elemento.itens.map((item, i) => <li key={i} className="font-serif">{item.texto}</li>)}
        </ol>
      );
    default:
      return null;
  }
};

export default function ConteudoRenderer({ conteudo, isSubscribed }: ConteudoRendererProps) {
  const showFullContent = !conteudo.isPremium || (conteudo.isPremium && isSubscribed);
  
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert 
                   prose-headings:font-serif prose-headings:text-primary 
                   prose-p:font-serif prose-p:leading-relaxed 
                   prose-li:font-serif prose-li:my-1
                   prose-blockquote:font-serif prose-blockquote:border-accent prose-blockquote:bg-accent/10 prose-blockquote:text-accent-foreground/90 prose-blockquote:p-4 prose-blockquote:rounded-r-md
                   prose-strong:text-foreground/90 prose-em:text-foreground/80
                   prose-a:text-primary hover:prose-a:text-accent">
      {showFullContent ? (
        conteudo.corpo.map((elemento, index) => renderCorpoElemento(elemento, index))
      ) : (
        <PaywallPlaceholder conteudo={conteudo} />
      )}
    </div>
  );
}
