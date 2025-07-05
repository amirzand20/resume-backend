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
import { PropertiesService } from './properties.service';
import { CreatePropertiesDto } from './dto/create-properties.dto';
import { ReadPropertiesDto } from './dto/read-properties.dto';
import { UpdatePropertiesDto } from './dto/update-properties.dto';

@ApiTags('properties')
@Controller('properties')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class PropertiesController {
  constructor(private readonly service: PropertiesService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadPropertiesDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreatePropertiesDto): Promise<ReadPropertiesDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdatePropertiesDto,
  ): Promise<ReadPropertiesDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadPropertiesDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadPropertiesDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadPropertiesDto,
  })
  async getById(@Param('id') id: number): Promise<ReadPropertiesDto> {
    return this.service.getById(id);
  }
} 