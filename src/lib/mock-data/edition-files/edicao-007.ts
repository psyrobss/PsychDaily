
import type { Conteudo, Edicao } from '../types';

// Existing mandatory article
const tdahAutismoDiagnostico007: Conteudo = {
    id: 'tdah-autismo-diagnostico-007',
    tipo: 'artigo_aprofundado',
    titulo: 'TDAH e Autismo: Navegando o Aumento de Diagnósticos na Contemporaneidade',
    subtitulo: 'Uma reflexão crítica sobre os desafios e nuances do diagnóstico crescente de TDAH e TEA, e a importância de abordagens individualizadas.',
    autor: 'Dra. Sofia Fictícia Klein',
    persona_autor: 'A Farmacologista Cautelosa',
    data_publicacao: '2025-05-27',
    corpo: [
      { tipo: 'paragrafo', texto: 'Nas últimas décadas, temos observado um aumento expressivo nos diagnósticos de Transtorno do Déficit de Atenção com Hiperatividade (TDAH) e Transtorno do Espectro Autista (TEA), especialmente em crianças e adolescentes, mas também em adultos. Este fenômeno levanta um debate complexo e multifacetado na comunidade científica, entre profissionais de saúde, educadores e famílias.' },
      { tipo: 'paragrafo', texto: 'Por um lado, maior conscientização, melhores ferramentas diagnósticas e a redução do estigma associado a essas condições neurodivergentes permitiram que mais indivíduos recebessem o apoio e as intervenções necessárias para uma melhor qualidade de vida e desenvolvimento. O reconhecimento da neurodiversidade é um avanço crucial, pois permite que as particularidades de cada indivíduo sejam vistas não como déficits, mas como variações da experiência humana que podem, inclusive, trazer perspectivas e habilidades únicas.' },
      { tipo: 'paragrafo', texto: 'Por outro lado, o aumento nos diagnósticos também suscita questionamentos importantes sobre os critérios diagnósticos, a influência de fatores sociais e ambientais, a pressão por conformidade em ambientes escolares e de trabalho, e o risco de medicalização excessiva de comportamentos que podem ser variações do desenvolvimento humano ou respostas a contextos desafiadores. É fundamental distinguir entre um diagnóstico preciso que abre portas para o suporte adequado e uma rotulação que pode simplificar excessivamente a complexidade individual, levando a intervenções padronizadas que não atendem às necessidades específicas da pessoa.'},
      { tipo: 'sub_cabecalho', texto: 'Fatores Contribuintes e Pontos de Atenção:' },
      { tipo: 'lista_nao_ordenada', itens: [
          { texto: 'Ampliação dos Critérios Diagnósticos: Manuais como o DSM (Manual Diagnóstico e Estatístico de Transtornos Mentais) tiveram seus critérios revisados ao longo do tempo. Essas revisões, embora muitas vezes busquem maior precisão, podem ter contribuído para a inclusão de um espectro mais amplo de apresentações sintomáticas, potencialmente abrangendo indivíduos que antes não se encaixariam nos critérios.' },
          { texto: 'Maior Conscientização Pública e Profissional: O aumento da informação disponível para o público leigo e o treinamento mais específico de profissionais de saúde (pediatras, psicólogos, psiquiatras) e educação podem levar a uma identificação mais frequente e precoce de sinais e sintomas associados ao TDAH e TEA.' },
          { texto: 'Pressões Sociais e Escolares: Expectativas de desempenho acadêmico e comportamental cada vez mais elevadas e, por vezes, padronizadas, podem levar à busca por diagnósticos para justificar ou "resolver" dificuldades de adaptação a sistemas muitas vezes rígidos e pouco flexíveis às necessidades individuais. A pressão por produtividade e conformidade pode tornar comportamentos atípicos mais salientes e problemáticos.' },
          { texto: 'Influência da Indústria Farmacêutica: Embora os medicamentos possam ser ferramentas úteis e necessárias para muitos indivíduos com TDAH, a promoção de tratamentos farmacológicos pela indústria pode, em alguns contextos, influenciar as taxas de diagnóstico e prescrição, direcionando o foco para soluções medicamentosas em detrimento de outras abordagens terapêuticas ou ambientais.' },
          { texto: 'Desafios no Diagnóstico Diferencial: Sintomas de TDAH ou TEA podem se sobrepor a outras condições, como transtornos de ansiedade, depressão, dificuldades de aprendizagem específicas (dislexia, discalculia), transtornos do processamento sensorial, ou mesmo respostas adaptativas a traumas, ambientes familiares disfuncionais ou privação de sono. Um diagnóstico cuidadoso, que explore todas as facetas da vida do indivíduo, é essencial para evitar equívocos.'},
          { texto: 'Subnotificação em Certos Grupos: Paradoxalmente, enquanto há um debate sobre o excesso de diagnósticos, também existe a preocupação com a subnotificação e o subdiagnóstico em certos grupos, como meninas e mulheres (cujos sintomas de TDAH ou TEA podem se manifestar de forma diferente e menos disruptiva), minorias étnicas e populações de baixa renda, que podem ter menos acesso a avaliações especializadas.'}
        ]
      },
      { tipo: 'paragrafo', texto: 'A abordagem ideal envolve uma avaliação multidisciplinar completa, considerando o indivíduo em seu contexto biopsicossocial. É preciso cautela para não patologizar a diversidade humana, ao mesmo tempo em que se garante o acesso a intervenções baseadas em evidências para aqueles que realmente necessitam. O foco deve ser sempre no bem-estar e no desenvolvimento pleno do indivíduo, respeitando sua singularidade e oferecendo suporte personalizado, seja ele terapêutico (como TCC, terapia ocupacional, fonoaudiologia), educacional (adaptações escolares, estratégias de aprendizagem), medicamentoso (quando apropriado e bem indicado, após cuidadosa avaliação de riscos e benefícios) ou ambiental (modificações no ambiente familiar ou escolar para melhor atender às necessidades da pessoa). A escuta atenta da pessoa e de sua família é fundamental nesse processo.' }
    ],
    tags: ["TDAH", "autismo", "TEA", "diagnóstico", "neurodiversidade", "saúde mental infantil", "medicalização", "desenvolvimento"],
    isPremium: false,
    imageUrl: 'https://images.unsplash.com/photo-1604881991720-f91add26905c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuZXVyb2RpdmVyc2l0eSUyMGFic3RyYWN0fGVufDB8fHx8MTY5OTkxNjQwMHww&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'neurodiversity abstract'
  };

