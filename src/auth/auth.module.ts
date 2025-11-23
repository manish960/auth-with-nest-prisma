import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
     PassportModule.register({ defaultStrategy: 'jwt' }),
   forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'SECRET123',   // move to env in production
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService, JwtModule, PassportModule]
})
export class AuthModule {}
