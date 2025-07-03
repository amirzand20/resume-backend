import {AnswerSubmission} from '@/entities/exam-answer-submission.entity';
import {QuestionOption} from '@/entities/question-option.entity';
import {createMap, forMember, Mapper, mapWith} from '@automapper/core';
import {AutomapperProfile, InjectMapper} from '@automapper/nestjs';
import {Injectable} from '@nestjs/common';
import {CreateAnswerSubmissionDto} from './dto/create-exam-answer-submission.dto';
import {ReadAnswerSubmissionDto} from './dto/read-exam-answer-submission.dto';
import {UpdateAnswerSubmissionDto} from './dto/update-exam-answer-submission.dto';
import {ReadQuestionDto} from '../question/dto/read-question.dto';
import {SubmitScoreAnswerSubmissionDto} from './dto/submit-score-answer-submission.dto';
import {ExamQuestion} from '@/entities/exam-question.entity';
import {ExamPerson} from '@/entities/exam-person.entity';
import {ReadExamPersonDto} from '../exam-person/dto/read-exam-person.dto';
import {ReadPublicAnswerSubmissionDto} from './dto/read-public-exam-answer-submission.dto';
import {ReadPublicQuestionDto} from '../question/dto/read-public-question.dto';
import {ReadPublicQuestionOptionDto} from '../question-option/dto/read-public-question-option.dto';

@Injectable()
export class AnswerSubmissionProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, CreateAnswerSubmissionDto, AnswerSubmission);
            createMap(mapper, CreateAnswerSubmissionDto, AnswerSubmission);
            createMap(mapper, SubmitScoreAnswerSubmissionDto, AnswerSubmission);
            createMap(mapper, ReadAnswerSubmissionDto, AnswerSubmission);
            createMap(mapper, ReadPublicAnswerSubmissionDto, AnswerSubmission);
            createMap(mapper, UpdateAnswerSubmissionDto, AnswerSubmission);
            createMap(
                mapper,
                AnswerSubmission,
                ReadAnswerSubmissionDto,
                forMember(
                    (d) => d.question,
                    mapWith(ExamQuestion, ReadQuestionDto, (s) => s.question),
                ),
                forMember(
                    (d) => d.examPerson,
                    mapWith(ExamPerson, ReadExamPersonDto, (s) => s.examPerson),
                ),
            );
            createMap(
                mapper,
                AnswerSubmission,
                ReadPublicAnswerSubmissionDto,
                forMember(
                    (d) => d.question,
                    mapWith(ExamQuestion, ReadPublicQuestionDto, (s) => s.question),
                ),
                forMember(
                    (d) => d.questionOption,
                    mapWith(
                        QuestionOption,
                        ReadPublicQuestionOptionDto,
                        (s) => s.question,
                    ),
                ),
                forMember(
                    (d) => d.examPerson,
                    mapWith(ExamPerson, ReadExamPersonDto, (s) => s.examPerson),
                ),
            );
        };
    }
}