const editorialEd007: Conteudo = {
  id: 'editorial-007-perdao',
  tipo: 'editorial',
  titulo: 'O Poder Libertador do Perdão: Para Si e Para o Outro',
  subtitulo: 'Uma reflexão sobre o perdão como um processo de cura interna e fortalecimento emocional, não como esquecimento ou conivência.',
  autor: 'Dra. Helena Fictícia Alcantara',
  persona_autor: 'Dra. Alma Compassiva',
  data_publicacao: '2025-05-27',
  corpo: [
    { tipo: 'paragrafo', texto: 'O perdão é frequentemente mal compreendido. Muitos o associam à fraqueza, ao esquecimento da ofensa ou à reconciliação obrigatória com o ofensor. No entanto, a psicologia nos ensina que o perdão, em sua essência mais profunda, é um ato de libertação interna, um processo complexo que beneficia primordialmente quem perdoa, aliviando o fardo do ressentimento, da raiva e da mágoa que corroem a alma e a saúde.' },
    { tipo: 'paragrafo', texto: 'Perdoar não significa necessariamente esquecer o que aconteceu, nem aprovar a conduta do outro, muito menos restabelecer um relacionamento tóxico. Significa, sim, escolher conscientemente liberar as amarras emocionais que nos prendem à dor do passado, permitindo que possamos seguir em frente com mais leveza e paz interior. É um ato de autocompaixão, um reconhecimento de que merecemos viver livres do peso de emoções negativas que nos aprisionam.' },
    { tipo: 'paragrafo', texto: 'Este processo não anula a justiça ou a necessidade de responsabilização, mas separa a busca por justiça da manutenção de um ciclo vicioso de dor interna. Ao perdoar, reivindicamos nosso poder sobre nossas próprias emoções e bem-estar, independentemente das ações ou do arrependimento do outro.'},
    { tipo: 'sub_cabecalho', texto: 'Desmistificando o Processo de Perdoar' },
    { tipo: 'paragrafo', texto: 'Entender o perdão como uma jornada pessoal e, por vezes, não linear, é fundamental. Algumas etapas e considerações podem auxiliar nesse caminho:'},
    { tipo: 'lista_nao_ordenada', itens: [
      { texto: 'Reconhecer a Dor: Antes de perdoar, é preciso permitir-se sentir e validar a dor causada pela ofensa. Negar ou minimizar o sofrimento impede a cura.' },
      { texto: 'Entender o Significado Pessoal: Refletir sobre como a ofensa impactou sua vida, suas crenças e suas emoções pode trazer clareza.' },
      { texto: 'Perdão é uma Escolha, Não um Sentimento: Você pode não "sentir" vontade de perdoar inicialmente, mas pode escolher iniciar o processo como um ato de autocuidado.' },
      { texto: 'Perdão é um processo, não um evento: Raramente acontece de uma hora para outra. Envolve fases de raiva, negação, tristeza, até a aceitação e a decisão de liberar.' },
      { texto: 'Perdoar é para você, não para o outro: O maior beneficiado é quem perdoa, pois se liberta de um fardo emocional. O outro pode nem saber ou se importar.' },
      { texto: 'Perdão não implica reconciliação: Você pode perdoar alguém e ainda assim escolher manter distância dessa pessoa para proteger seu bem-estar.' },
      { texto: 'Autoperdão é crucial: Muitas vezes, somos nossos juízes mais severos. Aprender a nos perdoar por nossos erros e falhas é fundamental para a autoestima e o crescimento. Isso envolve estender a mesma compaixão a nós mesmos que buscamos oferecer aos outros.' }
    ]},
    { tipo: 'paragrafo', texto: 'Cultivar a capacidade de perdoar, tanto a si mesmo quanto aos outros, requer coragem, introspecção e, por vezes, apoio terapêutico. Mas o resultado é uma liberdade emocional que nos permite investir nossa energia no presente e construir um futuro com mais serenidade e significado. É um dos presentes mais valiosos que podemos dar a nós mesmos, um verdadeiro ato de resgate da nossa paz interior.' }
  ],
  tags: ['perdão', 'autocompaixão', 'cura emocional', 'saúde mental', 'libertação', 'editorial', 'ressentimento', 'relacionamentos'],
  isPremium: false,
  imageUrl: 'https://placehold.co/600x400.png',
  imageHint: 'open hands light'
};

