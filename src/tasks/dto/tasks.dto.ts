import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsIn, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { TaskStatusEnum } from '../tasks.entity';
import { User } from './../../user/user.entity';

export interface UpdateTaskInterface {
  title?: string;
  desc?: string;
  status?: TaskStatusEnum;
}

class Test {
  id: number;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @ValidateNested()
  @Type(() => Test)
  test: Test;
}
export class TestDto {
  @IsNumber()
  id: number;
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
