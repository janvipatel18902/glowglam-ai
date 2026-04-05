import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GroqMessage, GroqService } from './groq.service';

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
  private static readonly MAX_HISTORY_MESSAGES = 6;
  private static readonly MAX_MESSAGE_LENGTH = 250;

  constructor(
    private readonly prisma: PrismaService,
    private readonly groqService: GroqService,
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

    const aiReply = await this.groqService.chat([
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
        content: aiReply || 'Sorry, I could not generate a response right now.',
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

    const fullResponse = await this.groqService.chat([
      this.buildSystemPrompt(skinContext),
      ...historyForModel,
      {
        role: 'user',
        content: normalizedUserMessage,
      },
    ]);

    if (fullResponse) {
      onChunk(fullResponse);
    }

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

  private async getLatestSkinContext(
    userId: string,
  ): Promise<SkinContext | null> {
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
        ? (result.skincare?.concerns ?? [])
        : [],
      recommendations: latestSkinTest.recommendations.map((item) => ({
        title: item.title,
        description: item.description,
      })),
    };
  }

  private buildSystemPrompt(skinContext: SkinContext | null): GroqMessage {
    const skinContextBlock = skinContext
      ? `
User skin profile:
- Skin type: ${skinContext.skinType ?? 'unknown'}
- Sensitivity: ${skinContext.sensitivity ?? 'unknown'}
- Concerns: ${skinContext.concerns.length > 0
        ? skinContext.concerns.join(', ')
        : 'none'
      }
- Summary: ${skinContext.summary ?? 'not available'}
- Recommended focus: ${skinContext.recommendations.length > 0
        ? skinContext.recommendations.map((item) => item.title).join(', ')
        : 'none'
      }

Use this context naturally when relevant.
`
      : `
No skin test available yet.
If helpful, suggest taking a skin test for personalization.
`;

    return {
      role: 'system',
      content: `
You are GlowGlam AI, a friendly and knowledgeable skincare assistant.

${skinContextBlock}

Guidelines:
- Speak in a warm, natural, conversational tone
- Do NOT use numbered lists unless explicitly asked
- Keep responses under 80 words
- Be helpful but not overly technical
- Give 1 or 2 practical suggestions naturally in the sentence
- Add a small tip or caution if relevant
- Personalize using skin context when possible
- Avoid repeating yourself
- Do not diagnose medical conditions
- Do not claim certainty from the skin test
- Suggest patch testing for strong actives when relevant
- Suggest dermatologist help only for serious issues like severe irritation, pain, infection, or swelling

Style examples:
- "You can use vitamin C in the morning since it helps protect your skin from damage."
- "Since your skin is oily, a lightweight moisturizer would work better."
- "If your skin feels sensitive, start slowly and patch test first."

Avoid robotic responses like:
- "1. Answer 2. Step 3. Tip"

Focus hints (use only if relevant):
- acne: salicylic acid, niacinamide, gentle cleanser, moisturizer, sunscreen
- dull skin: vitamin C, hydration, sunscreen
- dry skin: hyaluronic acid, ceramides, moisturizer
- oily skin: lightweight non-comedogenic products
- sensitive skin: gentle fragrance-free routine
- retinol: night use, start slowly, moisturize, sunscreen the next day

End naturally. If useful, ask one short follow-up question.

Keep it simple, practical, and human-like.
      `.trim(),
    };
  }

  private async updateTitleIfNeeded(
    sessionId: string,
    currentTitle: string | null,
    userMessage: string,
  ) {
    if (currentTitle && currentTitle !== 'New Chat') {
      return;
    }

    const nextTitle =
      userMessage.length > 40 ? `${userMessage.slice(0, 40)}...` : userMessage;

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