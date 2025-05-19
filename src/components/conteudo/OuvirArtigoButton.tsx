
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { PlayCircle, StopCircle, Volume2, Settings } from 'lucide-react';
import type { CorpoElemento } from '@/lib/types';

interface OuvirArtigoButtonProps {
  corpo: CorpoElemento[];
  title?: string;
  audioUrl?: string;
}

export default function OuvirArtigoButton({ corpo, title, audioUrl }: OuvirArtigoButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupportedTTS, setIsSupportedTTS] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | undefined>(undefined);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);

  const populateVoiceList = useCallback(() => {
    if (!isSupportedTTS || typeof window.speechSynthesis === 'undefined') return;
    const availableVoices = window.speechSynthesis.getVoices();
    const ptBRVoices = availableVoices.filter(voice => voice.lang.startsWith('pt-BR'));
    setVoices(ptBRVoices);

    if (ptBRVoices.length > 0) {
      const preferredGoogleVoice = ptBRVoices.find(v => v.name.includes('Google') && v.name.includes('Brasil'));
      const preferredMicrosoftVoice = ptBRVoices.find(v => v.name.includes('Microsoft') && (v.name.includes('Francisca') || v.name.includes('Antonio')));
      const defaultVoice = ptBRVoices.find(v => v.default);
      
      if (preferredGoogleVoice) setSelectedVoiceURI(preferredGoogleVoice.voiceURI);
      else if (preferredMicrosoftVoice) setSelectedVoiceURI(preferredMicrosoftVoice.voiceURI);
      else if (defaultVoice) setSelectedVoiceURI(defaultVoice.voiceURI);
      else setSelectedVoiceURI(ptBRVoices[0].voiceURI);

    } else if (availableVoices.length > 0) {
       const defaultVoice = availableVoices.find(v => v.default);
       if (defaultVoice) setSelectedVoiceURI(defaultVoice.voiceURI);
       else setSelectedVoiceURI(availableVoices[0].voiceURI);
    }
  }, [isSupportedTTS]);

  useEffect(() => {
    if (audioUrl) return; 

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupportedTTS(true);
      // Voices might not be loaded immediately.
      const voiceTimeout = setTimeout(populateVoiceList, 100); // Give it a moment
      
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = populateVoiceList;
      }
      
      return () => {
        clearTimeout(voiceTimeout);
        if (window.speechSynthesis) {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
          }
          window.speechSynthesis.onvoiceschanged = null;
           if (utterance) {
            utterance.onstart = null;
            utterance.onend = null;
            utterance.onerror = null;
          }
        }
        setIsSpeaking(false);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl, populateVoiceList]); // Added populateVoiceList to dependencies, utterance removed


  const extractTextFromCorpo = useCallback(() => {
    let textToSpeak = title ? `${title}. ` : '';
    corpo.forEach(elemento => {
      switch (elemento.tipo) {
        case 'paragrafo':
        case 'sub_cabecalho':
          textToSpeak += `${elemento.texto}. `;
          break;
        case 'citacao':
          textToSpeak += `Citação: ${elemento.texto}. ${elemento.autor_citado ? 'Fim da citação, por ' + elemento.autor_citado : 'Fim da citação'}. `;
          break;
        case 'dialogo':
          textToSpeak += `${elemento.personagem} disse: ${elemento.fala}. `;
          break;
        case 'lista_nao_ordenada':
        case 'lista_ordenada':
          textToSpeak += `Lista: `;
          elemento.itens.forEach(item => {
            textToSpeak += `${item.texto}. `;
          });
          textToSpeak += `Fim da lista. `;
          break;
        default:
          break;
      }
    });
    return textToSpeak;
  }, [corpo, title]);

  const handleToggleSpeech = () => {
    if (!isSupportedTTS || !window.speechSynthesis) return;

    if (isSpeaking && utterance) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToSpeak = extractTextFromCorpo();
      if (textToSpeak.trim() === '') return;

      const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
      if (selectedVoiceURI) {
        const voice = window.speechSynthesis.getVoices().find(v => v.voiceURI === selectedVoiceURI);
        if (voice) {
          newUtterance.voice = voice;
          newUtterance.lang = voice.lang; // Set lang from the selected voice
        } else {
            newUtterance.lang = 'pt-BR'; // Fallback lang
        }
      } else {
        newUtterance.lang = 'pt-BR'; // Fallback lang if no voice is selected
      }
      
      newUtterance.rate = speechRate;
      newUtterance.pitch = speechPitch;
      newUtterance.volume = 1;

      newUtterance.onstart = () => setIsSpeaking(true);
      newUtterance.onend = () => setIsSpeaking(false);
      newUtterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        setIsSpeaking(false);
      };

      setUtterance(newUtterance);
      window.speechSynthesis.speak(newUtterance);
    }
  };

  if (audioUrl) {
    return (
      <div className="my-4 space-y-3">
        <h3 className="text-md font-semibold text-primary flex items-center font-serif">
          <Volume2 className="mr-2 h-5 w-5" />
          Ouça o Artigo Gravado
        </h3>
        <audio controls src={audioUrl} className="w-full rounded-md shadow-sm">
          Seu navegador não suporta o elemento de áudio.
        </audio>
      </div>
    );
  }

  if (!isSupportedTTS) {
    return <p className="text-sm text-muted-foreground font-sans my-4">Leitura de áudio não suportada neste navegador.</p>;
  }

  return (
    <div className="my-4 space-y-3">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handleToggleSpeech}
          className="flex items-center gap-2 font-sans text-primary hover:text-accent-foreground hover:bg-accent group"
          aria-label={isSpeaking ? "Parar leitura do artigo" : "Ouvir o artigo (Voz do Navegador)"}
          disabled={voices.length === 0 && !selectedVoiceURI && !isSpeaking}
        >
          {isSpeaking ? (
            <>
              <StopCircle className="mr-2 h-5 w-5" />
              Parar Leitura
            </>
          ) : (
            <>
              <Volume2 className="mr-2 h-5 w-5" />
              Ouvir (Voz Navegador)
            </>
          )}
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Configurações de Áudio" disabled={isSpeaking}>
              <Settings className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 space-y-4 font-sans">
            <div className="space-y-2">
              <Label htmlFor="voice-select" className="text-sm">Voz (pt-BR Disponíveis):</Label>
              {voices.length > 0 ? (
                <Select
                  value={selectedVoiceURI}
                  onValueChange={setSelectedVoiceURI}
                  disabled={isSpeaking}
                >
                  <SelectTrigger id="voice-select" className="h-9">
                    <SelectValue placeholder="Selecione uma voz" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map(voice => (
                      <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-xs text-muted-foreground">Nenhuma voz pt-BR encontrada ou carregando...</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate-slider" className="text-sm">Velocidade: {speechRate.toFixed(1)}x</Label>
              <Slider
                id="rate-slider"
                min={0.5}
                max={2}
                step={0.1}
                defaultValue={[speechRate]}
                onValueChange={(value) => setSpeechRate(value[0])}
                disabled={isSpeaking}
                className="[&>span:first-child]:h-1 [&>span:first-child_span]:bg-primary [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pitch-slider" className="text-sm">Tom: {speechPitch.toFixed(1)}</Label>
              <Slider
                id="pitch-slider"
                min={0}
                max={2}
                step={0.1}
                defaultValue={[speechPitch]}
                onValueChange={(value) => setSpeechPitch(value[0])}
                disabled={isSpeaking}
                className="[&>span:first-child]:h-1 [&>span:first-child_span]:bg-primary [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-primary"
              />
            </div>
             {isSpeaking && <p className="text-xs text-muted-foreground text-center">Ajustes aplicados na próxima reprodução.</p>}
          </PopoverContent>
        </Popover>
      </div>
       {voices.length === 0 && isSupportedTTS && !isSpeaking && (
         <p className="text-xs text-muted-foreground font-sans">Carregando vozes disponíveis...</p>
       )}
    </div>
  );
}
