import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);
    try {
      const createdUser = await this.usersRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ username });
  }
}
