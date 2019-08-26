import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {UserLike} from "../interfaces";
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
@Unique( [ 'email' ] )
export class User extends BaseEntity implements UserLike {

  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column({nullable: true})
  name: string;


  @ApiModelProperty()
  @Column({default: ''})
  avatar: string;

  @ApiModelProperty()
  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<Boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
