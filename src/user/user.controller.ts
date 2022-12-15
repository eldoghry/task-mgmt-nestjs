import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, UseGuards, ParseIntPipe, Req } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

// @UseGuards(AuthGuard('jwtkey'))
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  async me(@GetUser('id') id: number): Promise<any> {
    return await this.userService.getUserById(id);
  }

  @Get('/:id')
  async getUsers(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.userService.getUserById(id);
  }
}
