import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    try {
      return await this.usersService.create(userDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
