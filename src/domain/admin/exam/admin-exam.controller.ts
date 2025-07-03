import {OAuthJwtGuard} from '@/auth/guards/oauth-jwt-guard.guard';
import {Filter} from '@/common/decorators/filter.decorator';
import {PageLimit} from '@/common/decorators/limit.decorator';
import {Pagination} from '@/common/decorators/pagination.decorator';
import {Sort} from '@/common/decorators/sort.decorator';
import {ApiQueryListResponse} from '@/common/decorators/swaager-api-response.decorator';
import {SortParam} from '@/common/dto/request-params/sort-param';
import {QueryListResultDto} from '@/common/dto/result/query-list-result.dto';
import {AnswerSubmissionService} from '@/domain/common/exam-answer-submission/exam-answer-submission.service';
import {AssignExamPersonDto} from '@/domain/common/exam-person/dto/assign-exam-person.dto';
import {ReadExamPersonDto} from '@/domain/common/exam-person/dto/read-exam-person.dto';
import {ExamPersonService} from '@/domain/common/exam-person/exam-person.service';
import {CreateExamQuestionDto} from '@/domain/common/exam-question/dto/create-exam-question.dto';
import {ReadExamQuestionDto} from '@/domain/common/exam-question/dto/read-exam-question.dto';
import {CheckedExamDto} from '@/domain/common/exam/dto/checked-exam.dto';
import {CreateExamDto} from '@/domain/common/exam/dto/create-exam.dto';
import {ReadExamDto} from '@/domain/common/exam/dto/read-exam.dto';
import {SelectExamQuestionDto} from '@/domain/common/exam/dto/select-exam-question.dto';
import {UpdateExamDto} from '@/domain/common/exam/dto/update-exam.dto';
import {ExamService} from '@/domain/common/exam/exam.service';
import {Exam} from '@/entities/exam.entity';
import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards,} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags,} from '@nestjs/swagger';
import {LoginDto} from '@/auth/dto/login.dto';
import {UpdateExamDifficultyDto} from '@/domain/common/exam/dto/update-exam-difficulty.dto';
import {CheckExamBodyDto} from "@/domain/common/exam/dto/check-exam-body.dto";

@ApiTags('admin-exam')
@Controller('admin/exam')
@UseGuards(OAuthJwtGuard)
@ApiBearerAuth('sso-auth')
export class AdminExamController {
    constructor(
        private readonly service: ExamService,
        private readonly examPersonService: ExamPersonService,
        private readonly answerSubmissionService: AnswerSubmissionService,
    ) {
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number): Promise<Exam> {
        return this.service.deleteById(id);
    }

    @Post()
    async create(@Body() data: CreateExamDto): Promise<ReadExamDto> {
        return this.service.create(data);
    }

