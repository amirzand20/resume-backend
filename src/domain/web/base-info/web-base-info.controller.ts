import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/common/decorators/pagination.decorator';
import { Filter } from '@/common/decorators/filter.decorator';
import { PageLimit } from '@/common/decorators/limit.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { ApiQueryListResponse } from '@/common/decorators/swaager-api-response.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-guard.guard';
import { BaseInfo } from '@/entities/base-info.entity';
import { HttpCacheInterceptor } from '@/common/interceptors/HttpCacheInterceptor';
import { BaseInfoService } from '@/domain/common/base-info/base-info.service';
import { CreateBaseInfoDto } from '@/domain/common/base-info/dto/create-base-info.dto';
import { ReadBaseInfoAfterSaveDto } from '@/domain/common/base-info/dto/read-base-info-after-save.dto';
import { ReadBaseInfoDto } from '@/domain/common/base-info/dto/read-base-info.dto';

@Controller('base-info')
@ApiTags('base-info')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
@UseInterceptors(HttpCacheInterceptor)
export class WebBaseInfoController {
  constructor(private readonly service: BaseInfoService) {}

  @Get('/get-item-baseinfo/:id/system/:systemid')
  @ApiResponse({
    type: ReadBaseInfoDto,
  })
  async get(
    @Param('id') id: number,
    @Param('systemid') systemId: number,
  ): Promise<ReadBaseInfoDto> {
    return this.service.getByIdAndSystemId(id, systemId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<BaseInfo> {
    return this.service.deleteById(id);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadBaseInfoDto)
  async getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort,
  ): Promise<QueryListResultDto<ReadBaseInfoDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Post()
  create(@Body() data: CreateBaseInfoDto): Promise<ReadBaseInfoAfterSaveDto> {
    return this.service.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body()
    data: CreateBaseInfoDto,
  ): Promise<ReadBaseInfoAfterSaveDto> {
    return this.service.update(id, data);
  }
}
