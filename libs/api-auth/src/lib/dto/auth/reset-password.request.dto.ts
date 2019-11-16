import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

export class ResetPasswordDto {

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[0-9]).*$/, { message: `The string must contain at least 1 numeric character` })
  @Matches(/(?=.[!@#\$%\^&]).*$/, { message: `The string must contain at least one special character` })
  readonly newPassword: string;
  readonly newPasswordToken: string;
  readonly currentPassword: string;

}
