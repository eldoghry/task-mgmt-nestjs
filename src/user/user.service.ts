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
}
