
import { cn } from '@/lib/utils';
import type React from 'react';

interface CaixaTextoDestacadaProps {
  children: React.ReactNode;
  className?: string;
}

export default function CaixaTextoDestacada({ children, className }: CaixaTextoDestacadaProps) {
  return (
    <div className={cn(
      "my-6 p-4 border-l-4 border-primary/30 bg-primary/5 rounded-r-md shadow",
      className
    )}>
      {children}
    </div>
  );
}
