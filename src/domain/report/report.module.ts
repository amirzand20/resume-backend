import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Step1Module } from '../step1/step1.module';
import { Step2Module } from '../step2/step2.module';
import { Step3Module } from '../step3/step3.module';
import { Step4Module } from '../step4/step4.module';
import { Step5Module } from '../step5/step5.module';
import { Step6Module } from '../step6/step6.module';
import { Step7Module } from '../step7/step7.module';

@Module({
  imports: [
    Step1Module,
    Step2Module,
    Step3Module,
    Step4Module,
    Step5Module,
    Step6Module,
    Step7Module,
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {} 