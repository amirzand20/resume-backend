import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from '@/entities/exam.entity';
import { ExamPersonModule } from '@/domain/common/exam-person/exam-person.module';
import { AnswerSubmissionModule } from '@/domain/common/exam-answer-submission/exam-answer-submission.module';
import { VolunteerInfoModule } from '@/domain/common/volunteer-info/volunteer-info.module';
import { ExamQuestionModule } from '@/domain/common/exam-question/exam-question.module';
import { ExamRepository } from '@/domain/common/exam/exam.repository';
import { ExamService } from '@/domain/common/exam/exam.service';
import { ExamProfile } from '@/domain/common/exam/exam.profile';
import { ExamPersonService } from '@/domain/common/exam-person/exam-person.service';
import { AnswerSubmissionService } from '@/domain/common/exam-answer-submission/exam-answer-submission.service';
import { ExamPersonProcessor } from '../exam-person/exam-person.processor';
import { BullModule } from '@nestjs/bullmq';
import { QuestionModule } from '../question/question.module';
import { CacheManagerModule } from '@/bootstrap/cache-manager/cache-manager.module';
import { QuestionOptionModule } from '../question-option/question-option.module';
import {PersonalModule} from "@/domain/common/personal/personal.module";

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'cardProcessor',
    }),
    TypeOrmModule.forFeature([Exam]),
    ExamPersonModule,
    QuestionOptionModule,
    AnswerSubmissionModule,
    PersonalModule,
    VolunteerInfoModule,
    ExamQuestionModule,
    QuestionModule,
    CacheManagerModule,
  ],
  // controllers: [WebExamController],
  providers: [
    ExamRepository,
    ExamService,
    ExamProfile,
    ExamPersonService,
    AnswerSubmissionService,
  ],
  exports: [ExamRepository, ExamService],
})
export class ExamModule {}
