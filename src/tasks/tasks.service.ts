import { Injectable } from '@nestjs/common';
import { Task, TaskStatusEnum } from './tasks.entity';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import {
  CreateTaskDto,
  FilterTasksDto,
  UpdateTaskInfoDto,
  UpdateTaskStatusDto,
  UpdateTaskInterface,
} from './dto/tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(dto: CreateTaskDto): Task {
    const task = {
      id: uuid(),
      title: dto.title,
      desc: dto.desc,
      status: TaskStatusEnum.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getFilteredTasks(filter: FilterTasksDto | undefined): Task[] {
    if (filter.status) {
      return this.tasks.filter((task) => task.status === filter?.status);
    }

    if (filter?.search) {
      return this.tasks.filter(
        (task) =>
          task.title.includes(filter?.search) ||
          task.desc.includes(filter?.search),
      );
    }
  }

  getTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const idx = this.findTaskIdOrFail(id);
    return this.tasks[idx];
  }

  findTaskIdOrFail(id: string) {
    const idx = this.tasks.findIndex((task) => task.id === id);

    if (idx === -1) throw new NotFoundException(`No task with id (${id})`);

    return idx;
  }

  getTask() {}

  updateTask(id: string, updateDto: UpdateTaskInterface): Task {
    const idx = this.findTaskIdOrFail(id);
    let task = this.tasks[idx];

    Object.assign(task, updateDto);

    return task;
  }

  updateTaskInfo(id: string, dto: UpdateTaskInfoDto): Task {
    return this.updateTask(id, dto);
  }

  updateTaskStatus(id: string, dto: UpdateTaskStatusDto): Task {
    return this.updateTask(id, dto);
  }

  removeTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
}