const narrativaEd007: Conteudo = {
  id: 'narrativa-007-biblioteca-coracoes',
  tipo: 'narrativa_ficticia',
  titulo: 'A Biblioteca dos Corações Remendados',
  subtitulo: 'Uma história sobre um lugar onde corações partidos encontravam consolo e a chance de serem reescritos com novas narrativas de esperança.',
  autor: 'Clarice Fictícia Arantes',
  persona_autor: 'A Psicóloga Inventiva',
  data_publicacao: '2025-05-27',
  corpo: [
    { tipo: 'paragrafo', texto: 'Na cidade de Suspiros Velados, aninhada em um vale onde o eco das canções tristes se misturava ao perfume das flores noturnas, existia uma biblioteca peculiar, conhecida apenas pelos que já haviam sentido o aguilhão da perda. Suas prateleiras não continham livros comuns, encadernados em couro e papel, mas sim pequenos receptáculos em formato de coração, feitos de cristal delicado, cada um pulsando com uma luz frágil e única.' },
    { tipo: 'paragrafo', texto: 'Cada coração de cristal guardava a história de uma desilusão amorosa, uma perda irreparável, uma traição dolorosa – as inúmeras formas como um coração humano pode se partir. A bibliotecária, uma senhora de cabelos prateados como o luar e olhos que continham a profundidade de um oceano de experiências, chamava-se Seraphina. Ela era a guardiã desses fragmentos de dor, mas também das sementes de esperança que teimavam em brotar entre as frestas.' },
    { tipo: 'paragrafo', texto: 'As pessoas vinham à Biblioteca dos Corações Remendados não para esquecer ou apagar suas dores, mas para entendê-las, para encontrar um eco de suas próprias jornadas nos cristais alheios. Seraphina as guiava pelos corredores silenciosos, iluminados apenas pela suave luminescência dos corações. Ao tocar um desses artefatos de cristal, o visitante podia sentir, por um instante fugaz, não apenas a dor ali contida, mas também a resiliência, a coragem da superação e, por vezes, o humor agridoce encontrado no absurdo do sofrimento humano.' },
    { tipo: 'dialogo', personagem: 'Seraphina', fala: 'Um coração partido não é um coração destruído, meu caro. É um coração que amou, que se arriscou, que ousou sentir profundamente. As rachaduras são testemunhas de sua coragem, não de sua fraqueza. E aqui, aprendemos que toda rachadura pode ser preenchida com fios de ouro, como na arte ancestral do kintsugi, tornando o coração não apenas inteiro novamente, mas ainda mais belo, forte e único em sua história.' },
    { tipo: 'paragrafo', texto: 'A biblioteca também oferecia "tintas da esperança", feitas de lágrimas transformadas em orvalho da manhã, e "penas da reescrita", confeccionadas com plumas de fênix. Os visitantes eram convidados a, simbolicamente, adicionar novas cores, palavras e perspectivas às suas próprias histórias de coração partido, transformando a narrativa da dor em uma de aprendizado, a da perda em uma de um novo começo, ainda que diferente. Não se tratava de apagar o passado ou de negar o sofrimento, mas de integrá-lo a uma narrativa mais ampla, uma que reconhecesse a capacidade humana de amar, sofrer e, fundamentalmente, de se curar e florescer novamente.' },
    { tipo: 'paragrafo', texto: 'Assim, a Biblioteca dos Corações Remendados não era um lugar de tristeza perpétua, mas um santuário de cura e transformação. Ali, aprendia-se que mesmo o mais fragmentado dos corações ainda pulsa com a inextinguível chama da vida, com a vulnerabilidade que nos torna humanos e com a promessa inerente de que novos capítulos, repletos de novas melodias, aguardam para serem escritos e vividos.' }
  ],
  tags: ['coração partido', 'cura', 'esperança', 'resiliência', 'narrativa', 'kintsugi', 'amor', 'perda', 'transformação'],
  isPremium: false,
  imageUrl: 'https://placehold.co/600x400.png',
  imageHint: 'kintsugi heart book'
};

