import { Controller, Post, Get, Delete, Patch, Query, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { TasksService } from './tasks.service';
import { CreateTaskDto, FilterTasksDto, UpdateTaskInfoDto, UpdateTaskStatusDto } from './dto/tasks.dto';
import { Task } from './tasks.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from './../user/user.entity';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() dto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return await this.taskService.createTask(dto, user);
  }

  @Get()
  async getTasks(@Query() filter: FilterTasksDto, @GetUser() user: User): Promise<Task[]> {
    // if (Object.keys(filter).length) return await this.taskService.getFilteredTasks(filter);
    return await this.taskService.getTasks(filter, user);
  }

  @Get('/:id')
  async getTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return await this.taskService.getTask(id, user);
  }

  @Patch('/:id')
  async updateTaskInfo(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskInfoDto, @GetUser() user: User): Promise<Task> {
    return await this.taskService.updateTaskInfo(id, dto, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskStatusDto, @GetUser() user: User): Promise<Task> {
    return await this.taskService.updateTaskStatus(id, dto, user);
  }

  @Delete('/:id')
  async removeTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<any> {
    return await this.taskService.removeTask(id, user);
  }
}
