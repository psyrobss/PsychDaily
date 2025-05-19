
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Coffee, Gift } from "lucide-react";

export default function PixDonationCard() {
  const { toast } = useToast();
  const pixKey = "8760d550-db3e-4794-b6d3-f9fe6b8c3190";
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey)
      .then(() => {
        toast({
          title: "Chave PIX Copiada!",
          description: "Você pode colar a chave no seu app de pagamentos.",
        });
      })
      .catch(err => {
        console.error('Erro ao copiar chave PIX: ', err);
        toast({
          variant: "destructive",
          title: "Erro ao Copiar",
          description: "Não foi possível copiar a chave PIX. Tente manualmente.",
        });
      });
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg border-primary/20 bg-card">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center items-center mb-2">
          <Coffee className="h-8 w-8 text-accent" />
        </div>
        <CardTitle className="text-xl text-primary">Doe um cafezinho!</CardTitle>
        <CardDescription className="text-sm text-muted-foreground font-sans pt-1">
          Sabemos que o café está bastante caro e cada gole de café nos 
          aproxima de um site melhor. Doe um cafezinho!
        </CardDescription>
      </CardHeader>
      
      {!detailsVisible && (
        <CardContent className="flex flex-col items-center pt-2 pb-4">
          <Button 
            variant="outline" 
            onClick={() => setDetailsVisible(true)}
            className="font-sans text-primary hover:bg-accent hover:text-accent-foreground group border-primary/30 hover:border-accent"
          >
            <Gift className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            Quero doar um cafezinho!
          </Button>
        </CardContent>
      )}

      {detailsVisible && (
        <>
          <CardContent className="flex flex-col items-center space-y-4 pt-2 animate-in fade-in-50 duration-500">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 border-2 border-muted-foreground/50 p-1 rounded-md shadow-inner">
              <Image
                src="/images/pix-qrcode.jpeg"
                alt="QR Code PIX para doação de café"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 160px, 192px"
              />
            </div>
            <div className="w-full space-y-1 text-center">
                <p className="text-xs text-muted-foreground font-sans">Ou use a chave PIX:</p>
                <div className="flex items-center gap-2">
                <Input
                    type="text"
                    value={pixKey}
                    readOnly
                    className="text-xs sm:text-sm text-center bg-muted/50 border-muted-foreground/30 truncate"
                    aria-label="Chave PIX"
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyPixKey}
                    className="border-primary/30 hover:bg-accent hover:text-accent-foreground"
                    aria-label="Copiar Chave PIX"
                >
                    <Copy className="h-4 w-4" />
                </Button>
                </div>
            </div>
          </CardContent>
          <CardFooter className="text-center text-xs text-muted-foreground/80 font-sans pt-3 pb-4 animate-in fade-in-50 duration-500">
            <p>Sua contribuição ajuda a manter o PsychDaily no ar e com conteúdo de qualidade!</p>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
