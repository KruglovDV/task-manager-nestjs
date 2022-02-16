import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { User } from '../users/user.entity';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: Partial<User> }) {
    return this.authService.login(req.user);
  }
}
