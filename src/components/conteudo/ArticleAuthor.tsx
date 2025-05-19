
import { UserCircle, Type } from 'lucide-react';

interface ArticleAuthorProps {
  author: string;
  persona?: string;
}

export default function ArticleAuthor({ author, persona }: ArticleAuthorProps) {
  if (!author) return null;

  return (
    <div className="text-sm text-muted-foreground font-sans">
      <div className="flex items-center">
        <UserCircle className="mr-1.5 h-4 w-4 text-primary/70" />
        <span>Por: {author}</span>
      </div>
      {persona && (
        <div className="flex items-center mt-0.5 text-xs text-accent">
          <Type className="mr-1.5 h-3.5 w-3.5" />
          <span>{persona}</span>
        </div>
      )}
    </div>
  );
}
