
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Users, Sparkles, Target, Microscope, Handshake, Cpu, Edit } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Sobre o PsychDaily | Nossa Missão e Valores',
  description: 'Conheça a missão, visão e os pilares do PsychDaily, seu jornal digital dedicado a uma psicologia crítica, social, científica e profundamente humana.',
};

export default function SobrePage() {
  const pilares = [
    {
      icon: Target,
      titulo: 'Psicologia Crítica e Social',
      descricao: 'Analisamos os fenômenos psicológicos em seu contexto social, cultural e histórico, questionando narrativas dominantes e promovendo o pensamento crítico para uma compreensão mais profunda e engajada da mente humana.',
    },
    {
      icon: Microscope,
      titulo: 'Ciência com Consciência',
      descricao: 'Valorizamos o rigor científico e a pesquisa baseada em evidências, traduzindo descobertas complexas em linguagem clara e aplicável, sempre com responsabilidade ética, social e um olhar atento às implicações de nossas publicações.',
    },
    {
      icon: Handshake,
      titulo: 'Acessibilidade e Inclusão Radical',
      descricao: 'Comprometemo-nos a criar um espaço onde o conhecimento psicológico é para todos. Desafiamos o capacitismo, o racismo, o sexismo e o colonialismo no saber, promovendo ativamente a inclusão de diversas vozes, experiências e epistemologias.',
    },
    {
      icon: Sparkles,
      titulo: 'Narrativas que Curam e Conectam',
      descricao: 'Acreditamos no poder das histórias – reais e fictícias – para iluminar a experiência humana, promover a compaixão, facilitar a conexão e inspirar a transformação pessoal e coletiva.',
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in-50 duration-500">
      <header className="text-center py-6 border-b-2 border-primary/20">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">
          Sobre o PsychDaily
        </h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Desvendando a Mente, Nutrindo a Alma: Sua Jornada Diária pela Psicologia.
        </p>
      </header>

      <section className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-foreground/90">
        <p>
          Bem-vindo(a) ao <strong>PsychDaily</strong>, seu portal diário dedicado a explorar o vasto e fascinante universo da psicologia. Nascemos da paixão por desmistificar a ciência da mente e do comportamento, tornando-a acessível, relevante e profundamente humana. Nossa missão é ir além do superficial, oferecendo insights, reflexões e narrativas que tocam a alma e provocam o pensamento crítico.
        </p>
        <p>
          Acreditamos em uma psicologia que é, ao mesmo tempo, rigorosamente científica e intrinsecamente social. Uma psicologia que reconhece e desafia as estruturas de poder, que é anticolonialista em sua abordagem, anticapacitista em sua prática, antirracista em sua análise e antissexista em sua perspectiva. No PsychDaily, buscamos construir pontes entre o saber acadêmico e a vivência cotidiana, oferecendo ferramentas para o autoconhecimento, a compaixão e a construção de um bem-estar individual e coletivo mais justo e autêntico.
        </p>
      </section>

      <Separator className="my-10 border-primary/15" />

      <section className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Nossa Abordagem de Conteúdo</h2>
        
        <div className="bg-accent/10 p-6 rounded-lg shadow-md border-l-4 border-accent">
          <div className="flex items-start">
            <Cpu className="h-8 w-8 text-accent mr-4 mt-1 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-accent-foreground mb-2">Transparência e Ética com IA</h3>
              <p className="text-foreground/80 leading-relaxed font-sans text-base mb-3">
                Para dar vida inicial ao PsychDaily e explorar as fronteiras da criação de conteúdo, algumas de nossas personas editoriais e uma parte dos artigos iniciais foram concebidos com o auxílio de Inteligência Artificial. Este processo é conduzido com total responsabilidade e sob curadoria humana, buscando sempre alinhar cada texto aos princípios éticos e científicos da psicologia que defendemos.
                <br />
                Como o Dr. Savoldi é muito pouco criativo, ele não cria nada dos conteúdos aqui. Mas ele organiza e faz a curadoria dos textos, sempre com o olhar crítico e atento às nuances da psicologia. A IA é uma ferramenta que nos ajuda a explorar novas possibilidades, mas nunca substitui a voz humana e a experiência vivida.
                <br />
                A ideia é, ironicamente, ir substituindo textos artificiais por escritos humanos, à medida que nossa equipe editorial cresce e se diversifica. Assim, o PsychDaily se torna um espaço onde a tecnologia e a humanidade coexistem,  mas sempre com o compromisso de priorizar a voz humana e a experiência vivida.
                <br />

              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-lg shadow-md border-l-4 border-primary">
          <div className="flex items-start">
            <Edit className="h-8 w-8 text-primary mr-4 mt-1 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-primary/90 mb-2">Colabore Conosco: A Voz Humana no Centro</h3>
              <p className="text-foreground/80 leading-relaxed font-sans text-base mb-3">
                Acreditamos firmemente no valor insubstituível da experiência e criatividade humanas. Por isso, o PsychDaily é um espaço aberto e convidativo para psicólogos, pesquisadores, estudantes e todos os apaixonados pela mente humana que desejam compartilhar seus conhecimentos, reflexões e narrativas.
              </p>
              <p className="text-foreground/80 leading-relaxed font-sans text-base">
                À medida que nossa comunidade cresce, nosso objetivo é que as contribuições humanas enriqueçam e gradualmente substituam os elementos assistidos por IA. Em um mundo onde tanto se discute a substituição do humano pela máquina, o PsychDaily aposta na colaboração e na primazia da voz humana para tecer os saberes da psicologia. Sua perspectiva é fundamental para nós! (Em breve, informaremos como enviar suas contribuições).
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-10 border-primary/15" />

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Nossos Pilares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pilares.map((pilar) => (
            <div key={pilar.titulo} className="bg-card p-6 rounded-lg shadow-lg border border-primary/10 flex flex-col items-center text-center">
              <pilar.icon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{pilar.titulo}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed font-sans">{pilar.descricao}</p>
            </div>
          ))}
        </div>
      </section>
      
      <Separator className="my-10 border-primary/15" />

      <section className="text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-primary mb-4">Junte-se a Nós Nesta Jornada</h2>
        <p className="text-lg text-foreground/80">
          Convidamos você a mergulhar em nossas edições diárias, explorar os perfis de nossa dedicada equipe editorial e fazer parte desta comunidade de aprendizado e descoberta. No PsychDaily, cada dia é uma nova oportunidade para entender melhor a si mesmo e ao mundo ao seu redor.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Button size="lg" asChild className="font-sans bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
            <Link href="/edicoes" className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Ver Edições Anteriores
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="font-sans text-primary hover:text-accent-foreground hover:bg-accent group border-primary/30 hover:border-accent">
            <Link href="/equipe" className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Conheça Nossa Equipe
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