const colunaEd007: Conteudo = {
  id: 'coluna-007-valor-tedio',
  tipo: 'coluna_fixa',
  titulo: 'Palavras da Alma: O Inestimável Valor do Tédio Criativo',
  subtitulo: 'Uma reflexão sobre como permitir-se o tédio pode ser um portal para a criatividade, a introspecção e o descanso mental em um mundo hiperestimulado.',
  autor: 'Kai Fictício Oliveira',
  persona_autor: 'O Tecelão de Perspectivas',
  data_publicacao: '2025-05-27',
  corpo: [
    { tipo: 'paragrafo', texto: 'Na nossa era de estimulação constante e conectividade perene, onde cada microintervalo de tempo é preenchido por notificações, feeds de redes sociais ou a pressão por produtividade, o tédio tornou-se quase um tabu. É visto como um estado a ser evitado a todo custo, um sinônimo de improdutividade ou vazio existencial. Corremos para preencher qualquer momento de "não fazer nada" com alguma forma de distração, temendo o desconforto do vácuo aparente.' },
    { tipo: 'paragrafo', texto: 'No entanto, e se o tédio, longe de ser um inimigo a ser combatido, fosse um aliado precioso para nossa saúde mental e criatividade? O tédio, quando não combatido com a pressa de preenchê-lo, cria um espaço mental fértil, um vácuo necessário. É nesse "ócio criativo" que a mente pode divagar livremente, sem as amarras das demandas externas, permitindo que novas conexões neurais se formem, que ideias inesperadas surjam e que a criatividade encontre um terreno propício para florescer. Pense no tédio como o solo em pousio, descansando para se tornar mais produtivo e rico em nutrientes depois.' },
    { tipo: 'paragrafo', texto: 'É o momento em que o cérebro, livre da sobrecarga de informações externas, pode processar experiências passadas, refletir sobre si mesmo e acessar insights mais profundos. Filósofos e artistas ao longo da história reconheceram o valor desses momentos de aparente inatividade para a gestação de grandes obras e pensamentos. O tédio pode ser o precursor da introspecção e da autodescoberta.'},
    { tipo: 'paragrafo', texto: 'Permitir-se momentos de tédio não é preguiça, mas uma forma sofisticada de autocuidado mental. Desligar-se das telas, observar o mundo ao redor sem um objetivo específico, ou simplesmente sentar-se em silêncio, permitindo que os pensamentos fluam sem direção, pode ser incrivelmente restaurador. É nesses interlúdios que a imaginação ganha asas e que podemos nos reconectar com nossos pensamentos, desejos e emoções mais autênticos. Que tal, hoje, reservar um pequeno espaço intencional para o tédio e observar, com curiosidade, o que ele tem a lhe oferecer? Pode ser surpreendente.' }
  ],
  tags: ['tédio', 'criatividade', 'mindfulness', 'descanso mental', 'introspecção', 'coluna', 'sobrecarga de informação', 'ócio criativo'],
  isPremium: false,
  imageUrl: 'https://placehold.co/600x300.png',
  imageHint: 'person daydreaming window'
};

