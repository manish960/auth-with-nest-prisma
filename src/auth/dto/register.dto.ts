import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'manish' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'manishk@gmail.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ default: 'password' })
  password: string;
}
