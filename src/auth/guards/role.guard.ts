import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // in case no roles so it will open for all
    if (!roles) return true;

    // get user from request
    const req = context.switchToHttp().getRequest();
    const { user } = req;

    return roles.includes(user.role);
  }
}
