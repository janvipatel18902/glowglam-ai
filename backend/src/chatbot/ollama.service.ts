import { Injectable, InternalServerErrorException } from '@nestjs/common';

type OllamaMessage = {
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

    private readonly model =
        process.env.OLLAMA_MODEL || 'llama3.2:3b';

    async chat(messages: OllamaMessage[]): Promise<string> {
        try {
            console.log('OLLAMA_BASE_URL =', this.baseUrl);
            console.log('OLLAMA_MODEL =', this.model);

            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.model,
                    messages,
                    stream: false,
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
                `Could not connect to Ollama at ${this.baseUrl}.`,
            );
        }
    }
}