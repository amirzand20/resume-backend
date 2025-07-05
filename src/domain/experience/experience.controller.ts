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
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ReadExperienceDto } from './dto/read-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@ApiTags('experience')
@Controller('experience')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class ExperienceController {
  constructor(private readonly service: ExperienceService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadExperienceDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateExperienceDto): Promise<ReadExperienceDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateExperienceDto,
  ): Promise<ReadExperienceDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadExperienceDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadExperienceDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadExperienceDto,
  })
  async getById(@Param('id') id: number): Promise<ReadExperienceDto> {
    return this.service.getById(id);
  }
} 