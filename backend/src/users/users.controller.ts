import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(
    @Req()
    req: {
      user: { id: string; email: string; fullName: string | null };
    },
  ) {
    return {
      user: req.user,
    };
  }
}
