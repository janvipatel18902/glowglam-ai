import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SkinTestService } from './skin-test.service';

@Controller('skin-tests')
export class SkinTestController {
  constructor(private readonly skinTestService: SkinTestService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() body: { imageUrl: string },
    @Req() req: { user: { id: string } },
  ) {
    return this.skinTestService.create(req.user.id, body.imageUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findByUser(@Req() req: { user: { id: string } }) {
    return this.skinTestService.findByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.skinTestService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/analyze')
  analyze(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.skinTestService.analyze(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.skinTestService.remove(id, req.user.id);
  }
}