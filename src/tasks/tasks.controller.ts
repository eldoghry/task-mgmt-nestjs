import { Controller, Post, Get, Delete, Patch, Query, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { TasksService } from './tasks.service';
import { CreateTaskDto, FilterTasksDto, UpdateTaskInfoDto, UpdateTaskStatusDto } from './dto/tasks.dto';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(dto);
  }

  @Get()
  async getTasks(@Query() filter: FilterTasksDto): Promise<Task[]> {
    if (Object.keys(filter).length) return await this.taskService.getFilteredTasks(filter);
    return await this.taskService.getTasks();
  }

  @Get('/:id')
  async getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.taskService.getTask(id);
  }

  @Patch('/:id')
  async updateTaskInfo(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskInfoDto): Promise<Task> {
    return await this.taskService.updateTaskInfo(id, dto);
  }

  @Patch('/:id/status')
  async updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskStatusDto): Promise<Task> {
    return await this.taskService.updateTaskStatus(id, dto);
  }

  @Delete('/:id')
  async removeTask(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.taskService.removeTask(id);
  }
}
