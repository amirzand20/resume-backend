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
import { EmployeeFieldTestService } from './employee-field-test.service';
import { CreateEmployeeFieldTestDto } from './dto/create-employee-field-test.dto';
import { ReadEmployeeFieldTestDto } from './dto/read-employee-field-test.dto';
import { UpdateEmployeeFieldTestDto } from './dto/update-employee-field-test.dto';

@ApiTags('employee-field-test')
@Controller('employee-field-test')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class EmployeeFieldTestController {
  constructor(private readonly service: EmployeeFieldTestService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadEmployeeFieldTestDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateEmployeeFieldTestDto): Promise<ReadEmployeeFieldTestDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateEmployeeFieldTestDto,
  ): Promise<ReadEmployeeFieldTestDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadEmployeeFieldTestDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadEmployeeFieldTestDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadEmployeeFieldTestDto,
  })
  async getById(@Param('id') id: number): Promise<ReadEmployeeFieldTestDto> {
    return this.service.getById(id);
  }
} 