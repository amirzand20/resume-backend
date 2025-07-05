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
import { PersonnelInCourseService } from './personnel-in-course.service';
import { CreatePersonnelInCourseDto } from './dto/create-personnel-in-course.dto';
import { ReadPersonnelInCourseDto } from './dto/read-personnel-in-course.dto';
import { UpdatePersonnelInCourseDto } from './dto/update-personnel-in-course.dto';

@ApiTags('personnel-in-course')
@Controller('personnel-in-course')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class PersonnelInCourseController {
  constructor(private readonly service: PersonnelInCourseService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadPersonnelInCourseDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreatePersonnelInCourseDto): Promise<ReadPersonnelInCourseDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdatePersonnelInCourseDto,
  ): Promise<ReadPersonnelInCourseDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadPersonnelInCourseDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadPersonnelInCourseDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadPersonnelInCourseDto,
  })
  async getById(@Param('id') id: number): Promise<ReadPersonnelInCourseDto> {
    return this.service.getById(id);
  }
} 