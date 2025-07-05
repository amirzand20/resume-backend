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
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { ReadSkillDto } from './dto/read-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@ApiTags('skill')
@Controller('skill')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
export class SkillController {
  constructor(private readonly service: SkillService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<ReadSkillDto> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreateSkillDto): Promise<ReadSkillDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateSkillDto,
  ): Promise<ReadSkillDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadSkillDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadSkillDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadSkillDto,
  })
  async getById(@Param('id') id: number): Promise<ReadSkillDto> {
    return this.service.getById(id);
  }
} 