import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerSubmission } from '@/entities/exam-answer-submission.entity';
import { AnswerSubmissionRepository } from '@/domain/common/exam-answer-submission/exam-answer-submission.repository';
import { AnswerSubmissionService } from '@/domain/common/exam-answer-submission/exam-answer-submission.service';
import { AnswerSubmissionProfile } from '@/domain/common/exam-answer-submission/exam-answer-submission.profile';
import { ExamPersonnelSchedule } from '@/domain/common/exam-answer-submission/exam-personnel.schedule';
import { RedisManagerService } from '@/bootstrap/redis/redis-manager.service';
import { ExamPersonModule } from '@/domain/common/exam-person/exam-person.module';
import { QuestionOptionModule } from '../question-option/question-option.module';
import { QuestionOptionRepository } from '../question-option/question-option.repository';
import { QuestionOption } from '@/entities/question-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerSubmission, QuestionOption]),
    forwardRef(() => ExamPersonModule),
    QuestionOptionModule,
  ],
  providers: [
    AnswerSubmissionRepository,
    AnswerSubmissionService,
    AnswerSubmissionProfile,
    ExamPersonnelSchedule,
    RedisManagerService,
  ],
  exports: [AnswerSubmissionRepository, AnswerSubmissionService],
})
export class AnswerSubmissionModule {}
