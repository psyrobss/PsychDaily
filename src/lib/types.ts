
// Base element types for the 'corpo' array
export interface CorpoParagrafo {
  tipo: 'paragrafo';
  texto: string;
}

export interface CorpoDialogo {
  tipo: 'dialogo';
  personagem: string;
  fala: string;
}

export interface CorpoImagem {
  tipo: 'imagem';
  url: string;
  legenda?: string;
  credito?: string;
  dataAiHint?: string;
  imageHint?: string; // Hint for AI image generation if placeholders are used
}

export interface CorpoCitacao {
  tipo: 'citacao';
  texto: string;
  autor_citado?: string;
}

export interface CorpoSubCabecalho {
  tipo: 'sub_cabecalho';
  texto: string;
}

export interface CorpoListaItem {
  texto: string;
  imagem?: string;  // Optional image for list items
  legenda?: string; // Optional caption for list item images
  imageHint?: string; // Hint for AI image generation if placeholders are used
  subLista?: CorpoLista;  // Optional sub-list for nested lists
  subListaTipo?: 'lista_ordenada' | 'lista_nao_ordenada'; // Type of the sub-list
}
export interface CorpoLista {
  tipo: 'lista_nao_ordenada' | 'lista_ordenada'|'lista_com_imagem'| 'legenda_imagem' ;
  itens: CorpoListaItem[];
}


// Union type for all possible corpo elements
export type CorpoElemento =
  | CorpoParagrafo
  | CorpoDialogo
  | CorpoImagem
  | CorpoCitacao
  | CorpoSubCabecalho
  | CorpoLista;

// Main content type, replacing the old Article type
export interface Conteudo {
  id: string;
  tipo: 'narrativa_ficticia' | 'noticia' | 'editorial' | 'insight_psicologico' | 'artigo_aprofundado' | 'coluna_fixa' | string; // Allow string for flexibility or extend union
  titulo: string;
  subtitulo?: string;
  autor: string;
  persona_autor?: string;
  data_publicacao: string; // ISO date string, e.g., "2023-10-27"
  corpo: CorpoElemento[];
  tags: string[];
  links_relacionados?: {
    titulo: string;
    url: string;
  }[];
  isPremium: boolean;
  imageUrl?: string; // Featured image for cards/previews
  imageHint?: string; // Hint for AI image generation if placeholders are used
  audioUrl?: string; // URL for pre-recorded audio file
}

// Edition type
export interface Secao {
  nome_secao: string;
  tipo: 'capa' | 'editorial' | 'narrativas' | 'colunas' | 'artigo_aprofundado' | 'caderno_especial' | string; // Allow string for flexibility or extend union
  conteudo_ids: string[]; // Array of Conteudo.id
}

export interface Edicao {
  edicao: string; // Edition number, e.g., "001"
  data: string; // ISO date string, e.g., "2023-10-27"
  capa: {
    titulo_principal: string;
    subtitulo?: string;
    imagem_destaque: string;
    imageHint?: string;
    credito_imagem?: string;
    links_manchetes: {
      titulo: string;
      id_conteudo: string; // Refers to Conteudo.id
    }[];
  };
  secoes: Secao[];
}

// Editorial Team Member type
export interface MembroEquipeEditorial {
  id: string;
  nome: string;
  persona: string;
  cargo: string;
  biografia: string[]; // Array of paragraphs, can be expanded for detailed view
  imageUrl: string;
  imageHint: string;
  externalProfileUrl?: string; // Optional external link for profiles
}

