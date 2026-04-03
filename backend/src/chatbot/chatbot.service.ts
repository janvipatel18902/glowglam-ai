import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OllamaMessage, OllamaService } from './ollama.service';

type ChatRole = 'user' | 'assistant';

type SkinContext = {
  summary: string | null;
  skinType: string | null;
  sensitivity: string | null;
  concerns: string[];
  recommendations: { title: string; description: string }[];
};

@Injectable()
export class ChatbotService {
  private static readonly MAX_HISTORY_MESSAGES = 2;
  private static readonly MAX_MESSAGE_LENGTH = 250;

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
    const session = await this.ensureSessionAccess(sessionId, userId);
    const trimmedContent = this.validateMessage(content);

    const normalizedUserMessage = this.normalizeMessage(trimmedContent);

    const userMessage = await this.prisma.chatMessage.create({
      data: {
        chatSessionId: session.id,
        role: 'user',
        content: trimmedContent,
      },
    });

    const historyForModel = await this.getHistoryForModel(session.id);
    const skinContext = await this.getLatestSkinContext(userId);

    const aiReply = await this.ollamaService.chat([
      this.buildSystemPrompt(skinContext),
      ...historyForModel,
      {
        role: 'user',
        content: normalizedUserMessage,
      },
    ]);

    const assistantMessage = await this.prisma.chatMessage.create({
      data: {
        chatSessionId: session.id,
        role: 'assistant',
        content: aiReply,
      },
    });

    await this.updateTitleIfNeeded(session.id, session.title, trimmedContent);

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

  async sendMessageStream(
    sessionId: string,
    userId: string,
    content: string,
    onChunk: (chunk: string) => void,
  ) {
    const session = await this.ensureSessionAccess(sessionId, userId);
    const trimmedContent = this.validateMessage(content);

    const normalizedUserMessage = this.normalizeMessage(trimmedContent);

    await this.prisma.chatMessage.create({
      data: {
        chatSessionId: session.id,
        role: 'user',
        content: trimmedContent,
      },
    });

    const historyForModel = await this.getHistoryForModel(session.id);
    const skinContext = await this.getLatestSkinContext(userId);

    const fullResponse = await this.ollamaService.chatStream(
      [
        this.buildSystemPrompt(skinContext),
        ...historyForModel,
        {
          role: 'user',
          content: normalizedUserMessage,
        },
      ],
      onChunk,
    );

    await this.prisma.chatMessage.create({
      data: {
        chatSessionId: session.id,
        role: 'assistant',
        content:
          fullResponse || 'Sorry, I could not generate a response right now.',
      },
    });

    await this.updateTitleIfNeeded(session.id, session.title, trimmedContent);

    return {
      sessionId: session.id,
    };
  }

  private async ensureSessionAccess(sessionId: string, userId: string) {
    const session = await this.prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('You cannot access this chat session');
    }

    return session;
  }

  private validateMessage(content: string) {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      throw new BadRequestException('Message content is required');
    }

    return trimmedContent;
  }

  private async getHistoryForModel(
    sessionId: string,
  ): Promise<
    {
      role: ChatRole;
      content: string;
    }[]
  > {
    const previousMessages = await this.prisma.chatMessage.findMany({
      where: {
        chatSessionId: sessionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: ChatbotService.MAX_HISTORY_MESSAGES,
    });

    return previousMessages.reverse().map((msg) => ({
      role: msg.role as ChatRole,
      content: this.normalizeMessage(msg.content),
    }));
  }

  private async getLatestSkinContext(userId: string): Promise<SkinContext | null> {
    const latestSkinTest = await this.prisma.skinTest.findFirst({
      where: {
        userId,
        status: 'completed',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        recommendations: true,
      },
    });

    if (!latestSkinTest) {
      return null;
    }

    const result = latestSkinTest.resultJson as
      | {
        skincare?: {
          skinType?: string;
          sensitivity?: string;
          concerns?: string[];
          confidence?: number;
        };
      }
      | null
      | undefined;

    return {
      summary: latestSkinTest.summary ?? null,
      skinType: result?.skincare?.skinType ?? null,
      sensitivity: result?.skincare?.sensitivity ?? null,
      concerns: Array.isArray(result?.skincare?.concerns)
        ? result!.skincare!.concerns!
        : [],
      recommendations: latestSkinTest.recommendations.map((item) => ({
        title: item.title,
        description: item.description,
      })),
    };
  }

  private buildSystemPrompt(skinContext: SkinContext | null): OllamaMessage {
    const skinContextBlock = skinContext
      ? `
User skin test context:
- summary: ${skinContext.summary ?? 'Not available'}
- skin type: ${skinContext.skinType ?? 'Not available'}
- sensitivity: ${skinContext.sensitivity ?? 'Not available'}
- concerns: ${skinContext.concerns.length > 0
        ? skinContext.concerns.join(', ')
        : 'Not available'
      }
- recommended focus: ${skinContext.recommendations.length > 0
        ? skinContext.recommendations.map((item) => item.title).join(', ')
        : 'Not available'
      }

Use this skin test context when relevant.
`
      : `
No completed skin test is available yet.
If useful, encourage the user to take a skin test for more personalized advice.
`;

    return {
      role: 'system',
      content: `
You are GlowGlam AI, a skincare assistant.

${skinContextBlock}

Rules:
- Be short, clear, and practical
- Personalize the answer using the user's skin test when relevant
- Do not repeat yourself
- Do not diagnose medical conditions
- Do not claim certainty from the skin test
- Suggest patch testing for strong actives
- If severe irritation, pain, infection, or swelling is mentioned, suggest a dermatologist

Use these hints only when relevant:
- acne: salicylic acid, niacinamide, gentle cleanser, moisturizer, sunscreen
- dull skin: vitamin C, hydration, sunscreen
- dry skin: ceramides, hyaluronic acid, moisturizer
- oily skin: lightweight non-comedogenic products
- sensitive skin: gentle fragrance-free routine
- retinol: night use, start slowly, moisturize, sunscreen next day

Response format:
1. Short answer
2. Simple next step
3. Important tip

Keep the response under 100 words.
      `.trim(),
    };
  }

  private async updateTitleIfNeeded(
    sessionId: string,
    currentTitle: string | null,
    userMessage: string,
  ) {
    if (currentTitle && currentTitle !== 'New Chat') return;

    const nextTitle =
      userMessage.length > 40
        ? `${userMessage.slice(0, 40)}...`
        : userMessage;

    await this.prisma.chatSession.update({
      where: { id: sessionId },
      data: {
        title: nextTitle,
      },
    });
  }

  private normalizeMessage(content: string) {
    const trimmed = content.trim().replace(/\s+/g, ' ');
    return trimmed.slice(0, ChatbotService.MAX_MESSAGE_LENGTH);
  }
}