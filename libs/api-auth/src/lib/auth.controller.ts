import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './services';
import { AuthCredentialsDto } from './dto';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<any> {
    return this.authService.login(authCredentials);
  }

  @Post('register')

  async register(@Body(ValidationPipe) authCredentials: AuthCredentialsDto) {
    return this.authService.register(authCredentials);
  }
}
