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
import { EmployeeTestService } from './employee-test.service';
import { CreateEmployeeTestDto } from './dto/create-employee-test.dto';
import { ReadEmployeeTestDto } from './dto/read-employee-test.dto';
import { UpdateEmployeeTestDto } from './dto/update-employee-test.dto';

@ApiTags('employee-test')
@Controller('employee-test')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class EmployeeTestController {
  constructor(private readonly service: EmployeeTestService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadEmployeeTestDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateEmployeeTestDto): Promise<ReadEmployeeTestDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateEmployeeTestDto,
  ): Promise<ReadEmployeeTestDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadEmployeeTestDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadEmployeeTestDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadEmployeeTestDto,
  })
  async getById(@Param('id') id: number): Promise<ReadEmployeeTestDto> {
    return this.service.getById(id);
  }
} 