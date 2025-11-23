import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
// import { UserRole } from './enum';
import { Role } from 'generated/prisma/enums';

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

  @IsOptional()
  @ApiProperty({
    enum: Role, // <-- dropdown options
    enumName: 'UserRole', // <-- optional but recommended
    default:Role.USER
  })
  @IsEnum(Role)
  role?: Role; // USER, ADMIN, DOCTOR, STAFF
}
