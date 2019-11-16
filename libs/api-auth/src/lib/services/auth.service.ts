import { Injectable, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities';
import { AuthCredentialsDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ResetPasswordDto } from '../dto/auth/reset-password.request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  public async login(authCredentials: AuthCredentialsDto): Promise<{token: string}> {
    const email = await this.userRepository.validatePassword(authCredentials);
    if (!email) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = {email};
    const token = this.jwtService.sign(payload);
    return {token};
  }

  public async register(authCredentials: AuthCredentialsDto) {
    return this.userRepository.register(authCredentials);
  }

  public async resetPassword(request: ResetPasswordDto ) {
    return this.userRepository.resetPassword(request.email);
  }

  public async verifyEmail(){

  }

  public async resendVerification() {

  }


}
