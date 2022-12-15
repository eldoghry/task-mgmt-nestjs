import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Task, TaskStatusEnum } from './tasks.entity';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto, FilterTasksDto, UpdateTaskInfoDto, UpdateTaskStatusDto, UpdateTaskInterface } from './dto/tasks.dto';
import { User } from './../user/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = await this.repo.save({
      title: dto.title,
      desc: dto.desc,
      user,
    });

    delete task.user;

    return task;
  }

  // getFilteredTasks(filter: FilterTasksDto | undefined): Promise<Task[]> {
  //   let { search, ...other } = filter;

  //   let selector: any = { ...other };

  //   if (search) {
  //     selector.title = Like(`%${search}%`);
  //   }

  //   return this.repo.findBy(selector);
  // }

  async getTasks(filter: FilterTasksDto, user: User): Promise<Task[]> {
    const { search, status, withDeleted } = filter;

    const query = this.repo.createQueryBuilder('tasks');

    if (user.role !== 'admin') query.where('tasks.userId= :userId', { userId: user.id });

    if (status) query.andWhere('tasks.status = :status', { status });

    if (search) {
      query.andWhere('tasks.title LIKE :search OR tasks.desc LIKE :search', { search: `%${search}%` });
    }

    if (user.role === 'admin' && Boolean(withDeleted)) query.withDeleted();

    // console.log(query.getSql());
    const result = await query.getMany();
    return result;
  }

  async getTask(id: number, user: User): Promise<Task> {
    const task = await this.repo.findOne({ where: { id }, relations: ['user'] });

    if (!task) throw new NotFoundException(`No task with id (${id})`);

    if (user.role !== 'admin' && (!task.user || task.user.id !== user.id)) throw new UnauthorizedException(`You are not allowed to access this task`);

    delete task.user;

    return task;
  }

  private async updateTask(id: number, updateDto: Partial<Task>, user: User): Promise<Task> {
    const task = await this.getTask(id, user);

    Object.assign(task, updateDto);

    return this.repo.save(task);
  }

  updateTaskInfo(id: number, dto: UpdateTaskInfoDto, user: User): Promise<Task> {
    return this.updateTask(id, dto, user);
  }

  updateTaskStatus(id: number, dto: UpdateTaskStatusDto, user: User): Promise<Task> {
    return this.updateTask(id, dto, user);
  }

  async removeTask(id: number, user: User): Promise<any> {
    const found = await this.getTask(id, user);
    // return this.repo.remove(found); // entity
    // return this.repo.delete(found); // affected: 1

    return this.repo.softDelete({ id });
  }
}
