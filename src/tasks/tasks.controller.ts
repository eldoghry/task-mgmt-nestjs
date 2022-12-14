import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  FilterTasksDto,
  UpdateTaskInfoDto,
  UpdateTaskStatusDto,
} from './dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Get()
  getTasks(@Query() filter: FilterTasksDto) {
    if (Object.keys(filter).length)
      return this.taskService.getFilteredTasks(filter);
    return this.taskService.getTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Patch('/:id')
  updateTaskInfo(@Param('id') id: string, @Body() dto: UpdateTaskInfoDto) {
    return this.taskService.updateTaskInfo(id, dto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
    return this.taskService.updateTaskStatus(id, dto);
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string) {
    return this.taskService.removeTask(id);
  }
}
