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
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { ReadPropertyDto } from './dto/read-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@ApiTags('property')
@Controller('property')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class PropertyController {
  constructor(private readonly service: PropertyService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadPropertyDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreatePropertyDto): Promise<ReadPropertyDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdatePropertyDto,
  ): Promise<ReadPropertyDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadPropertyDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadPropertyDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadPropertyDto,
  })
  async getById(@Param('id') id: number): Promise<ReadPropertyDto> {
    return this.service.getById(id);
  }
} 