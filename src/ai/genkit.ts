
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { GenkitPlugin } from 'genkit/plugin';

// Carrega as variáveis de ambiente do .env.local (especialmente para desenvolvimento)
// Em produção, essas variáveis devem ser configuradas diretamente no ambiente de hospedagem.
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


const googleAIPlugin = googleAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

const plugins: GenkitPlugin[] = [googleAIPlugin];



export const ai = genkit({
  plugins: plugins,
  model: 'googleai/gemini-2.5-flash-preview-05-20', // Model padrão para geração de texto
   // Configurações de segurança podem ser adicionadas aqui globalmente se necessário
  // config: {
  //   safetySettings: [
  //     {
  //       category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
  //       threshold: 'BLOCK_NONE',
  //     },
  //   ],
  // },
});
