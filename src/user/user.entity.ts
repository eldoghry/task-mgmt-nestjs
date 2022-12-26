import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, OneToOne, JoinColumn } from 'typeorm';
import { Wallet } from './../wallet/wallet.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;
}
