import OpenAI from 'openai';
import config from '../config/config';

// Creating openAi client
const openai = new OpenAI({
    apiKey: config.openaiApiKey,
  });

/**
 * Chat with AI using OpenAI's GPT models
 * @param prompt User's question
 * @param modelName Model to use (defaults to gpt-3.5-turbo)
 * @returns AI response
 */
export const chatWithAI = async (
    prompt: string, 
    modelName: string = 'gpt-3.5-turbo'
  ): Promise<string> => {
    try {
      const response = await openai.chat.completions.create({
        model: modelName,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for a portfolio website. Provide concise, helpful responses about web development, projects, and technologies. Avoid giving any personal opinions or making claims about specific individuals. Do not generate code unless explicitly asked.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });
  
      return response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error: any) {
      console.error('OpenAI API error:', error.message);
      throw new Error('Failed to get response from AI service');
    }
  };
  
  export default openai;
    