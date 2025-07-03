import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {QuestionSubject} from "@/entities/question-subject.entity";
import {QuestionSubjectService} from "@/domain/common/question-subject/question-subject.service";
import {QuestionSubjectProfile} from "@/domain/common/question-subject/question-subject.profile";
import {QuestionSubjectRepository} from "@/domain/common/question-subject/question-subject.repository";
import {TreeRepository} from "typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([QuestionSubject])],
    providers: [QuestionSubjectService, QuestionSubjectProfile, QuestionSubjectRepository, TreeRepository],
    exports: [QuestionSubjectRepository, QuestionSubjectService],

})
export class QuestionSubjectModule {
}