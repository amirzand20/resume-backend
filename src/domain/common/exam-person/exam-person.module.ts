import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ExamPerson} from '@/entities/exam-person.entity';
import {AnswerSubmissionModule} from '@/domain/common/exam-answer-submission/exam-answer-submission.module';
import {ExamQuestionModule} from '@/domain/common/exam-question/exam-question.module';
import {ExamPersonService} from '@/domain/common/exam-person/exam-person.service';
import {ExamPersonProfile} from '@/domain/common/exam-person/exam-person.profile';
import {ExamPersonRepository} from '@/domain/common/exam-person/exam-person.repository';
import {ExamPersonProcessor} from './exam-person.processor';
import {BullModule} from '@nestjs/bullmq';
import {PersonalRepository} from '../personal/personal.repository';
import {Personal} from '@/entities/personal.entity';
import {Exam} from "@/entities/exam.entity";
import {ExamRepository} from "@/domain/common/exam/exam.repository";

@Module({
    imports: [
        // PersonalModule,
        BullModule.registerQueue({
            name: 'cardProcessor',
        }),
        TypeOrmModule.forFeature([ExamPerson, Personal, Exam]),
        forwardRef(() => AnswerSubmissionModule),
        ExamQuestionModule,
    ],
    providers: [
        ExamPersonService,
        ExamPersonProfile,
        ExamPersonRepository,
        ExamPersonProcessor,
        PersonalRepository,
        ExamRepository
    ],
    exports: [ExamPersonService, ExamPersonRepository, ExamPersonProcessor],
})
export class ExamPersonModule {
}
