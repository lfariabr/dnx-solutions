import { z } from 'zod';

// Chatbot input validation
export const chatbotInputSchema = z.string()
  .min(2, 'Question must be at least 2 characters')
  .max(500, 'Question cannot exceed 500 characters');

// Export types
export type ChatbotInput = z.infer<typeof chatbotInputSchema>;
