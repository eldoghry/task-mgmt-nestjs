import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './../user/user.entity';

@Entity()
@Unique(['uuid'])
export class Wallet {
  @PrimaryColumn()
  uuid: number;

  @Column()
  amount: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
