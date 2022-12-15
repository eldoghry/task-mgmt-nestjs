import { Task } from 'src/tasks/tasks.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, OneToMany } from 'typeorm';
import { UserRoleEnum } from './enums/user-role.enum';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  hash: string;

  @Column()
  salt: string;

  @Column({ enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
