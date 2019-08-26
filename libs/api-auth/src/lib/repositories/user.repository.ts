import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities';
import { AuthCredentialsDto } from '../dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository( User )

export class UserRepository extends Repository<User> {

  async register( authCredentials: AuthCredentialsDto ): Promise<void> {

    const { email, password } = authCredentials;
    const exists = await this.findOne( { email } );
    if (exists) {
      throw new ConflictException( `Email ${email} already exists`);
    }
    const user = new User();
    user.email = email;
    user.password = password;
    // generate unique salt per user
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(user.password, user.salt);
    await user.save();
  }

  public async validatePassword(authCredentials: AuthCredentialsDto): Promise<string> {
    const {email, password} = authCredentials;
    const user = await this.findOne({email});

    if(user && await user.validatePassword(password)) {
      return user.email;
    }
    else {
      return null;
    }
  }

  private async hashPassword(password: string, salt:string) {
    return bcrypt.hash(password, salt);
  }
}
