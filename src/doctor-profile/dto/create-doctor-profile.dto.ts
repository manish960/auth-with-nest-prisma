import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsPhoneNumber,
  Min,
} from 'class-validator';

export class CreateDoctorProfileDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user associated with the doctor profile',
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'Cardiologist',
    required: false,
    description: 'Doctor specialization',
  })
  @IsString()
  @IsOptional()
  specialization?: string;

  @ApiProperty({
    example: 10,
    required: false,
    description: 'Years of professional experience',
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  experienceYears?: number;

  @ApiProperty({
    example: '+1555123456',
    required: false,
    description: 'Doctor mobile phone number',
  })
  @IsString()
  @IsOptional()
  phone?: string;
  // Optional: Enforce valid phone format
  // @IsPhoneNumber()

  @ApiProperty({
    example: 'Room A-12',
    required: false,
    description: 'Room number where the doctor practices',
  })
  @IsString()
  @IsOptional()
  roomNumber?: string;
}
