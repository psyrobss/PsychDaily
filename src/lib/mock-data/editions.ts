import type { Conteudo, Edicao, MembroEquipeEditorial } from '../types';
// Import data from individual edition files
import { edicao001, conteudosEdicao001 } from './edition-files/edicao-001';
import { edicao002, conteudosEdicao002 } from './edition-files/edicao-002';
import { edicao003, conteudosEdicao003 } from './edition-files/edicao-003';
import { edicao004, conteudosEdicao004 } from './edition-files/edicao-004';
import { edicao005, conteudosEdicao005 } from './edition-files/edicao-005';
import { edicao006, conteudosEdicao006 } from './edition-files/edicao-006';
import { edicao007, conteudosEdicao007 } from './edition-files/edicao-007';
import { edicao008, conteudosEdicao008 } from './edition-files/edicao-008';
import { edicao009, conteudosEdicao009 } from './edition-files/edicao-009';
import { edicao010, conteudosEdicao010 } from './edition-files/edicao-010';
import { edicao011, conteudosEdicao011 } from './edition-files/edicao-011';



import { equipeEditorial as allEquipeEditorial } from './team';

// Aggregate data from all imported edition files
export const conteudos: Conteudo[] = [
    ...conteudosEdicao001,
    ...conteudosEdicao002,
    ...conteudosEdicao003,
    ...conteudosEdicao004,
    ...conteudosEdicao005,
    ...conteudosEdicao006,
    ...conteudosEdicao007,
    ...conteudosEdicao008,
    ...conteudosEdicao009,
    ...conteudosEdicao010,
];

export const edicoes: Edicao[] = [
    edicao001,
    edicao002,
    edicao003,
    edicao004,
    edicao005,
    edicao006,
    edicao007,
    edicao008,
    edicao009,
    edicao010,
];

export const equipeEditorial: MembroEquipeEditorial[] = allEquipeEditorial;

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