import { IsString, IsNotEmpty, IsOptional, IsIn, IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../tasks.entity';

export interface UpdateTaskInterface {
  title?: string;
  desc?: string;
  status?: TaskStatusEnum;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;
}

export class FilterTasksDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  // @IsIn([
  //   TaskStatusEnum.OPEN,
  //   TaskStatusEnum.COMPLETED,
  //   TaskStatusEnum.IN_PROGRESS,
  // ])
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}

export class UpdateTaskInfoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  desc: string;
}
