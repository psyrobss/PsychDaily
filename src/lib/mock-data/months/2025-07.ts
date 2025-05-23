
import type { Conteudo, Edicao } from '../../types';

// Importações das edições de Julho de 2025
import { edicao032, conteudosEdicao032 } from '../edition-files/edicao-032';
import { edicao033, conteudosEdicao033 } from '../edition-files/edicao-033';
import { edicao034, conteudosEdicao034 } from '../edition-files/edicao-034';
// import { edicao035, conteudosEdicao035 } from '../edition-files/edicao-035';
// import { edicao036, conteudosEdicao036 } from '../edition-files/edicao-036';
// import { edicao037, conteudosEdicao037 } from '../edition-files/edicao-037';
// import { edicao038, conteudosEdicao038 } from '../edition-files/edicao-038';
// import { edicao039, conteudosEdicao039 } from '../edition-files/edicao-039';
// import { edicao040, conteudosEdicao040 } from '../edition-files/edicao-040';
// import { edicao041, conteudosEdicao041 } from '../edition-files/edicao-041';
// import { edicao042, conteudosEdicao042 } from '../edition-files/edicao-042';
// import { edicao043, conteudosEdicao043 } from '../edition-files/edicao-043';
// import { edicao044, conteudosEdicao044 } from '../edition-files/edicao-044';
// import { edicao045, conteudosEdicao045 } from '../edition-files/edicao-045';
// import { edicao046, conteudosEdicao046 } from '../edition-files/edicao-046';
// import { edicao047, conteudosEdicao047 } from '../edition-files/edicao-047';
// import { edicao048, conteudosEdicao048 } from '../edition-files/edicao-048';
// import { edicao049, conteudosEdicao049 } from '../edition-files/edicao-049';
// import { edicao050, conteudosEdicao050 } from '../edition-files/edicao-050';



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
