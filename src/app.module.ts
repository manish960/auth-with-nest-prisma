import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { DoctorProfileModule } from './doctor-profile/doctor-profile.module';
import { StaffProfileModule } from './staff-profile/staff-profile.module';

@Module({
  imports: [UserModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, PatientModule, DoctorProfileModule, StaffProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
