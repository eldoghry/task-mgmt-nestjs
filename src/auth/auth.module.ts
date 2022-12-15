import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from './../user/user.module';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
