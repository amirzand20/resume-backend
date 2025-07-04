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
import { ForcePriorityService } from './force-priority.service';
import { CreateForcePriorityDto } from './dto/create-force-priority.dto';
import { ReadForcePriorityDto } from './dto/read-force-priority.dto';
import { UpdateForcePriorityDto } from './dto/update-force-priority.dto';

@ApiTags('force-priority')
@Controller('force-priority')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class ForcePriorityController {
  constructor(private readonly service: ForcePriorityService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadForcePriorityDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateForcePriorityDto): Promise<ReadForcePriorityDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateForcePriorityDto,
  ): Promise<ReadForcePriorityDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadForcePriorityDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadForcePriorityDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadForcePriorityDto,
  })
  async getById(@Param('id') id: number): Promise<ReadForcePriorityDto> {
    return this.service.getById(id);
  }
} 