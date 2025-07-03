import {Filter} from '@/common/decorators/filter.decorator';
import {PageLimit} from '@/common/decorators/limit.decorator';
import {Pagination} from '@/common/decorators/pagination.decorator';
import {Sort} from '@/common/decorators/sort.decorator';
import {ApiQueryListResponse} from '@/common/decorators/swaager-api-response.decorator';
import {SortParam} from '@/common/dto/request-params/sort-param';
import {QueryListResultDto} from '@/common/dto/result/query-list-result.dto';
import {AnswerSubmission} from '@/entities/exam-answer-submission.entity';
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards,} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AnswerSubmissionService} from '@/domain/common/exam-answer-submission/exam-answer-submission.service';
import {CreateAnswerSubmissionDto} from '@/domain/common/exam-answer-submission/dto/create-exam-answer-submission.dto';
import {ReadAnswerSubmissionDto} from '@/domain/common/exam-answer-submission/dto/read-exam-answer-submission.dto';
import {UpdateAnswerSubmissionDto} from '@/domain/common/exam-answer-submission/dto/update-exam-answer-submission.dto';
import {OAuthJwtGuard} from '@/auth/guards/oauth-jwt-guard.guard';
import {
    SubmitScoreAnswerSubmissionDto
} from '@/domain/common/exam-answer-submission/dto/submit-score-answer-submission.dto';
import {ReadExamPersonDto} from "@/domain/common/exam-person/dto/read-exam-person.dto";
import {UpdateDescriptiveExamDto} from "@/domain/common/exam-person/dto/updateDescriptiveExam.dto";

@ApiTags('admin-exam-answer-submission')
@Controller('admin/exam-answer-submission')
@UseGuards(OAuthJwtGuard)
@ApiBearerAuth('sso-auth')
export class AdminAnswerSubmissionController {
    constructor(private readonly service: AnswerSubmissionService) {
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number): Promise<AnswerSubmission> {
        return this.service.deleteById(id);
    }
    @Put('rectify-descriptive-exam')
    @ApiResponse({ type: ReadExamPersonDto })
    async rectifyDescriptiveExam(
        @Body() data: UpdateDescriptiveExamDto,
    ):Promise<any> {
        return await this.service.rectifyDescriptiveExam(data);
    }

    @Post()
    async create(
        @Body() data: CreateAnswerSubmissionDto,
    ): Promise<ReadAnswerSubmissionDto> {
        return this.service.create(data);
    }


    @Put('/:id')
    update(
        @Param('id') id: number,
        @Body() data: UpdateAnswerSubmissionDto,
    ): Promise<ReadAnswerSubmissionDto> {
        return this.service.update(id, data);
    }

    @Get('/get-all')
    @ApiQueryListResponse(ReadAnswerSubmissionDto)
    getAll(
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam,
    ): Promise<QueryListResultDto<ReadAnswerSubmissionDto>> {
        return this.service.getAll(filter, sort, page, pageLimit);
    }

    @Get(':id')
    @ApiResponse({
        type: ReadAnswerSubmissionDto,
    })
    async getById(@Param('id') id: number): Promise<ReadAnswerSubmissionDto> {
        return this.service.getById(id);
    }

    @Get('/get-all/:examPersonId')
    @ApiQueryListResponse(ReadAnswerSubmissionDto)
    getAllByExamPerssonId(
        @Param('examPersonId', {
            transform(value) {
                return +value;
            },
        })
            examPersonId: number,
        @Query('examQuestionType', {
            transform(value) {
                return +value;
            },
        })
            examQuestionType?: number,
    ): Promise<QueryListResultDto<ReadAnswerSubmissionDto>> {
        return this.service.getAllByExamPersonId(examPersonId, examQuestionType);
    }

    // @Put('/update-score/:id')
    // updateScore(
    //     @Param('id') id: number,
    //     @Body() data: SubmitScoreAnswerSubmissionDto,
    // ): Promise<ReadAnswerSubmissionDto> {
    //     return this.service.updateScore(id, data);
    // }
}
