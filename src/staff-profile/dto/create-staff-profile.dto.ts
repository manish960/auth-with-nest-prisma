import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStaffProfileDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user associated with this employee profile',
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'Receptionist',
    required: false,
    description: 'Employee job position',
  })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({
    example: '+1555123456',
    required: false,
    description: 'Employee phone number',
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
