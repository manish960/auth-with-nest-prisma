import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.user.create({
      email: dto.email,
      name: dto.name,
      password: hashed,
    });

    return this.signToken(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    // const user = await this.user.findByEmail(dto.email);
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });


    if (!user) throw new ForbiddenException('Invalid credentials');
    
    const match = await bcrypt.compare(dto.password, user.password);
    console.log(user,'iiiiiiiiiiiiiiiiiiii',match)
    if (!match) throw new ForbiddenException('Invalid credentials');

    return this.signToken(user.id, user.email, user.role);
  }

  signToken(id: number, email: string, role: string) {
    const payload = { id, email, role };

    const token = this.jwt.sign(payload, { expiresIn: '1h' });
    return { access_token: token };
  }
}
