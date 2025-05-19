
import type { Conteudo, Edicao, MembroEquipeEditorial } from '../types';
import { equipeEditorial as allEquipeEditorial } from './team';

// Importações dos dados agregados por mês
import { edicoesMaio2025, conteudosMaio2025 } from './months/2025-05';
import { edicoesJunho2025, conteudosJunho2025 } from './months/2025-06';
import { edicoesJulho2025, conteudosJulho2025 } from './months/2025-07';
// Adicione importações para outros meses aqui conforme eles são criados

// Agregando todos os conteúdos
export const conteudos: Conteudo[] = [
    ...conteudosMaio2025,
    ...conteudosJunho2025,
    ...conteudosJulho2025,
    // Espalhe os conteúdos de outros meses aqui
];

// Agregando todas as edições
export const edicoes: Edicao[] = [
    ...edicoesMaio2025,
    ...edicoesJunho2025,
    ...edicoesJulho2025,
    // Espalhe as edições de outros meses aqui
];

// Mantendo a exportação da equipe editorial
export const equipeEditorial: MembroEquipeEditorial[] = allEquipeEditorial;

// Funções auxiliares
export function getConteudoById(id: string): Conteudo | undefined {
  return conteudos.find(conteudo => conteudo.id === id);
}

export function getSnippetFromConteudo(conteudo: Conteudo, maxLength: number = 150): string {
  if (conteudo.subtitulo && conteudo.subtitulo.length <= maxLength) {
    return conteudo.subtitulo;
  }
  if (conteudo.subtitulo && conteudo.subtitulo.length > maxLength) {
    for (const elemento of conteudo.corpo) {
      if (elemento.tipo === 'paragrafo') {
        const text = elemento.texto;
        if (text.length < (conteudo.subtitulo.length - 20) && text.length > 20) {
             return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
        }
        break;
      }
    }
    return conteudo.subtitulo.substring(0, maxLength - 3) + '...';
  }

  for (const elemento of conteudo.corpo) {
    if (elemento.tipo === 'paragrafo') {
      const text = elemento.texto;
      return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    }
  }
  return 'Leia mais...';
}

export function getEdicaoByNumero(numeroEdicao: string): Edicao | undefined {
  return edicoes.find(ed => ed.edicao === numeroEdicao);
}

export function getMembroEquipeById(id: string): MembroEquipeEditorial | undefined {
  return equipeEditorial.find(membro => membro.id === id);
}
