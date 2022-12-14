import { Injectable } from '@nestjs/common';
import { Task, TaskStatusEnum } from './tasks.entity';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto, FilterTasksDto, UpdateTaskInfoDto, UpdateTaskStatusDto, UpdateTaskInterface } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = {
      title: dto.title,
      desc: dto.desc,
    };

    return await this.repo.save(task);
  }

  getFilteredTasks(filter: FilterTasksDto | undefined): Promise<Task[]> {
    let { search, ...other } = filter;

    let selector: any = { ...other };

    if (search) {
      selector.title = Like(`%${search}%`);
    }

    return this.repo.findBy(selector);
  }

  getTasks(): Promise<Task[]> {
    return this.repo.find();
  }

  // getTaskById(id: string): Task {
  //   const idx = this.findTaskIdOrFail(id);
  //   return this.tasks[idx];
  // }

  // findTaskIdOrFail(id: string) {
  //   const idx = this.tasks.findIndex((task) => task.id === id);

  //   if (idx === -1) throw new NotFoundException(`No task with id (${id})`);

  //   return idx;
  // }

  async getTask(id: number): Promise<Task> {
    const task = await this.repo.findOneBy({ id });

    if (!task) throw new NotFoundException(`No task with id (${id})`);

    return task;
  }

  private async updateTask(id: number, updateDto: Partial<Task>): Promise<Task> {
    const task = await this.getTask(id);

    Object.assign(task, updateDto);

    return this.repo.save(task);
  }

  updateTaskInfo(id: number, dto: UpdateTaskInfoDto): Promise<Task> {
    return this.updateTask(id, dto);
  }

  updateTaskStatus(id: number, dto: UpdateTaskStatusDto): Promise<Task> {
    return this.updateTask(id, dto);
  }

  async removeTask(id: number): Promise<any> {
    const found = await this.getTask(id);
    // return this.repo.remove(found); // entity
    // return this.repo.delete(found); // affected: 1

    return this.repo.softDelete({ id });
  }
}
