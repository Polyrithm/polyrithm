import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities';
import { AuthOptions } from '../interfaces/auth-options.interface';
import { AUTH_OPTIONS } from '../auth-options.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @Inject(AUTH_OPTIONS) authOptions: AuthOptions

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authOptions.secret
    })
  }

  validate(payload: JwtPayload): Promise<User> {
    const {email} = payload;
    const user = this.userRepository.findOne({email});
    if (!user) {
      throw new UnauthorizedException();
    }
    else{
      return user;
    }
  }
}
