import {
  IsSmallerThanTodayDateConstraint,
  IsValidNationalNoConstraint,
} from '@/common/validation';
import { AdminAnswerSubmissionModule } from '@/domain/admin/exam-answer-submission/admin-exam-answer-submission.module';
import { AdminExamPersonModule } from '@/domain/admin/exam-person/admin-exam-person.module';
import { AdminOrganPropertyModule } from '@/domain/admin/organ-property/admin-organ-propety.module';
import { AdminOrganModule } from '@/domain/admin/organ/admin-organ.module';
import { AdminPersonalModule } from '@/domain/admin/personal/admin-personal.module';
import { AdminQuestionSubjectModule } from '@/domain/admin/question-subject/admin-question-subject.module';
import { CommonModule } from '@/domain/common/common.module';
import { ExamQuestionModule } from '@/domain/common/exam-question/exam-question.module';
import { QuestionAttachmentModule } from '@/domain/common/question-attachment/question-attachment.module';
import { QuestionOptionAttachmentModule } from '@/domain/common/question-option-attachment/question-option-attachment.module';
import { SystemProcessDocumentModule } from '@/domain/common/system-process-document/system-process-document.module';
import { ExternalClientModule } from '@/external-client/external-client.module';
import { Module } from '@nestjs/common';
import { AdminBaseInfoItemModule } from './base-info-item/admin-base-info-item.module';
import { AdminBaseInfoModule } from './base-info/admin-base-info.module';
import { AdminExamModule } from './exam/admin-exam.module';
import { AdminQuestionOptionModule } from './question-option/admin-question-option.module';
import { AdminQuestionModule } from './question/admin-question.module';
import { AdminVolunteerInfoModule } from './volunteer-info/admin-volunteer-info.module';
import { AdminReportsModule } from './reports/admin-reports.module';
import { AdminFileManagerModule } from './file-manager/admin-file-manager.module';

@Module({
  imports: [
    ExternalClientModule,
    SystemProcessDocumentModule,
    AdminOrganModule,
    AdminOrganPropertyModule,
    AdminAnswerSubmissionModule,
    AdminQuestionSubjectModule,
    QuestionAttachmentModule,
    QuestionOptionAttachmentModule,
    ExamQuestionModule,
    AdminExamPersonModule,
    AdminPersonalModule,
    AdminBaseInfoModule,
    AdminBaseInfoItemModule,
    AdminExamModule,
    AdminQuestionModule,
    AdminQuestionOptionModule,
    AdminVolunteerInfoModule,
    CommonModule,
    AdminReportsModule,
    AdminFileManagerModule
  ],
  providers: [IsValidNationalNoConstraint, IsSmallerThanTodayDateConstraint],
  exports: [],
})
export class AdminModule {}
