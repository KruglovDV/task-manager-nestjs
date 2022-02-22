import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { User } from '../users/user.entity';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { Category } from '../categories/category.entity';

const defaultTaskState = 'idle';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getAllTasks(filters: Record<string, unknown>) {
    return this.tasksRepository.find({
      where: filters,
      relations: ['creator', 'executor', 'categories'],
    });
  }

  async createTask(createTaskDto: CreateTaskDto, creatorId: number) {
    const creator = await this.usersRepository.findOne({
      id: creatorId,
    });
    const executor = await this.usersRepository.findOne({
      id: createTaskDto.executorId,
    });

    const categories = await Promise.all(
      (createTaskDto.categories ?? [])
        .map((categoryId) => {
          return this.categoriesRepository.findOne({ id: categoryId });
        })
        .filter((category) => !_.isNil(category)),
    );

    const createdTask = await this.tasksRepository.save({
      state: defaultTaskState,
      ...createTaskDto,
      categories: categories as Category[],
      creator,
      executor,
    });

    return createdTask;
  }
}
