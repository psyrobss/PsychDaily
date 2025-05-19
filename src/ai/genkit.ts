
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { firebase } from "@genkit-ai/firebase";
import { Plugin } from 'genkit';

// Carrega as variáveis de ambiente do .env.local (especialmente para desenvolvimento)
// Em produção, essas variáveis devem ser configuradas diretamente no ambiente de hospedagem.
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


const googleAIPlugin = googleAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

const plugins: Plugin<any>[] = [googleAIPlugin];

if (process.env.NODE_ENV === 'production' && 
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_STORAGE_BUCKET &&
    process.env.FIREBASE_LOCATION) {
    plugins.push(firebase({
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        location: process.env.FIREBASE_LOCATION,
    }));
}


export const ai = genkit({
  plugins: plugins,
  model: 'googleai/gemini-2.0-flash', // Model padrão para geração de texto
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
