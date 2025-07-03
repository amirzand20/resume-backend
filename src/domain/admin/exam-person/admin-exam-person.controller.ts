import { OAuthJwtGuard } from '@/auth/guards/oauth-jwt-guard.guard';
import { Filter } from '@/common/decorators/filter.decorator';
import { PageLimit } from '@/common/decorators/limit.decorator';
import { Pagination } from '@/common/decorators/pagination.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { ApiQueryListResponse } from '@/common/decorators/swaager-api-response.decorator';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { CreateExamPersonDto } from '@/domain/common/exam-person/dto/create-exam-person.dto';
import {
  ExamPersonAnswersResultsInfoDto,
  ExamPersonAnswersInfoDto,
} from '@/domain/common/exam-person/dto/exam-person-answersInfo.dto';
import { ReadExamPersonCardDto } from '@/domain/common/exam-person/dto/read-exam-person-card.dto';
import { ReadExamPersonDto } from '@/domain/common/exam-person/dto/read-exam-person.dto';
import { RemainQuestionsOrderDto } from '@/domain/common/exam-person/dto/remain-questions-order-list.dto';
import { updateExamPersonDto } from '@/domain/common/exam-person/dto/update-exam-person.dto';
import { ExamPersonService } from '@/domain/common/exam-person/exam-person.service';
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
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckedExamDto } from '@/domain/common/exam/dto/checked-exam.dto';
import { UpdateDescriptiveExamDto } from '@/domain/common/exam-person/dto/updateDescriptiveExam.dto';
import { ReadAnswerSubmissionDto } from '@/domain/common/exam-answer-submission/dto/read-exam-answer-submission.dto';
import { ReadExamQuestionDto } from '@/domain/common/exam-question/dto/read-exam-question.dto';
import { ResultExamPersonDto } from '@/domain/common/exam-person/dto/result-exam-person.dto';

@ApiTags('admin-exam-person')
@Controller('admin/exam-person')
@UseGuards(OAuthJwtGuard)
@ApiBearerAuth('sso-auth')
export class AdminExamPersonController {
  constructor(private readonly service: ExamPersonService) {}

  @Get('/get/active-exam/:volunteerInfoId')
  @ApiQueryListResponse(ReadExamPersonDto)
  findByVolunteerInfo(
    @Param('volunteerInfoId') volunteerInfoId: number,
  ): Promise<QueryListResultDto<ReadExamPersonDto>> {
    return this.service.findByVolunteerInfo(volunteerInfoId);
  }

  @Get('/exam-card-generator/:examId')
  async ExamCardGenerator(
    @Param('examId') examId: string,
    @Query('organId') organId?: string,
    @Query('includeVolunteers') includeVolunteers?: string,
  ): Promise<any> {
    const data = await this.service.startGeneratingCards(
      +examId,
      includeVolunteers === 'true',
      organId ? +organId : null,
    );
    if (data) {
      return {
        statusCode: 200,
        message: 'عملیات ساخت کارت آزمون با موفقیت آغاز شد.',
      };
    } else {
      return {
        statusCode: 400,
        message: 'عملیات ساخت کارت آزمون ناموفق بود در زمان دیگری انجام شود.',
      };
    }
  }

  @Get('/get/person-in-exam/:examId')
  @ApiQueryListResponse(ReadExamPersonDto)
  getPersonsInExam(
    @Param('examId') examId: number,
    @Pagination() page: number,
    @PageLimit() pageLimit: number,
    @Sort() sort: SortParam,
    @Query('ended')
    ended?: boolean,
    @Query('validateRectify')
    validateRectify?: boolean,
  ): Promise<QueryListResultDto<ReadExamPersonDto>> {
    return this.service.getPersonsInExam(
      examId,
      { ended, validateRectify },
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

  @Post()
  @ApiResponse({ type: ReadExamPersonDto })
  async create(@Body() data: CreateExamPersonDto): Promise<ReadExamPersonDto> {
    return await this.service.create(data);
  }

  @Delete('/:id')
  @ApiResponse({ type: ReadExamPersonDto })
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }

  @Get('results-info/:id')
  @ApiResponse({
    type: ResultExamPersonDto,
  })
  async getResultsInfo(@Param('id') id: number): Promise<ResultExamPersonDto> {
    return this.service.getResultsInfo(id);
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

  @Get('remain-questions/:id')
  @ApiResponse({
    type: Array<RemainQuestionsOrderDto>,
  })
  async getRemainQuestions(
    @Param('id') id: number,
  ): Promise<RemainQuestionsOrderDto[]> {
    return this.service.getRemainQuestions(id);
  }

  // @Get('get/single-card')
  // @ApiQueryListResponse(ReadExamPersonCardDto)
  // async getSingleExamCardReport(
  //   @Query('examId') examId: number,
  //   @Query('volunteerInfoId') volunteerInfoId,
  // ): Promise<QueryListResultDto<ReadExamPersonCardDto>> {
  //   return this.service.getSingleExamCardReport(examId, volunteerInfoId);
  // }

  @Post('get/single-card')
  @ApiQueryListResponse(ReadExamPersonCardDto)
  async getSingleExamCardReport(
    @Body() data: any,
  ): Promise<QueryListResultDto<ReadExamPersonCardDto>> {
    return await this.service.getSingleExamCardReport(data);
  }
  @Get('get-person-in-exam/:examId')
  @ApiResponse({
    type: CheckedExamDto,
  })
  @ApiQuery({ name: 'firstName', required: false })
  @ApiQuery({ name: 'lastName', required: false })
  @ApiQuery({ name: 'nationalNo', required: false })
  async getPersonInExam(
    @Param('examId') examId: number,
    @Pagination() page,
    @PageLimit() pageLimit,
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('nationalNo') nationalNo: string,
    @Sort() sort: SortParam,
  ): Promise<any> {
    return await this.service.getPersonInExam(
      examId,
      firstName,
      lastName,
      nationalNo,
      sort,
      page,
      pageLimit,
    );
  }

  @Get('get/multiple-card/:examId')
  @ApiQueryListResponse(ReadExamPersonCardDto)
  getMultipleExamCardReport(
    @Param('examId') examId: number,
  ): Promise<QueryListResultDto<ReadExamPersonCardDto>> {
    return this.service.getMultipleExamCardReport(examId);
  }
}
