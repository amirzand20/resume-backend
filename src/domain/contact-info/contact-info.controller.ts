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
import { ContactInfoService } from './contact-info.service';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { ReadContactInfoDto } from './dto/read-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';

@ApiTags('contact-info')
@Controller('contact-info')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class ContactInfoController {
  constructor(private readonly service: ContactInfoService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadContactInfoDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateContactInfoDto): Promise<ReadContactInfoDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateContactInfoDto,
  ): Promise<ReadContactInfoDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadContactInfoDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadContactInfoDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadContactInfoDto,
  })
  async getById(@Param('id') id: number): Promise<ReadContactInfoDto> {
    return this.service.getById(id);
  }
} 