    @Post('assignUser')
    async assignUser(
        @Body() data: AssignExamPersonDto,
    ): Promise<ReadExamPersonDto[]> {
        return this.service.assignUser(data);
    }

    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() data: UpdateExamDto,
    ): Promise<{ data: ReadExamDto }> {
        const res = await this.service.update(id, data);

        return {data: res};
    }

    @Put('/update-difficulty/:id')
    async updateDifficulty(
        @Param('id') id: number,
        @Body() data: UpdateExamDifficultyDto,
    ): Promise<{ data: ReadExamDto }> {
        const res = await this.service.updateDifficultyMeta(
            id,
            data.difficultyMeta ?? {},
        );

        return {data: res};
    }

    @Get('/get-all')
    @ApiQueryListResponse(ReadExamDto)
    getAll(
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam,
    ): Promise<QueryListResultDto<ReadExamDto>> {
        return this.service.getAll(filter, sort, page, pageLimit);
    }

    @Get('/get-all-exam')
    @ApiQueryListResponse(ReadExamDto)
    getAllExam(
        @Pagination() page,
        @PageLimit() pageLimit,
        @Sort() sort: SortParam,
    ): Promise<QueryListResultDto<ReadExamDto>> {
        return this.service.getAllExam(sort, page, pageLimit);
    }

    @Get('/get-all-exam-assign')
    @ApiQueryListResponse(ReadExamDto)
    getAllExamAssign(
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam,
    ): Promise<QueryListResultDto<ReadExamDto>> {
        return this.service.getAllExamAssign(filter, sort, page, pageLimit);
    }

    @Get('/get-public-exam')
    @ApiQueryListResponse(ReadExamDto)
    getPublicExam(
        @Pagination() page,
        @PageLimit() pageLimit,
        @Sort() sort: SortParam,
    ): Promise<QueryListResultDto<ReadExamDto>> {
        return this.service.getPublicExam(sort, page, pageLimit);
    }

    @Get(':id')
    @ApiResponse({
        type: ReadExamDto,
    })
    async getById(@Param('id') id: number): Promise<{ data: ReadExamDto }> {
        const data = await this.service.getById(id);
        return {data};
    }

    @Patch('checked/:id')
    @ApiResponse({
        type: CheckedExamDto,
    })
    async CheckedExam(@Param('id') id: number,@Body() data: CheckExamBodyDto): Promise<CheckedExamDto> {
        return this.service.checkedExam(id,data);
    }

    @Post('select-question')
    @ApiResponse({})
    async selectQuestion(@Body() data: SelectExamQuestionDto): Promise<boolean> {
        return this.service.setCacheExamQuestion(data);
    }

    @Get('get-selected-question/:examId')
    @ApiResponse({
        type: CheckedExamDto,
    })
    async getSelectedExamQuestion(
        @Param('examId') examId: number,
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam,
    ): Promise<any> {
        return await this.service.getCacheExamQuestion(
            examId,
            filter,
            sort,
            page,
            pageLimit,
        );
    }

    @Get('get-selected-series-question/:examId/:seriesId')
    @ApiResponse({
        type: CheckedExamDto,
    })
    async getSelectedSeriesExamQuestion(
        @Param('examId') examId: number,
        @Param('seriesId') seriesId: number,
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam,
    ): Promise<any> {
        return await this.service.getSelectedSeriesExamQuestion(
            examId,
            seriesId,
            filter,
            sort,
            page,
            pageLimit,
        );
    }

    @Put('/cancel-exam/:examId')
    async cancelExam(@Param('examId') examId: number): Promise<ReadExamDto> {
        return await this.service.cancelExam(examId);
    }

    @Delete('/delete-question/:examId/:questionId')
    @ApiResponse({})
    async deleteCacheExamQuestion(
        @Param('examId') examId: number,
        @Param('questionId') questionId: number,
    ): Promise<boolean> {
        return await this.service.deleteCacheExamQuestion(examId, questionId);
    }

    @Put('/resume-exam/:examId')
    async resumeExam(@Param('examId') examId: number): Promise<ReadExamDto> {
        return await this.service.resumeExam(examId);
    }

    @Put('/start-exam/:examId')
    async startExam(@Param('examId') examId: number): Promise<ReadExamDto> {
        return await this.service.startExam(examId);
    }

    @Put('/end-exam/:examId')
    async endExam(@Param('examId') examId: number): Promise<ReadExamDto> {
        return await this.service.endExam(examId);
    }

    @Put('/permitted-exam-cart/:examId')
    async permittedExamCart(
        @Param('examId') examId: number,
    ): Promise<ReadExamDto> {
        return await this.service.permittedExamCart(examId);
    }

    @Post('assign-series-question')
    async addQuestionList(
        @Body() data: CreateExamQuestionDto,
    ): Promise<ReadExamQuestionDto[]> {
        return this.service.addQuestionList(data);
    }

    @Post('reset')
    async questionReset(@Body() data: LoginDto) {
        return {data: this.service.questionReset(data)};
    }
}
