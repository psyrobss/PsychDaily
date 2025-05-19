
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CadastroPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] animate-in fade-in-50 duration-500">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-accent mb-4" />
          <CardTitle className="text-3xl text-primary">
            Página em Construção
          </CardTitle>
          <CardDescription className="font-sans text-muted-foreground pt-2">
            A funcionalidade de cadastro de usuários estará disponível em breve. Agradecemos a sua paciência!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-foreground/80">
            No momento, todo o nosso conteúdo está liberado para acesso. Aproveite!
          </p>
        </CardContent>
        <CardContent className="flex justify-center pt-4">
          <Button variant="outline" asChild className="font-sans text-primary hover:text-accent-foreground hover:bg-accent group">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Voltar para Início
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
