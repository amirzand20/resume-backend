import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamPersonActivityLog } from '@/entities/exam-person-activity-log.entity';
import { ExamPersonActivityLogService } from './exam-person-activity-log.service';
import { ExamPersonActivityLogProfile } from './exam-person-activity-log.profile';
import { ExamPersonActivityLogRepository } from './exam-person-activity-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExamPersonActivityLog])],
  providers: [
    ExamPersonActivityLogService,
    ExamPersonActivityLogProfile,
    ExamPersonActivityLogRepository,
  ],
  exports: [ExamPersonActivityLogService, ExamPersonActivityLogRepository],
})
export class ExamPersonActivityLogModule {}
