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
import { CourseEducationGradeService } from './course-education-grade.service';
import { CreateCourseEducationGradeDto } from './dto/create-course-education-grade.dto';
import { ReadCourseEducationGradeDto } from './dto/read-course-education-grade.dto';
import { UpdateCourseEducationGradeDto } from './dto/update-course-education-grade.dto';

@ApiTags('course-education-grade')
@Controller('course-education-grade')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class CourseEducationGradeController {
  constructor(private readonly service: CourseEducationGradeService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadCourseEducationGradeDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateCourseEducationGradeDto): Promise<ReadCourseEducationGradeDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateCourseEducationGradeDto,
  ): Promise<ReadCourseEducationGradeDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadCourseEducationGradeDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadCourseEducationGradeDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadCourseEducationGradeDto,
  })
  async getById(@Param('id') id: number): Promise<ReadCourseEducationGradeDto> {
    return this.service.getById(id);
  }
} 