const psicofarmacoEd007: Conteudo = {
  id: 'psicofarmaco-007-sono-natural',
  tipo: 'artigo_aprofundado',
  titulo: 'Sono Reparador: Alternativas Naturais e Comportamentais aos Hipnóticos',
  subtitulo: 'Explorando estratégias eficazes para melhorar a qualidade do sono sem recorrer a medicamentos, focando na higiene do sono, técnicas de relaxamento e mudanças no estilo de vida.',
  autor: 'Dra. Sofia Fictícia Klein',
  persona_autor: 'A Farmacologista Cautelosa',
  data_publicacao: '2025-05-27',
  corpo: [
    { tipo: 'paragrafo', texto: 'Embora os medicamentos para dormir, como os hipnóticos, possam oferecer alívio temporário para a insônia, a abordagem mais sustentável e saudável a longo prazo frequentemente envolve estratégias não medicamentosas. A Terapia Cognitivo-Comportamental para Insônia (TCC-I) é considerada o tratamento padrão-ouro pela maioria das diretrizes médicas, mas existem muitas práticas de higiene do sono e técnicas de relaxamento que qualquer pessoa pode implementar para promover um sono mais reparador e restaurador.' },
    { tipo: 'paragrafo', texto: 'Compreender os fatores que influenciam nosso ciclo sono-vigília e adotar hábitos que respeitem os ritmos naturais do corpo são passos fundamentais. Muitas vezes, pequenas, mas consistentes, mudanças na rotina diária e no ambiente de dormir podem ter um impacto significativo na qualidade do sono, reduzindo a necessidade de intervenções farmacológicas ou servindo como um complemento importante a elas.' },
    { tipo: 'sub_cabecalho', texto: 'Pilares da Higiene do Sono e Técnicas Complementares Detalhadas:' },
    { tipo: 'lista_ordenada', itens: [
      { texto: 'Estabeleça uma Rotina Regular de Sono-Vigília: Tente ir para a cama e acordar nos mesmos horários todos os dias, inclusive nos fins de semana, para regular seu relógio biológico (ritmo circadiano). Consistência é chave. Exemplo: Mesmo que você não precise acordar cedo no sábado, tente não variar mais do que 1-2 horas do seu horário usual.' },
      { texto: 'Crie um Ambiente Propício ao Sono: Seu quarto deve ser um santuário para o sono: escuro, silencioso, fresco (temperatura ideal entre 18-22°C para a maioria) e confortável. Invista em cortinas blackout, protetores auriculares, uma máquina de ruído branco se houver barulhos externos, e um colchão e travesseiros adequados. Garanta que o quarto seja associado principalmente ao sono e à intimidade.' },
      { texto: 'Evite Estimulantes Próximo à Hora de Dormir: Cafeína (presente em café, muitos chás, refrigerantes, chocolate e alguns medicamentos) é um estimulante potente que pode permanecer no organismo por várias horas. Evite-a por pelo menos 4-6 horas antes de deitar. A nicotina também é um estimulante e deve ser evitada perto da hora de dormir.' },
      { texto: 'Limite o Consumo de Álcool: Embora o álcool possa induzir sonolência inicial devido ao seu efeito sedativo, ele interfere na arquitetura do sono, especialmente na segunda metade da noite. Pode suprimir o sono REM (importante para a consolidação da memória e regulação emocional) e levar a despertares frequentes, resultando em um sono não reparador.' },
      { texto: 'Desconecte-se de Telas Eletrônicas: A luz azul emitida por smartphones, tablets, computadores e televisões suprime a produção de melatonina, o hormônio que regula o sono. Recomenda-se evitar o uso desses dispositivos por pelo menos 1-2 horas antes de dormir. Opte por atividades relaxantes como ler um livro físico.' },
      { texto: 'Pratique Atividade Física Regularmente: Exercícios físicos são excelentes para promover um sono de melhor qualidade, pois ajudam a regular o ciclo sono-vigília e a reduzir o estresse. No entanto, evite atividades muito intensas ou vigorosas muito perto da hora de dormir, pois podem ter um efeito estimulante. Exercícios mais leves, como alongamento ou yoga, podem ser benéficos à noite.' },
      { texto: 'Crie um Ritual de Relaxamento Pré-Sono: Desenvolva uma rotina de atividades calmantes de 30 a 60 minutos antes de ir para a cama para sinalizar ao seu corpo e mente que é hora de desacelerar. Isso pode incluir um banho morno, leitura de um livro físico (evite temas muito estimulantes), ouvir música suave, meditação, exercícios de respiração profunda ou escrever em um diário de gratidão.' },
      { texto: 'Não Fique na Cama se Não Conseguir Dormir (Regra dos 20 Minutos): Se você estiver na cama por mais de 20-30 minutos sem conseguir adormecer, ou se acordar no meio da noite e não conseguir voltar a dormir, levante-se. Vá para outro cômodo, faça algo relaxante (como ler sob luz fraca) até sentir sono novamente. O objetivo é evitar associar a cama com frustração e ansiedade por não conseguir dormir.' },
      { texto: 'Controle a Exposição à Luz Durante o Dia: Exponha-se à luz natural, especialmente pela manhã, pois isso ajuda a regular seu ritmo circadiano. Durante o dia, mantenha os ambientes bem iluminados. À noite, reduza a intensidade das luzes em casa para preparar o corpo para o sono.' },
      { texto: 'Cuidado com Cochilos Durante o Dia: Cochilos longos ou tardios podem dificultar o sono noturno. Se precisar cochilar, tente que seja por no máximo 20-30 minutos e no início da tarde.'},
      { texto: 'Evite Refeições Pesadas ou Líquidos em Excesso Antes de Dormir: Uma refeição muito volumosa pode causar desconforto e dificultar o sono. Beber muitos líquidos pode levar a idas frequentes ao banheiro durante a noite.' }
    ]},
    { tipo: 'paragrafo', texto: 'Além dessas práticas de higiene do sono, técnicas como a meditação mindfulness, o relaxamento muscular progressivo, a aromaterapia (com óleos essenciais como lavanda ou camomila) e a acupuntura podem ser coadjuvantes valiosos para algumas pessoas. Se a insônia persistir apesar dessas medidas, é fundamental procurar um profissional de saúde (médico ou psicólogo especialista em sono) para investigar possíveis causas subjacentes (como apneia do sono, síndrome das pernas inquietas, transtornos de humor ou ansiedade) e discutir outras opções de tratamento, incluindo a TCC-I, que é altamente eficaz.' }
  ],
  tags: ['sono', 'insônia', 'higiene do sono', 'relaxamento', 'bem-estar', 'saúde natural', 'TCC-I', 'melatonina', 'ritmo circadiano'],
  isPremium: false,
  imageUrl: 'https://placehold.co/600x400.png',
  imageHint: 'peaceful sleep moon'
};

