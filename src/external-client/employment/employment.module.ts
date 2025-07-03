import { HttpClientModule } from '@/http-client/http-client.module';
import { HttpClientService } from '@/http-client/http-client.service';
import { Module } from '@nestjs/common';
import { EmploymentController } from './employment.controller';
import { EmploymentService } from './employment.service';

@Module({
  imports: [HttpClientModule],
  controllers: [EmploymentController],
  providers: [EmploymentService, HttpClientService],
  exports: [EmploymentService],
})
export class EmploymentModule {}
