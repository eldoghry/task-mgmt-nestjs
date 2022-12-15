import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from './../user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [ConfigModule, JwtModule.register({ secret: 'somejwtsecret', signOptions: { expiresIn: '60s' } }), UserModule],
  imports: [ConfigModule, JwtModule.register({}), UserModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
