import { Module } from '@nestjs/common';
import { BaseInfoModule } from '@/domain/common/base-info/base-info.module';
import { BaseInfoItemModule } from '@/domain/common/base-info-item/base-info-item.module';
import { ExamModule } from '@/domain/common/exam/exam.module';
import { AnswerSubmissionModule } from '@/domain/common/exam-answer-submission/exam-answer-submission.module';
import { ExamPersonModule } from '@/domain/common/exam-person/exam-person.module';
import { ExamQuestionModule } from '@/domain/common/exam-question/exam-question.module';
import { GeographicalPlaceModule } from '@/domain/common/geographical-place/geographical-place.module';
import { OrganModule } from '@/domain/common/organ/organ.module';
import { OrganOperationalModule } from '@/domain/common/organ-operational/organ-operational.module';
import { OrganPostModule } from '@/domain/common/organ-post/organ-post.module';
import { OrganPropertyModule } from '@/domain/common/organ-property/organ-propety.module';
import { QuestionModule } from '@/domain/common/question/question.module';
import { QuestionAttachmentModule } from '@/domain/common/question-attachment/question-attachment.module';
import { QuestionOptionAttachmentModule } from '@/domain/common/question-option-attachment/question-option-attachment.module';
import { QuestionSubjectModule } from '@/domain/common/question-subject/question-subject.module';
import { SystemProcessDocumentModule } from '@/domain/common/system-process-document/system-process-document.module';
import { VolunteerInfoModule } from '@/domain/common/volunteer-info/volunteer-info.module';
import { ReportsModule } from './reports/reports.module';
import { ExamPersonActivityLogModule } from './exam-person-activity-log/exam-person-activity-log.module';
import { FileManagerModule } from './file-manager/file-manager.module';

@Module({
  imports: [
    BaseInfoModule,
    BaseInfoItemModule,
    ExamModule,
    ExamPersonActivityLogModule,
    AnswerSubmissionModule,
    ExamPersonModule,
    ExamQuestionModule,
    GeographicalPlaceModule,
    OrganModule,
    OrganOperationalModule,
    OrganPostModule,
    OrganPropertyModule,
    QuestionModule,
    QuestionAttachmentModule,
    QuestionOptionAttachmentModule,
    QuestionSubjectModule,
    SystemProcessDocumentModule,
    VolunteerInfoModule,
    ReportsModule,
    FileManagerModule
  ],
  providers: [],
  exports: [],
})
export class CommonModule {}
