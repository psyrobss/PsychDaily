
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function SubscribePage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 animate-in fade-in-50 duration-500">
      <Alert variant="default" className="mb-8 bg-accent/20 border-accent text-accent-foreground">
        <AlertTriangle className="h-5 w-5 text-accent" />
        <AlertTitle className="font-semibold text-accent-foreground/90">Sistema de Assinatura em Construção</AlertTitle>
        <AlertDescription className="text-accent-foreground/80 font-sans">
          No momento, nosso sistema de assinaturas está sendo cuidadosamente preparado. Agradecemos sua paciência! Enquanto isso, você pode nos apoiar com um cafezinho (veja no rodapé).
        </AlertDescription>
      </Alert>

      <Card className="shadow-xl border border-primary/10">
        <CardHeader className="text-center p-6 sm:p-8">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">Assine o PsychDaily</CardTitle>
          <CardDescription className="text-md sm:text-lg text-muted-foreground mt-2 font-sans">
            Tenha acesso ilimitado a insights profundos, narrativas envolventes e casos empáticos (em breve!).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 sm:p-8">
          <p className="text-center text-foreground/80 text-base">
            Ao assinar, você desbloqueará todos os artigos premium, edições anteriores na íntegra e receberá conteúdo exclusivo diretamente no seu email.
          </p>
          <ul className="space-y-3 text-foreground/90 font-serif text-base">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 shrink-0" />
              <span>Acesso completo a todos os artigos, análises e narrativas premium.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 shrink-0" />
              <span>Arquivo completo de edições anteriores para consulta.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 shrink-0" />
              <span>Conteúdo bônus e materiais exclusivos para assinantes.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 shrink-0" />
              <span>Experiência de leitura aprimorada, focada e sem distrações.</span>
            </li>
          </ul>
          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-4xl font-bold text-accent">R$ 5,99<span className="text-lg font-normal text-muted-foreground">/mês</span></p>
            <p className="text-sm text-muted-foreground mt-1 font-sans">Plano introdutório. Cancele quando quiser.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 p-6 sm:p-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="lg" 
                  className="w-full max-w-sm font-sans bg-accent text-accent-foreground hover:bg-accent/90 shadow-md text-lg"
                  disabled // Botão desabilitado
                >
                  Quero Assinar Agora (Em Breve)
                </Button>
              </TooltipTrigger>
              <TooltipContent className="font-sans">
                <p>Nosso sistema de assinatura estará disponível em breve!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <p className="text-xs text-muted-foreground font-sans">
            Processo de pagamento seguro e transparente (em breve).
          </p>
          <Button variant="ghost" asChild className="font-sans text-primary hover:text-primary/80 group mt-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> Voltar para o início
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
