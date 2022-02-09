import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { User } from '../users/user.entity';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: Partial<User> }) {
    return req.user;
  }
}
