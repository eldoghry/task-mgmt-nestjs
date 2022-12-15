import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './../user/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private userRepo: UserService, private jwt: JwtService, private readonly config: ConfigService) {}

  async hashPassword(plainPassword: string, salt: string): Promise<string> {
    return await bcrypt.hash(plainPassword, salt);
  }

  async validateUserPassword(password: string, storedHash: string, storedSalt: string): Promise<boolean> {
    const enteredPassword = await this.hashPassword(password, storedSalt);
    return enteredPassword === storedHash;
  }

  generateJwtToken(user: User) {
    const { hash, salt, ...payload } = user;
    const jwtOptions = { secret: this.config.get('JWT_SECRET'), expiresIn: this.config.get('JWT_EXPIRE_IN') };
    return this.jwt.sign({ ...payload }, jwtOptions);
  }

  async signUp(dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { password } = dto;

    const salt = await bcrypt.genSalt(+this.config.get('SALT_ROUNDS') || 10);
    const hashPassword = await this.hashPassword(password, salt);

    try {
      const user = await this.userRepo.signup({
        username: dto.username,
        hash: hashPassword,
        salt,
      });

      const accessToken = this.generateJwtToken(user);

      return { accessToken };
    } catch (error) {
      if (error.code === '23505') throw new ConflictException('Username already exist');
      else throw new InternalServerErrorException();
    }
  }

  async signIn(dto: AuthCredentialsDto) {
    const { username, password } = dto;

    const user = await this.userRepo.getUserByUsername(username);

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const isAuthenticated = await this.validateUserPassword(password, user.hash, user.salt);

    if (!isAuthenticated) throw new UnauthorizedException('Invalid Credentials');

    const accessToken = this.generateJwtToken(user);

    return { accessToken };
  }
}
