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
import { LanguageInfoService } from './language-info.service';
import { CreateLanguageInfoDto } from './dto/create-language-info.dto';
import { ReadLanguageInfoDto } from './dto/read-language-info.dto';
import { UpdateLanguageInfoDto } from './dto/update-language-info.dto';

@ApiTags('language-info')
@Controller('language-info')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class LanguageInfoController {
  constructor(private readonly service: LanguageInfoService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadLanguageInfoDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateLanguageInfoDto): Promise<ReadLanguageInfoDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateLanguageInfoDto,
  ): Promise<ReadLanguageInfoDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadLanguageInfoDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadLanguageInfoDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadLanguageInfoDto,
  })
  async getById(@Param('id') id: number): Promise<ReadLanguageInfoDto> {
    return this.service.getById(id);
  }
} 