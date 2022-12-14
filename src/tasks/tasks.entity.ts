export enum TaskStatusEnum {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class Task {
  id: string;
  title: string;
  desc: string;
  status: TaskStatusEnum;
}
