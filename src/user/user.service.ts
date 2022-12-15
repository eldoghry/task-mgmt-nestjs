import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // used by Auth Service
  async signup(dto: CreateUserDto): Promise<User> {
    return await this.repo.save(dto);
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.repo.findOneBy({ username });
  }

  async getUser(selector: any) {
    return await this.repo.findOneBy(selector);
  }

  async getUserById(id: number) {
    return this.getUser({ id });
  }

  async getAllUsers(): Promise<User[]> {
    return this.repo.find({
      order: {
        id: 'ASC',
      },
    });
  }
}
