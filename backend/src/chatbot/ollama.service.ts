import { Injectable, InternalServerErrorException } from '@nestjs/common';

export type OllamaMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type OllamaChatResponse = {
  message?: {
    role: 'assistant';
    content: string;
  };
};

@Injectable()
export class OllamaService {
  private readonly baseUrl =
    process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';

  private readonly model = process.env.OLLAMA_MODEL || 'llama3.2:3b';

  private buildHeaders() {
    const apiKey = process.env.OLLAMA_API_KEY;

    return {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    };
  }

  async chat(messages: OllamaMessage[]): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: this.buildHeaders(),
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: false,
          keep_alive: '30m',
          options: {
            temperature: 0.3,
            num_predict: 80,
            top_k: 20,
            top_p: 0.8,
            num_ctx: 1024,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new InternalServerErrorException(
          `Ollama request failed: ${errorText}`,
        );
      }

      const data = (await response.json()) as OllamaChatResponse;

      return (
        data?.message?.content?.trim() ||
        'Sorry, I could not generate a response right now.'
      );
    } catch (error) {
      console.error('Ollama connection error:', error);
      throw new InternalServerErrorException(
        `Could not connect to Ollama at ${this.baseUrl}`,
      );
    }
  }

  async chatStream(
    messages: OllamaMessage[],
    onChunk: (chunk: string) => void,
  ): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: this.buildHeaders(),
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: true,
          keep_alive: '30m',
          options: {
            temperature: 0.3,
            num_predict: 80,
            top_k: 20,
            top_p: 0.8,
            num_ctx: 1024,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new InternalServerErrorException(
          `Ollama streaming request failed: ${errorText}`,
        );
      }

      if (!response.body) {
        throw new InternalServerErrorException(
          'Ollama returned no stream body',
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullResponse = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          try {
            const json = JSON.parse(trimmedLine) as {
              message?: { content?: string };
            };

            const chunk = json?.message?.content ?? '';
            if (chunk) {
              fullResponse += chunk;
              onChunk(chunk);
            }
          } catch {
            // ignore partial json lines
          }
        }
      }

      if (buffer.trim()) {
        try {
          const json = JSON.parse(buffer.trim()) as {
            message?: { content?: string };
          };
          const chunk = json?.message?.content ?? '';
          if (chunk) {
            fullResponse += chunk;
            onChunk(chunk);
          }
        } catch {
          // ignore trailing partial json
        }
      }

      return fullResponse.trim();
    } catch (error) {
      console.error('Ollama streaming connection error:', error);
      throw new InternalServerErrorException(
        `Could not connect to Ollama at ${this.baseUrl}`,
      );
    }
  }
}
