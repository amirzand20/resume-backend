import { Module } from '@nestjs/common';
import { AdminExamPersonController } from './admin-exam-person.controller';
import { ExamPersonModule } from '@/domain/common/exam-person/exam-person.module';

@Module({
  imports: [ExamPersonModule],
  controllers: [AdminExamPersonController],
})
export class AdminExamPersonModule {}
