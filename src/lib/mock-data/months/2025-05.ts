
import type { Conteudo, Edicao } from '../types';

// Importações das edições de Maio de 2025
// Assumindo que os arquivos estão em ../edition-files/
import { edicao001, conteudosEdicao001 } from '../edition-files/edicao-001';
import { edicao002, conteudosEdicao002 } from '../edition-files/edicao-002';
import { edicao003, conteudosEdicao003 } from '../edition-files/edicao-003';
import { edicao004, conteudosEdicao004 } from '../edition-files/edicao-004';
import { edicao005, conteudosEdicao005 } from '../edition-files/edicao-005';
import { edicao006, conteudosEdicao006 } from '../edition-files/edicao-006';
import { edicao007, conteudosEdicao007 } from '../edition-files/edicao-007';
import { edicao008, conteudosEdicao008 } from '../edition-files/edicao-008';
import { edicao009, conteudosEdicao009 } from '../edition-files/edicao-009';
import { edicao010, conteudosEdicao010 } from '../edition-files/edicao-010';

export const edicoesMaio2025: Edicao[] = [
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

export const conteudosMaio2025: Conteudo[] = [
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
