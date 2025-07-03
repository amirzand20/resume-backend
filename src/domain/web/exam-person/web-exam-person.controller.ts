import { PageLimit } from '@/common/decorators/limit.decorator';
import { Pagination } from '@/common/decorators/pagination.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { ApiQueryListResponse } from '@/common/decorators/swaager-api-response.decorator';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExamPersonService } from '@/domain/common/exam-person/exam-person.service';
import { ReadExamPersonDto } from '@/domain/common/exam-person/dto/read-exam-person.dto';
import { updateExamPersonDto } from '@/domain/common/exam-person/dto/update-exam-person.dto';
import { ExamPersonAnswersInfoDto } from '@/domain/common/exam-person/dto/exam-person-answersInfo.dto';
import { RemainQuestionsOrderDto } from '@/domain/common/exam-person/dto/remain-questions-order-list.dto';
import { CreateExamPersonDto } from '@/domain/common/exam-person/dto/create-exam-person.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-guard.guard';
import { Filter } from '@/common/decorators/filter.decorator';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReadPublicExamQuestionDto } from '@/domain/common/exam-question/dto/read-public-exam-question.dto';
import { ExamQuestion } from '@/entities/exam-question.entity';
import { AnswerSubmission } from '@/entities/exam-answer-submission.entity';
import { ReadAnswerSubmissionDto } from '@/domain/common/exam-answer-submission/dto/read-exam-answer-submission.dto';
import { ReadPublicAnswerSubmissionDto } from '@/domain/common/exam-answer-submission/dto/read-public-exam-answer-submission.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
@ApiTags('exam-person')
@Controller('exam-person')
export class WebExamPersonController {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly service: ExamPersonService,
  ) {}

  @Get('/get/active-exam/:volunteerInfoId')
  @ApiQueryListResponse(ReadExamPersonDto)
  findByVolunteerInfo(
    @Param('volunteerInfoId') volunteerInfoId: number,
  ): Promise<QueryListResultDto<ReadExamPersonDto>> {
    return this.service.findByVolunteerInfo(volunteerInfoId);
  }

  @Get('/get/person-in-exam/:examId')
  @ApiQueryListResponse(ReadExamPersonDto)
  getPersonsInExam(
    @Param('examId') examId: number,
    @Pagination() page: number,
    @PageLimit() pageLimit: number,
    @Sort() sort: SortParam,
    @Query('ended') ended?: string,
  ): Promise<QueryListResultDto<ReadExamPersonDto>> {
    return this.service.getPersonsInExam(
      examId,
      { ended },
      sort,
      page,
      pageLimit,
    );
  }

  @Get('/:id')
  @ApiResponse({ type: ReadExamPersonDto })
  async getById(@Param('id') id: number): Promise<ReadExamPersonDto> {
    return await this.service.getById(id);
  }

  @Get()
  @ApiResponse({ type: ReadExamPersonDto })
  async getList(
    @Query('page') page: number = 0,
    @Query('pageLimit') pageLimit: number = 1,
  ): Promise<any> {
    return await this.service.getList(page, pageLimit);
  }

  @Put('/:id')
  @ApiResponse({ type: ReadExamPersonDto })
  async update(
    @Param('id') id: number,
    @Body() data: updateExamPersonDto,
  ): Promise<ReadExamPersonDto> {
    return await this.service.update(id, data);
  }

  @Get('questions-info/:id')
  @ApiResponse({
    type: ExamPersonAnswersInfoDto,
  })
  async getQuestionsInfoById(
    @Param('id') id: number,
  ): Promise<ExamPersonAnswersInfoDto> {
    return this.service.getQuestionInfoById(id);
  }

  @Get('get-question-by-order/:examPersonId/:order')
  @ApiResponse({
    type: Array<RemainQuestionsOrderDto>,
  })
  async getExamQuestionByOrder(
    @Param('examPersonId', {
      transform(value) {
        return +value;
      },
    })
    examPersonId: number,
    @Param('order', {
      transform(value) {
        return +value;
      },
    })
    order: number,
  ): Promise<{
    data: ReadPublicExamQuestionDto;
    answer: ReadPublicAnswerSubmissionDto;
  }> {
    const [q, a] = await this.service.getSingleQuestionByOrder(
      examPersonId,
      order,
    );
    return {
      data: this.mapper.map(q, ExamQuestion, ReadPublicExamQuestionDto),
      answer: this.mapper.map(
        a,
        AnswerSubmission,
        ReadPublicAnswerSubmissionDto,
      ),
    };
  }

  @Get('remain-questions/:id')
  @ApiResponse({
    type: Array<RemainQuestionsOrderDto>,
  })
  async getRemainQuestions(
    @Param('id') id: number,
  ): Promise<RemainQuestionsOrderDto[]> {
    return this.service.getRemainQuestions(id);
  }

  @Post()
  @ApiResponse({ type: ReadExamPersonDto })
  async create(@Body() data: CreateExamPersonDto): Promise<ReadExamPersonDto> {
    return await this.service.create(data);
  }

  @Put('/start-exam/:examPersonId')
  async startExam(
    @Param('examPersonId') examPersonId: number,
  ): Promise<ReadExamPersonDto> {
    return this.service.startExam(examPersonId);
  }

  @Put('/end-exam/:examPersonId')
  async endExam(
    @Param('examPersonId') examPersonId: number,
  ): Promise<ReadExamPersonDto> {
    return this.service.endExam(examPersonId);
  }

  @Delete('/:id')
  @ApiResponse({ type: ReadExamPersonDto })
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
