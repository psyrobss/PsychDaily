
import { Badge } from '@/components/ui/badge';
import { LockKeyhole, Sparkles } from 'lucide-react';

interface IndicadorConteudoPagoProps {
  isPremium: boolean;
  className?: string;
}

export default function IndicadorConteudoPago({ isPremium, className }: IndicadorConteudoPagoProps) {
  return (
    <Badge variant={isPremium ? "destructive" : "secondary"} className={`font-sans text-xs py-0.5 px-2 ${className}`}>
      {isPremium ? <LockKeyhole className="mr-1 h-3 w-3" /> : <Sparkles className="mr-1 h-3 w-3" />}
      {isPremium ? 'Premium' : 'Gratuito'}
    </Badge>
  );
}
