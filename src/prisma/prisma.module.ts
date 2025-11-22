import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // optional but recommended (so PrismaService is available everywhere)
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
