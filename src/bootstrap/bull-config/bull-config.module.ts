import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { QueueOptions } from 'bullmq';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<QueueOptions> => ({
        defaultJobOptions: {
          attempts: 3,
          removeOnComplete: true,
          removeOnFail: true,
        },
        connection: {
          db: configService.get('REDIS_DB', 1),
          host: configService.get('REDIS_HOST', '192.168.70.3'),
          port: configService.get('REDIS_PORT', 6379),
          password: configService.get('REDIS_PASS', ''),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BullConfigModule {}
