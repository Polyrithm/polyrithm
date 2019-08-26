import { Module, DynamicModule, Global } from '@nestjs/common';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService, UserService } from './services';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from './services/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthOptions } from './interfaces/auth-options.interface';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { type } from 'os';
import { AUTH_OPTIONS } from './auth-options.constant';


@Global()
@Module({})
export class AuthModule {

  static forRoot(options?: AuthOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt'
        }),
        TypeOrmModule.forFeature([ User, UserRepository ]),
        JwtModule.register({
          secret: options.secret,
          signOptions: {
            expiresIn: options.expiresIn
          }
        }),

      ],
      providers: [
        AuthService,
        UserService,
        JwtStrategy,
        {
          provide: APP_GUARD,
          useFactory: () => new AuthGuard(new Reflector()),
          inject: [ Reflector ]
        },
        {
          provide: AUTH_OPTIONS,
          useValue: options
        }
      ],
      controllers: [AuthController],
      exports: [JwtStrategy, PassportModule]
    };
  }
}
