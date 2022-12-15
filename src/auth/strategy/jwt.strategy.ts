import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtkey') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'somejwtsecret',
    });
  }

  async validate(payload) {
    const { username } = payload;

    const user = this.userService.getUserByUsername(username);

    if (!user) throw new UnauthorizedException();

    return payload;
  }
}
