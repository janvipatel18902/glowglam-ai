import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

export type GroqMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

@Injectable()
export class GroqService {
  private client: OpenAI;

  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is missing in environment variables');
    }

    this.client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  async chat(messages: GroqMessage[]): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',

        messages,

        // 🔥 improved tuning
        temperature: 0.5, // more natural responses
        max_tokens: 300,  // slightly longer answers
        top_p: 0.9,       // better diversity

        // optional improvements
        frequency_penalty: 0.2, // reduces repetition
        presence_penalty: 0.1,
      });

      const content = response.choices?.[0]?.message?.content?.trim();

      if (!content) {
        console.warn('Groq returned empty response:', response);
        return 'Sorry, I could not generate a response right now.';
      }

      return content;
    } catch (error: any) {
      console.error('Groq error:', error?.response?.data || error.message);

      // more user-friendly error fallback
      if (error?.response?.status === 401) {
        throw new InternalServerErrorException('Invalid Groq API key');
      }

      if (error?.response?.status === 429) {
        throw new InternalServerErrorException(
          'AI service is busy. Please try again in a moment.',
        );
      }

      throw new InternalServerErrorException(
        'AI service is currently unavailable. Please try again later.',
      );
    }
  }
}