import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/CreateTaskDto';

const defaultTaskState = 'idle';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(filters: Record<string, unknown>) {
    return this.tasksRepository.find({
      where: filters,
      relations: ['creator', 'executor'],
    });
  }

  async createTask(createTaskDto: CreateTaskDto, creatorId: number) {
    const creator = await this.usersRepository.findOne({
      id: creatorId,
    });
    const executor = await this.usersRepository.findOne({
      id: createTaskDto.executorId,
    });

    const createdTask = await this.tasksRepository.save({
      state: defaultTaskState,
      ...createTaskDto,
      creator,
      executor,
    });

    return createdTask;
  }
}
