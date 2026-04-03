import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
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
}