const cronicaEd007: Conteudo = {
  id: 'cronica-007-a-jornada-de-leo',
  tipo: 'narrativa_ficticia',
  titulo: 'A Metamorfose de Leo: Da Ansiedade Social à Conexão Autêntica',
  subtitulo: 'Uma crônica terapêutica sobre como Leo, com apoio profissional e desenvolvimento de habilidades de enfrentamento, transformou seu medo paralisante de interações sociais em uma oportunidade de crescimento e autenticidade.',
  autor: 'Dra. Helena Fictícia Alcantara',
  persona_autor: 'Dra. Alma Compassiva',
  data_publicacao: '2025-05-27',
  corpo: [
    { tipo: 'paragrafo', texto: 'Leo chegou à terapia com a voz baixa e os ombros curvados, como se carregasse o peso invisível do olhar alheio. A ansiedade social era sua sombra constante, transformando cada interação potencial – desde uma simples conversa no café até uma apresentação no trabalho – em um campo minado de medos: medo de ser julgado negativamente, de dizer algo errado ou embaraçoso, de não ser interessante o suficiente, de ruborizar ou tremer visivelmente. Festas, reuniões de trabalho, até mesmo um simples telefonema para marcar uma consulta, eram fontes de angústia intensa e antecipatória, levando-o a um isolamento progressivo que só alimentava sua solidão e uma autocrítica feroz.' },
    { tipo: 'paragrafo', texto: 'No nosso espaço terapêutico, um ambiente seguro e de total confidencialidade, começamos a desconstruir esses medos. Exploramos as origens de sua ansiedade, muitas vezes ligadas a experiências de infância ou adolescência onde se sentiu inadequado, exposto ou ridicularizado, internalizando crenças negativas sobre si mesmo e sobre o mundo social. Identificamos os pensamentos automáticos negativos que disparavam em situações sociais ("Todos vão me achar estranho e desajeitado", "Não tenho nada de valor a contribuir", "Com certeza vou gaguejar e fazer papel de bobo") e trabalhamos com técnicas da Terapia Cognitivo-Comportamental (TCC) para questionar a validade e a utilidade dessas crenças disfuncionais, buscando evidências que as confirmassem ou refutassem.' },
    { tipo: 'paragrafo', texto: 'A exposição gradual e hierarquizada foi uma parte crucial do processo terapêutico. Começamos com pequenos passos, situações de baixo risco que geravam um nível moderado de ansiedade: cumprimentar um vizinho no elevador, fazer uma pergunta a um colega sobre uma tarefa, participar brevemente de uma conversa em grupo com amigos de confiança. Cada pequeno "experimento comportamental" era cuidadosamente planejado, com foco em observar a realidade da situação (o que de fato acontecia) em vez de se deixar levar pelas previsões catastróficas da ansiedade. Leo aprendeu a tolerar o desconforto inicial, a perceber que as reações dos outros eram frequentemente neutras ou até positivas, e que seus medos eram, na maioria das vezes, desproporcionais à situação real.' },
    { tipo: 'dialogo', personagem: 'Leo (após uma pequena interação social bem-sucedida)', fala: 'Foi menos terrível do que eu imaginei. Na verdade, a pessoa foi simpática e até sorriu. Acho que eu crio monstros muito maiores na minha cabeça do que eles realmente são lá fora. E mesmo que eu tenha ficado um pouco nervoso, sobrevivi!' },
    { tipo: 'paragrafo', texto: 'Paralelamente, desenvolvemos habilidades de comunicação assertiva (como expressar opiniões e necessidades de forma clara e respeitosa), técnicas de relaxamento (como a respiração diafragmática) para manejar os sintomas físicos da ansiedade, e estratégias de mindfulness para ajudar Leo a focar no momento presente, em vez de se perder em autocríticas ou preocupações futuras. Leo praticou a auto-observação compassiva, aprendendo a reconhecer seus gatilhos e a responder a eles com mais gentileza e menos autojulgamento. Ele começou a direcionar seu foco mais para o processo de conexão e para o interesse genuíno pelos outros, em vez de se preocupar excessivamente com sua própria performance social.' },
    { tipo: 'paragrafo', texto: 'A jornada de Leo foi de uma metamorfose gradual, com altos e baixos, mas com um progresso constante. A ansiedade social não desapareceu completamente – e nem precisava, pois um certo nível de alerta social pode ser adaptativo – mas ele aprendeu a navegar por ela, a não deixar que ela ditasse suas escolhas e limitasse sua vida. Hoje, Leo participa de eventos, contribui ativamente em reuniões e, o mais importante, construiu relações sociais mais autênticas e satisfatórias. Ele descobriu que a verdadeira conexão nasce da vulnerabilidade, da aceitação de si mesmo e da coragem de ser quem ele é, mesmo com suas imperfeições e inseguranças.' }
  ],
  tags: ['ansiedade social', 'TCC', 'exposição gradual', 'habilidades sociais', 'terapia', 'crônica', 'autoconfiança', 'medo do julgamento', 'isolamento'],
  isPremium: true,
  imageUrl: 'https://placehold.co/600x400.png',
  imageHint: 'person connecting group'
};

