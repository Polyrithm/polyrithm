import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Get, Param, ParamData, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './services';
import { AuthCredentialsDto } from './dto';
import { Public } from './decorators/public.decorator';
import { ResetPasswordDto } from './dto/auth/reset-password.request.dto';

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

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body(ValidationPipe) request: ResetPasswordDto) {
    return this.authService.resetPassword(request);
  }

  @Get('verify/:token')
  async verifyEmail(@Param() params: {token: string}) {

  }


  @Get('resend-verification/:email')

  async resendEmail(@Param() params: {email: string}) {

  }

  @Get('forgot-password/:email')
  async forgotPassword(@Param() params: {email: string}) {

  }

}
