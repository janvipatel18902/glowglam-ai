import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

export type GroqMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

@Injectable()
export class GroqService {
  private client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  async chat(messages: GroqMessage[]): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
        messages,
        temperature: 0.3,
        max_tokens: 200,
      });

      return (
        response.choices?.[0]?.message?.content?.trim() ||
        'Sorry, I could not generate a response right now.'
      );
    } catch (error) {
      console.error('Groq error:', error);
      throw new InternalServerErrorException('Groq request failed');
    }
  }
}
