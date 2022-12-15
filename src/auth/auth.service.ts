import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userRepo: UserService) {}

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
      await this.userRepo.signup(user);
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

    const user = await this.userRepo.getUserByUsername(username);

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const isAuthenticated = await this.validateUserPassword(password, user.hash, user.salt);

    if (!isAuthenticated) throw new UnauthorizedException('Invalid Credentials');

    return user;
  }
}
