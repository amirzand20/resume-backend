import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuestionAttachment } from '@/entities/question-attachment.entity';
import { QuestionAttachmentProfile } from '@/domain/common/question-attachment/question-attachment.profile';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionAttachment])],
  providers: [QuestionAttachmentProfile],
  exports: [],
})
export class QuestionAttachmentModule {}
