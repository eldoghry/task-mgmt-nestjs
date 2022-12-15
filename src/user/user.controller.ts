import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('auth/signup')
  async signUp(@Body() dto: AuthCredentialsDto): Promise<void> {
    return await this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('auth/signin')
  async signIn(@Body() dto: AuthCredentialsDto): Promise<any> {
    return await this.authService.signIn(dto);
  }
}
