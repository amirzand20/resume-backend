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
import { EmployeeApplicantService } from './employee-applicant.service';
import { CreateEmployeeApplicantDto } from './dto/create-employee-applicant.dto';
import { ReadEmployeeApplicantDto } from './dto/read-employee-applicant.dto';
import { UpdateEmployeeApplicantDto } from './dto/update-employee-applicant.dto';

@ApiTags('employee-applicant')
@Controller('employee-applicant')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class EmployeeApplicantController {
  constructor(private readonly service: EmployeeApplicantService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadEmployeeApplicantDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateEmployeeApplicantDto): Promise<ReadEmployeeApplicantDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateEmployeeApplicantDto,
  ): Promise<ReadEmployeeApplicantDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadEmployeeApplicantDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadEmployeeApplicantDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadEmployeeApplicantDto,
  })
  async getById(@Param('id') id: number): Promise<ReadEmployeeApplicantDto> {
    return this.service.getById(id);
  }
} 