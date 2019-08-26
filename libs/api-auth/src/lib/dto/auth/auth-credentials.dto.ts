import {IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiModelProperty()
  name?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email : string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[0-9]).*$/, { message: `The string must contain at least 1 numeric character` })
  @Matches( /(?=.[!@#\$%\^&]).*$/, { message: `The string must contain at least one special character`})
  password : string;
}
