
'use server';
/**
 * @fileOverview Fluxo Genkit para gerar um insight psicológico diário.
 *
 * - gerarInsightDiario - Função que gera um insight psicológico curto.
 * - InsightDiarioOutput - O tipo de retorno para a função gerarInsightDiario.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Não há input específico para este fluxo, o prompt é fixo.
// O Zod schema para output
const InsightDiarioOutputSchema = z.object({
  insight: z.string().describe('Um insight psicológico curto, inspirador ou reflexivo para o dia.'),
});
export type InsightDiarioOutput = z.infer<typeof InsightDiarioOutputSchema>;

// Função exportada que chama o fluxo
export async function gerarInsightDiario(): Promise<InsightDiarioOutput> {
  return insightDiarioFlow({}); // Passa um objeto vazio como input, já que não é usado pelo prompt
}

const insightDiarioPrompt = ai.definePrompt({
  name: 'insightDiarioPrompt',
  // input: {}, // Sem schema de input explícito necessário para este prompt simples
  output: {schema: InsightDiarioOutputSchema},
  prompt: `Você é um(a) psicólogo(a) clínico(a) com mais de 10 anos de experiência, reconhecido(a) pela abordagem gentil e empática.  
Contexto: o usuário deseja, a cada dia, um breve estímulo de reflexão ou ação positiva, sem clichês.  
Gere apenas* um insight psicológico original em 1–2 frases, que leve ao autoconhecimento ou a uma pequena prática de bem-estar.  
Use linguagem acessível, calorosa e inspiradora, evite jargões e metáforas muito óbvias.  
Temas válidos: psicologia do cotidiano, bem-estar emocional, autoconhecimento, resiliência.

`,
  config: { // Configuração de segurança para este prompt específico
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE', // Permite conteúdo de baixo risco, mas bloqueia conteúdo perigoso mais óbvio
      },
    ],
  }
});

const insightDiarioFlow = ai.defineFlow(
  {
    name: 'insightDiarioFlow',
    // inputSchema: z.object({}), // Schema de input vazio
    outputSchema: InsightDiarioOutputSchema,
  },
  async () => { // Input não é usado aqui
    const {output} = await insightDiarioPrompt({}); // Chama o prompt sem input específico
    if (!output) {
      // Fallback caso o LLM não retorne nada ou haja um erro não capturado
      return { insight: "A jornada do autoconhecimento é contínua. Permita-se aprender algo novo sobre você hoje." };
    }
    return output;
  }
);
