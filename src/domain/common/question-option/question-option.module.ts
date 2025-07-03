import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionOptionRepository } from '@/domain/common/question-option/question-option.repository';
import { Module } from '@nestjs/common';
import { QuestionOption } from '@/entities/question-option.entity';
import { QuestionOptionAttachmentModule } from '@/domain/common/question-option-attachment/question-option-attachment.module';
import { QuestionOptionService } from '@/domain/common/question-option/question-option.service';
import { QuestionOptionProfile } from '@/domain/common/question-option/question-option.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionOption]),
    QuestionOptionAttachmentModule,
  ],
  providers: [
    QuestionOptionRepository,
    QuestionOptionService,
    QuestionOptionProfile,
  ],
  exports: [QuestionOptionRepository, QuestionOptionService],
})
export class QuestionOptionModule {}