const tecnicaEd007: Conteudo = {
  id: 'tecnica-007-mindful-eating',
  tipo: 'artigo_aprofundado',
  titulo: 'Mindful Eating: Redescobrindo o Prazer e a Consciência na Alimentação',
  subtitulo: 'Aprenda a praticar a alimentação consciente para melhorar sua relação com a comida, saborear os alimentos e reconhecer os sinais de fome e saciedade do corpo, promovendo bem-estar físico e mental.',
  autor: 'Dra. Helena Fictícia Alcantara',
  persona_autor: 'Dra. Alma Compassiva',
  data_publicacao: '2025-05-27',
  corpo: [
    { tipo: 'paragrafo', texto: 'Em um mundo onde comemos apressadamente em frente a telas, durante reuniões de trabalho ou enquanto realizamos múltiplas tarefas, a prática do mindful eating (alimentação consciente) surge como um convite poderoso para resgatar uma conexão mais profunda, saudável e prazerosa com a comida e com nosso próprio corpo. Não se trata de uma dieta restritiva, nem de um conjunto de regras rígidas sobre o que ou quando comer, mas de uma abordagem que envolve prestar atenção plena e intencional à experiência de comer, utilizando todos os nossos sentidos e cultivando uma consciência sem julgamentos.' },
    { tipo: 'paragrafo', texto: 'O mindful eating nos ajuda a sair do piloto automático, frequentemente responsável por escolhas alimentares impulsivas ou pelo consumo excessivo. Ele nos encoraja a reconhecer os sinais internos de fome física e saciedade, a identificar gatilhos emocionais para o comer (como estresse, tédio, tristeza ou recompensa) e a saborear verdadeiramente os alimentos, apreciando suas texturas, aromas e sabores. Ao cultivar essa consciência, podemos desenvolver uma relação mais equilibrada e harmoniosa com a comida, reduzir o comer compulsivo ou emocional, melhorar a digestão e aumentar o prazer e a satisfação derivados da alimentação.' },
    { tipo: 'sub_cabecalho', texto: 'Princípios e Práticas Detalhadas da Alimentação Consciente:' },
    { tipo: 'lista_nao_ordenada', itens: [
      { texto: 'Atenção Plena aos Sinais de Fome e Saciedade: Antes de comer, faça uma pausa e pergunte-se: "Estou realmente com fome física?". Avalie sua fome em uma escala (ex: de 1 a 10). Durante a refeição, coma devagar e preste atenção aos sinais de que seu corpo está satisfeito, não necessariamente "cheio". Evite comer até se sentir desconfortavelmente cheio. Lembre-se que leva cerca de 20 minutos para o cérebro registrar a saciedade.' },
      { texto: 'Comer sem Distrações Externas: Desligue a TV, o computador, guarde o celular. Se possível, evite comer enquanto trabalha ou dirige. Concentre-se apenas na sua refeição. Isso permite que você esteja mais presente e consciente da experiência, melhorando a percepção dos sinais de saciedade e o prazer da comida.' },
      { texto: 'Utilize Todos os Seus Sentidos: Antes de dar a primeira mordida, observe a comida. Note suas cores, formas, texturas. Sinta seus aromas. Ao comer, saboreie cada mordida, prestando atenção aos diferentes gostos (doce, salgado, amargo, ácido, umami) e como eles se combinam e mudam. Preste atenção à sensação do alimento na boca – sua temperatura, sua consistência.' },
      { texto: 'Coma Devagar e Mastigue Bem: A digestão começa na boca com a mastigação e a ação das enzimas salivares. Comer devagar e mastigar completamente os alimentos não só facilita a digestão e a absorção de nutrientes, mas também dá tempo ao cérebro para registrar a saciedade e permite que você aprecie melhor os sabores.' },
      { texto: 'Reconheça os Gatilhos Emocionais para Comer: Observe se você busca comida em resposta a emoções como estresse, tédio, tristeza, solidão ou mesmo para celebrar, em vez de fome física real. Se identificar esse padrão, busque outras formas mais saudáveis e construtivas de lidar com essas emoções (como conversar com um amigo, praticar um hobby, fazer exercícios de relaxamento).' },
      { texto: 'Aprecie a Origem dos Alimentos e Cultive Gratidão: Reflita brevemente sobre o caminho que o alimento percorreu até chegar ao seu prato – o solo, o sol, a chuva, as pessoas que o cultivaram, colheram, transportaram e prepararam. Cultivar gratidão por esse processo pode enriquecer a experiência alimentar e promover uma conexão mais profunda com o alimento e com a natureza.' },
      { texto: 'Coma com Não Julgamento e Autocompaixão: Se você comer algo que considera "não saudável" ou se comer mais do que pretendia, evite a autocrítica severa ou sentimentos de culpa. Simplesmente observe a experiência sem julgamento, aprenda com ela se possível, e retome suas práticas conscientes na próxima refeição. A alimentação consciente não é sobre perfeição, mas sobre consciência e gentileza consigo mesmo.' }
    ]},
    { tipo: 'paragrafo', texto: 'Incorporar o mindful eating em sua rotina pode ser uma jornada gradual e prazerosa. Comece praticando em uma refeição por dia ou mesmo em algumas mordidas de uma refeição. Não há necessidade de pressa ou pressão. Com o tempo, essa abordagem consciente pode transformar profundamente sua relação com a comida, promovendo não apenas uma nutrição mais saudável e equilibrada, mas também um maior bem-estar emocional, uma maior apreciação pelos prazeres simples da vida e uma conexão mais íntima com seu próprio corpo.' }
  ],
  tags: ['mindful eating', 'alimentação consciente', 'mindfulness', 'bem-estar', 'saúde', 'comer emocional', 'técnicas terapêuticas', 'fome e saciedade', 'relação com a comida'],
  isPremium: false,
  imageUrl: 'https://placehold.co/600x400.png',
  imageHint: 'person eating mindfully'
};

