import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatbotService } from './chatbot.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) { }

  @Post('sessions')
  createSession(@Req() req: { user: { id: string } }) {
    return this.chatbotService.createSession(req.user.id);
  }

  @Get('sessions')
  getSessions(@Req() req: { user: { id: string } }) {
    return this.chatbotService.getSessions(req.user.id);
  }

  @Get('sessions/:id')
  getSessionById(
    @Param('id') id: string,
    @Req() req: { user: { id: string } },
  ) {
    return this.chatbotService.getSessionById(id, req.user.id);
  }

  @Post('sessions/:id/messages')
  sendMessage(
    @Param('id') id: string,
    @Body() dto: CreateChatMessageDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.chatbotService.sendMessage(id, req.user.id, dto.content);
  }

  @Post('sessions/:id/messages/stream')
  async sendMessageStream(
    @Param('id') id: string,
    @Body() dto: CreateChatMessageDto,
    @Req() req: { user: { id: string } },
    @Res() res: Response,
  ) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    await this.chatbotService.sendMessageStream(
      id,
      req.user.id,
      dto.content,
      (chunk) => {
        res.write(chunk);
      },
    );

    res.end();
  }
}