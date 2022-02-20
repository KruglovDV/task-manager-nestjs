import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as _ from 'lodash';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTasks(
    @Query('header') header: string,
    @Query('executor') executor: string,
    @Query('creator') creator: string,
  ) {
    const filters: Record<string, unknown> = {};
    if (executor && _.parseInt(executor)) {
      filters.executor = executor;
    }
    if (creator && _.parseInt(creator)) {
      filters.creator = creator;
    }
    if (header) {
      filters.header = header;
    }
    return this.tasksService.getAllTasks(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: { user: Omit<User, 'password'> },
  ) {
    return this.tasksService.createTask(createTaskDto, req.user.id);
  }
}
