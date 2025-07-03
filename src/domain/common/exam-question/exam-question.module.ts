import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamQuestion } from '@/entities/exam-question.entity';
import { ExamQuestionProfile } from '@/domain/common/exam-question/exam-question.profile';
import { ExamQuestionRepository } from '@/domain/common/exam-question/exam-question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExamQuestion])],
  providers: [ExamQuestionProfile, ExamQuestionRepository],
  exports: [ExamQuestionRepository],
})
export class ExamQuestionModule {}
