import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return await this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('signin')
  async signIn(@Body() dto: AuthCredentialsDto): Promise<any> {
    return await this.authService.signIn(dto);
  }
}
