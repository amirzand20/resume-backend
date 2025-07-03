import { Filter } from '@/common/decorators/filter.decorator';
import { PageLimit } from '@/common/decorators/limit.decorator';
import { Pagination } from '@/common/decorators/pagination.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { ApiQueryListResponse } from '@/common/decorators/swaager-api-response.decorator';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { Question } from '@/entities/question.entity';
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
import { QuestionService } from '@/domain/common/question/question.service';
import { CreateQuestionDto } from '@/domain/common/question/dto/create-question.dto';
import { ReadQuestionDto } from '@/domain/common/question/dto/read-question.dto';
import { UpdateQuestionDto } from '@/domain/common/question/dto/update-question.dto';
import { OAuthJwtGuard } from '@/auth/guards/oauth-jwt-guard.guard';
import { GetQuestionsFilterDto } from '@/domain/common/question/dto/get-questions-filter.dto';

@ApiTags('admin-question')
@Controller('admin/question')
@UseGuards(OAuthJwtGuard)
@ApiBearerAuth('sso-auth')
export class AdminQuestionController {
  constructor(private readonly service: QuestionService) {}

  @Get('descriptive-exam-question/:examPersonId')
  async descriptiveExamQuestion(
    @Param('examPersonId') examPersonId: number,
  ): Promise<ReadQuestionDto[]> {
    return await this.service.descriptiveExamQuestion(examPersonId);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<Question> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateQuestionDto): Promise<ReadQuestionDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateQuestionDto,
  ): Promise<ReadQuestionDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all/filter')
  @ApiQueryListResponse(ReadQuestionDto)
  @ApiQuery({ type: () => GetQuestionsFilterDto, name: 'filter' })
  getAllWithFilter(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Query() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadQuestionDto>> {
    return this.service.getAllWithFilter(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadQuestionDto,
  })
  async getById(@Param('id') id: number): Promise<any> {
    return this.service.getById(id);
  }
}
