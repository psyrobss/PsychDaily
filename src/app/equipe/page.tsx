
import { equipeEditorial } from '@/lib/mock-data/index';
import MembroEquipeCard from '@/components/equipe/MembroEquipeCard';
import { Users } from 'lucide-react';

export const metadata = {
  title: 'Nossa Equipe | PsychDaily',
  description: 'Conheça a equipe editorial por trás do PsychDaily, dedicada a uma psicologia crítica, social e científica.',
};

export default function EquipePage() {
  return (
    <div className="space-y-12 animate-in fade-in-50 duration-500">
      <header className="text-center py-6 border-b-2 border-primary/20">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3 flex items-center justify-center">
          <Users className="mr-3 h-10 w-10" />
          Nossa Equipe Editorial
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Conheça as pessoas dedicadas a trazer insights psicológicos com uma perspectiva crítica, social, científica e profundamente humana.
        </p>
      </header>

      {equipeEditorial.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {equipeEditorial.map((membro) => (
            <MembroEquipeCard key={membro.id} membro={membro} />
          ))}
        </section>
      ) : (
        <p className="text-center text-muted-foreground text-lg">
          Nenhuma informação sobre a equipe disponível no momento.
        </p>
      )}
    </div>
  );
}
