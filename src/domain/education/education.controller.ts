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
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { ReadEducationDto } from './dto/read-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@ApiTags('education')
@Controller('education')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class EducationController {
  constructor(private readonly service: EducationService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadEducationDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateEducationDto): Promise<ReadEducationDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateEducationDto,
  ): Promise<ReadEducationDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadEducationDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadEducationDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadEducationDto,
  })
  async getById(@Param('id') id: number): Promise<ReadEducationDto> {
    return this.service.getById(id);
  }
} 