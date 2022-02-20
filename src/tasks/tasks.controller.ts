import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
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
