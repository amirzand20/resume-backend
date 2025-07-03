import { Module } from '@nestjs/common';

import {
    IsSmallerThanTodayDateConstraint,
    IsValidNationalNoConstraint,
} from '@/common/validation';
import { ExternalClientModule } from '@/external-client/external-client.module';
import { CommonModule } from '../common/common.module';
import { ExamQuestionModule } from '../common/exam-question/exam-question.module';
import { QuestionAttachmentModule } from '../common/question-attachment/question-attachment.module';
import { QuestionOptionAttachmentModule } from '../common/question-option-attachment/question-option-attachment.module';
import { SystemBaseItemModule } from '../common/system-base-item/system-base-item.module';
import { SystemProcessDocumentModule } from '../common/system-process-document/system-process-document.module';
import { WebBaseInfoItemModule } from './base-info-item/web-base-info-item.module';
import { WebBaseInfoModule } from './base-info/web-base-info.module';
import { WebAnswerSubmissionModule } from './exam-answer-submission/web-exam-answer-submission.module';
import { WebExamPersonModule } from './exam-person/web-exam-person.module';
import { WebExamModule } from './exam/web-exam.module';
import { WebGeographicalPlaceModule } from './geographical-place/web-geographical-place.module';
import { WebOrganPropertyModule } from './organ-property/web-organ-propety.module';
import { WebOrganModule } from './organ/web-organ.module';
import { WebQuestionOptionModule } from './question-option/web-question-option.module';
import { WebQuestionSubjectModule } from './question-subject/web-question-subject.module';
import { WebQuestionModule } from './question/web-question.module';
import { WebVolunteerInfoModule } from './volunteer-info/web-volunteer-info.module';
import { WebFileManagerModule } from './file-manager/web-file-manager.module';
import { WebReportsModule } from './reports/web-reports.module';

@Module({
  imports: [
    ExternalClientModule,
    WebBaseInfoModule,
    WebBaseInfoItemModule,
    WebGeographicalPlaceModule,
    SystemProcessDocumentModule,
    SystemBaseItemModule,
    WebVolunteerInfoModule,
    WebQuestionModule,
    WebExamModule,
    WebQuestionOptionModule,
    WebOrganModule,
    WebOrganPropertyModule,
    WebAnswerSubmissionModule,
    WebQuestionSubjectModule,
    QuestionAttachmentModule,
    QuestionOptionAttachmentModule,
    ExamQuestionModule,
    WebExamPersonModule,
    CommonModule,
    WebReportsModule,
    WebFileManagerModule
  ],
  providers: [IsValidNationalNoConstraint, IsSmallerThanTodayDateConstraint],
  exports: [],
})
export class WebModule {}
