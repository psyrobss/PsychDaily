'use server';
/**
 * @fileOverview Fluxo Genkit para gerar um insight psicológico diário.
 *
 * - gerarInsightDiario - Função que gera um insight psicológico curto.
 * - InsightDiarioOutput - O tipo de retorno para a função gerarInsightDiario.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// O Zod schema para output - Limpeza da descrição
const InsightDiarioOutputSchema = z.object({
  // Descrição concisa sobre o conteúdo esperado do campo.
  insight: z.string().describe('Um insight psicológico curto, inovador e estimulante, focado em TCC.'),
});
export type InsightDiarioOutput = z.infer<typeof InsightDiarioOutputSchema>;

// Função exportada que chama o fluxo
export async function gerarInsightDiario(): Promise<InsightDiarioOutput> {
  // A função interna não precisa receber input explícito se o prompt não usa variáveis
  return insightDiarioFlow({});
}

const insightDiarioPrompt = ai.definePrompt({
  name: 'insightDiarioPrompt',
  // input: {}, // Sem schema de input explícito necessário para este prompt simples
  output: {schema: InsightDiarioOutputSchema},
  // Este é o local correto para as instruções completas para o modelo
  prompt: `Como um psicólogo cognitivo experiente e empático, focado em TCC, crie um insight diário curto, inovador e estimulante. A cada nova solicitação, varie significativamente o tema ou a abordagem do insight. Cada insight deve oferecer uma perspectiva fresca baseada em princípios da TCC, inspirando reflexão ou uma pequena mudança positiva no comportamento. Evite frases genéricas e nunca repita um insight que já poderia ter sido gerado anteriormente. Crie um insight que soe único e pessoal a cada vez.

Diretrizes:

Explore diferentes temas como: psicologia cognitiva, TCC, psicologia do cotidiano, bem-estar emocional, autoconhecimento, resiliência, manejo de emoções, pensamentos distorcidos, crenças centrais, resolução de problemas, mindfulness aplicado à TCC, etc.`,
  config: {
    // Aumentar a temperatura para incentivar maior variação
    temperature: 1.5, // <-- Modificado


    // Configuração de segurança (mantida)
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
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
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
    // Chame o prompt e capture o resultado bruto
    const rawResult = await insightDiarioPrompt({});

    // *** ADICIONAR LOGGING AQUI ***
    console.log('--- Raw LLM Result ---');
    console.log(JSON.stringify(rawResult, null, 2)); // Loga o resultado bruto
    console.log('----------------------');

    // Verifique se o output esperado existe
    const output = rawResult.output; // Acessa o campo output do resultado bruto

    if (!output) {
      // Fallback caso o LLM não retorne nada ou haja um erro na formatação esperada
      console.error('LLM did not return expected output format. Falling back.'); // Adicionar log para debug
      // Você pode logar mais detalhes aqui se quiser, como rawResult.text(), rawResult.candidates, etc.
      return { insight: "A jornada do autoconhecimento é contínua. Permita-se aprender algo novo sobre você hoje." };
    }

    // Retorna o output formatado conforme o schema
    return output;
  }
);