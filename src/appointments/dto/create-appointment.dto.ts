import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { AppointmentStatus } from '../enums/appointment-status.enum';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  doctorId: number;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  scheduledAt: string;

  @ApiPropertyOptional({ example: 'Regular checkup' })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiPropertyOptional({
    enum: AppointmentStatus,
    example: AppointmentStatus.PENDING,
  })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}
