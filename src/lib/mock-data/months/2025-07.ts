
import type { Conteudo, Edicao } from '../types';

// Importações das edições de Julho de 2025
import { edicao032, conteudosEdicao032 } from '../edition-files/edicao-032';
import { edicao033, conteudosEdicao033 } from '../edition-files/edicao-033';
import { edicao034, conteudosEdicao034 } from '../edition-files/edicao-034';
// Adicione importações para outras edições de Julho aqui quando forem criadas

export const edicoesJulho2025: Edicao[] = [
  edicao032,
  edicao033,
  edicao034,
  // Adicione outras edições de Julho aqui
];

export const conteudosJulho2025: Conteudo[] = [
  ...conteudosEdicao032,
  ...conteudosEdicao033,
  ...conteudosEdicao034,
  // Espalhe os conteúdos de outras edições de Julho aqui
];
