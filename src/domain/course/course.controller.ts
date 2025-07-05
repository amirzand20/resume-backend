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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ReadCourseDto } from './dto/read-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('course')
@Controller('course')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadCourseDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateCourseDto): Promise<ReadCourseDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateCourseDto,
  ): Promise<ReadCourseDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadCourseDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadCourseDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadCourseDto,
  })
  async getById(@Param('id') id: number): Promise<ReadCourseDto> {
    return this.service.getById(id);
  }
} 