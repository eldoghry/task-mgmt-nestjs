import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn , DeleteDateColumn} from 'typeorm';

export enum TaskStatusEnum {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ enum: TaskStatusEnum, default: TaskStatusEnum.OPEN })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date
}
