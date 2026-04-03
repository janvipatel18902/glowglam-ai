import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OllamaService } from './ollama.service';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ollamaService: OllamaService,
  ) { }

  async createSession(userId: string) {
    const session = await this.prisma.chatSession.create({
      data: {
        userId,
        title: 'New Chat',
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return {
      session: {
        id: session.id,
        title: session.title,
        updatedAt: session.updatedAt,
        messages: session.messages.map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          createdAt: message.createdAt,
        })),
      },
    };
  }

  async getSessions(userId: string) {
    const sessions = await this.prisma.chatSession.findMany({
      where: { userId },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return {
      sessions: sessions
        .filter((session) => session.messages.length > 0)
        .map((session) => ({
          id: session.id,
          title: session.title,
          updatedAt: session.updatedAt,
          preview:
            session.messages[session.messages.length - 1]?.content ?? null,
        })),
    };
  }

  async getSessionById(sessionId: string, userId: string) {
    const session = await this.prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('You cannot access this chat session');
    }

    return {
      session: {
        id: session.id,
        title: session.title,
        updatedAt: session.updatedAt,
        messages: session.messages.map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          createdAt: message.createdAt,
        })),
      },
    };
  }

  async sendMessage(sessionId: string, userId: string, content: string) {
    const session = await this.prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('You cannot access this chat session');
    }

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      throw new BadRequestException('Message content is required');
    }

    const userMessage = await this.prisma.chatMessage.create({
      data: {
        chatSessionId: session.id,
        role: 'user',
        content: trimmedContent,
      },
    });

    const previousMessages = await this.prisma.chatMessage.findMany({
      where: {
        chatSessionId: session.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 12,
    });

    const systemPrompt = `
You are GlowGlam AI, a helpful skincare assistant.

Rules:
- Answer in simple, friendly language.
- Give skincare guidance, not medical diagnosis.
- Suggest patch testing before trying new products.
- If symptoms sound serious, advise seeing a dermatologist.
- Keep replies practical, short, and personalized.
    `.trim();

    const aiReply = await this.ollamaService.chat([
      {
        role: 'system',
        content: systemPrompt,
      },
      ...previousMessages.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ]);

    const assistantMessage = await this.prisma.chatMessage.create({
      data: {
        chatSessionId: session.id,
        role: 'assistant',
        content: aiReply,
      },
    });

    if (session.title === 'New Chat') {
      const nextTitle =
        trimmedContent.length > 40
          ? `${trimmedContent.slice(0, 40)}...`
          : trimmedContent;

      await this.prisma.chatSession.update({
        where: { id: session.id },
        data: {
          title: nextTitle,
        },
      });
    }

    return {
      sessionId: session.id,
      messages: [
        {
          id: userMessage.id,
          role: userMessage.role,
          content: userMessage.content,
          createdAt: userMessage.createdAt,
        },
        {
          id: assistantMessage.id,
          role: assistantMessage.role,
          content: assistantMessage.content,
          createdAt: assistantMessage.createdAt,
        },
      ],
    };
  }
}