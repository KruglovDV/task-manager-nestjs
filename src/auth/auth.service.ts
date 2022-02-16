import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  login(user: Partial<User>) {
    const access_token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
    return { access_token };
  }
}
