import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    const { password } = dto;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await this.hashPassword(password, salt);

    const user = {
      username: dto.username,
      hash: hashPassword,
      salt,
    };

    try {
      await this.userRepo.save(user);
    } catch (error) {
      if (error.code === '23505') throw new ConflictException('Username already exist');
      else throw new InternalServerErrorException();
    }
  }

  async hashPassword(plainPassword: string, salt: string): Promise<string> {
    return await bcrypt.hash(plainPassword, salt);
  }

  async validateUserPassword(password: string, storedHash: string, storedSalt: string): Promise<boolean> {
    const enteredPassword = await this.hashPassword(password, storedSalt);
    return enteredPassword === storedHash;
  }

  async signIn(dto: AuthCredentialsDto) {
    const { username, password } = dto;
    const user = await this.userRepo.findOneBy({ username });

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const isAuthenticated = await this.validateUserPassword(password, user.hash, user.salt);

    if (!isAuthenticated) throw new UnauthorizedException('Invalid Credentials');

    return user;
  }
}
