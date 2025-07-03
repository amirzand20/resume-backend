import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-guard.guard';
import { ApiQueryListResponse } from '@/common/decorators/swaager-api-response.decorator';
import { Pagination } from '@/common/decorators/pagination.decorator';
import { PageLimit } from '@/common/decorators/limit.decorator';
import { Filter } from '@/common/decorators/filter.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { Exam } from '@/entities/exam.entity';
import { CurrentUser } from '@/common/decorators/get-user-by-id.decorator';
import { ExamService } from '@/domain/common/exam/exam.service';
import { CreateExamDto } from '@/domain/common/exam/dto/create-exam.dto';
import { ReadExamDto } from '@/domain/common/exam/dto/read-exam.dto';
import { UpdateExamDto } from '@/domain/common/exam/dto/update-exam.dto';
import { AnswerSubmissionService } from '@/domain/common/exam-answer-submission/exam-answer-submission.service';
import { AssignExamPersonDto } from '@/domain/common/exam-person/dto/assign-exam-person.dto';
import { CreateExamPersonDto } from '@/domain/common/exam-person/dto/create-exam-person.dto';
import { ReadExamPersonDto } from '@/domain/common/exam-person/dto/read-exam-person.dto';
import { ExamPersonService } from '@/domain/common/exam-person/exam-person.service';
import { ExamPersonActivityLogService } from '@/domain/common/exam-person-activity-log/exam-person-activity-log.service';

@ApiTags('exam')
@Controller('exam')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class WebExamController {
  constructor(
    private readonly service: ExamService,
    private readonly examPersonService: ExamPersonService,
    private readonly answerSubmissionService: AnswerSubmissionService,
    private readonly examPersonActivityLogService: ExamPersonActivityLogService,
  ) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<Exam> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateExamDto): Promise<ReadExamDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateExamDto,
  ): Promise<ReadExamDto> {
    return this.service.update(id, data);
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

  @Get('/get-public-exam')
  @ApiQueryListResponse(ReadExamDto)
  getPublicExam(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadExamDto>> {
    return this.service.getPublicExam(sort, page, pageLimit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/check-exam-time')
  async checkExamTime(@CurrentUser() user): Promise<any> {
    return this.service.checkExamTime(user);
  }

  @Post('/start-public-exam')
  @ApiResponse({ type: ReadExamPersonDto })
  async startPublicExam(
    @Body() data: CreateExamPersonDto,
  ): Promise<ReadExamPersonDto | null> {
    const res = await this.examPersonService.create(data);
    const log = await this.examPersonActivityLogService.loginLog({
      examId: data.examId,
      personnelId: data.personalId,
      volunteerInfoId: data.volunteerInfoId,
    });
    return res;
  }

  @Get(':id')
  @ApiResponse({
    type: ReadExamDto,
  })
  async getById(@Param('id') id: number): Promise<ReadExamDto> {
    return this.service.getById(id);
  }
}
