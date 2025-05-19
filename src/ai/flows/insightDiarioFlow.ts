
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
  prompt: `Você é um psicólogo experiente e gentil, especializado em fornecer palavras de sabedoria e reflexão.
Gere um insight psicológico curto (1-2 frases), positivo e inspirador para o dia.
O insight deve ser original e encorajar a introspecção ou uma pequena ação positiva.
Evite clichês e foque em uma linguagem acessível e empática.
Tema: Psicologia do cotidiano, bem-estar emocional, autoconhecimento ou resiliência.
Exemplo de tom: "Lembre-se que cada pequeno passo em direção ao autocuidado é uma grande vitória para sua mente."
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
