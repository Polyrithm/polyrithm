import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { AuthCredentialsDto } from '../dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async register(authCredentials: AuthCredentialsDto) {
    return this.userRepository.register(authCredentials);
  }
}
