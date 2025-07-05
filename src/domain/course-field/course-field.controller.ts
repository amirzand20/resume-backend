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
import { CourseFieldService } from './course-field.service';
import { CreateCourseFieldDto } from './dto/create-course-field.dto';
import { ReadCourseFieldDto } from './dto/read-course-field.dto';
import { UpdateCourseFieldDto } from './dto/update-course-field.dto';

@ApiTags('course-field')
@Controller('course-field')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class CourseFieldController {
  constructor(private readonly service: CourseFieldService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadCourseFieldDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateCourseFieldDto): Promise<ReadCourseFieldDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateCourseFieldDto,
  ): Promise<ReadCourseFieldDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadCourseFieldDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadCourseFieldDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadCourseFieldDto,
  })
  async getById(@Param('id') id: number): Promise<ReadCourseFieldDto> {
    return this.service.getById(id);
  }
} 