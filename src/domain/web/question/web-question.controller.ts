import { JwtAuthGuard } from '@/auth/guards/jwt-guard.guard';
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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from '@/domain/common/question/question.service';
import { CreateQuestionDto } from '@/domain/common/question/dto/create-question.dto';
import { ReadQuestionDto } from '@/domain/common/question/dto/read-question.dto';
import { UpdateQuestionDto } from '@/domain/common/question/dto/update-question.dto';

@ApiTags('question')
@Controller('question')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class WebQuestionController {
  constructor(private readonly service: QuestionService) {}

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
  getAllWithFilter(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadQuestionDto>> {
    return this.service.getAllWithFilter(filter, sort, page, pageLimit);
  }

  // @Get('/get-by-exam-id/:examPersonId')
  // @ApiQueryListResponse(ReadQuestionDto)
  // getAllByExamId(
  //     @Pagination() page,
  //     @PageLimit() pageLimit,
  //     @Param('examPersonId') examPersonId: number,
  //     @Sort() sort: SortParam,
  // ): Promise<QueryListResultDto<ReadQuestionDto>> {
  //     return this.service.getAllByExamPersonId(examPersonId, sort, page, pageLimit);
  // }

  @Get(':id')
  @ApiResponse({
    type: ReadQuestionDto,
  })
  async getById(@Param('id') id: number): Promise<any> {
    return this.service.getById(id);
  }
}
