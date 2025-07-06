import { GoogleGenAI } from '@google/genai';

const model = 'gemini-2.5-pro';

export async function generateTravelPlan(prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config: {
      responseMimeType: 'application/json',
    },
    contents,
  });

  let finalText = '';
  for await (const chunk of response) {
    finalText += chunk.text;
  }

  return finalText;
}
