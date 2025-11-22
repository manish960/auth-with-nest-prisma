import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'manish', description: 'this is user name' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    default: 'manishk@gmail.com',
    description: 'this is user email',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @ApiProperty({
    default: 'password',
    description: 'this is a password',
  })
  password: string;
}