export const conteudosEdicao007: Conteudo[] = [
  tdahAutismoDiagnostico007,
  editorialEd007,
  narrativaEd007,
  colunaEd007,
  psicofarmacoEd007,
  cronicaEd007,
  tecnicaEd007
];

export const edicao007: Edicao = {
  edicao: "007",
  data: "2025-05-27", // Terça-feira
  capa: {
    titulo_principal: "Diagnósticos em Debate, o Poder do Perdão e a Arte de Comer Consciente",
    subtitulo: "Nesta edição: TDAH/TEA, a jornada do perdão, a biblioteca dos corações, o valor do tédio e mindful eating.",
    imagem_destaque: "https://placehold.co/800x500.png",
    imageHint: "brain puzzle scales",
    credito_imagem: "PsychDaily Images",
    links_manchetes: [
      { titulo: tdahAutismoDiagnostico007.titulo, id_conteudo: tdahAutismoDiagnostico007.id },
      { titulo: editorialEd007.titulo, id_conteudo: editorialEd007.id },
      { titulo: tecnicaEd007.titulo, id_conteudo: tecnicaEd007.id },
      { titulo: cronicaEd007.titulo, id_conteudo: cronicaEd007.id }
    ]
  },
  secoes: [
    { nome_secao: "Destaques da Edição", tipo: "capa", conteudo_ids: [tdahAutismoDiagnostico007.id, editorialEd007.id, tecnicaEd007.id, cronicaEd007.id, narrativaEd007.id] },
    { nome_secao: "A Perspectiva do Psicólogo", tipo: "editorial", conteudo_ids: [editorialEd007.id] },
    { nome_secao: "Exploração Profunda", tipo: "caderno_especial", conteudo_ids: [tdahAutismoDiagnostico007.id] },
    { nome_secao: "Contos da Psique", tipo: "narrativas", conteudo_ids: [narrativaEd007.id] },
    { nome_secao: "Palavras da Alma", tipo: "colunas", conteudo_ids: [colunaEd007.id] },
    { nome_secao: "Psicofarmacologia: Entre a Cura e a Crítica", tipo: "caderno_especial", conteudo_ids: [psicofarmacoEd007.id] },
    { nome_secao: "Do Consultório: Relatos e Reflexões", tipo: "narrativas", conteudo_ids: [cronicaEd007.id] },
    { nome_secao: "Ferramentas para o Bem-Estar: Técnicas Terapêuticas", tipo: "caderno_especial", conteudo_ids: [tecnicaEd007.id] }
  ]
};

    