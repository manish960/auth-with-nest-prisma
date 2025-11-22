import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';


@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // remove in production if needed
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('🟢 Prisma connected to PostgreSQL');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔴 Prisma disconnected');
  }

  // Optional: helper for transactions
  async runTransaction(callback: (tx: PrismaClient) => Promise<any>) {
    return this.$transaction(async (tx:any) => {
      return callback(tx);
    });
  }
}
