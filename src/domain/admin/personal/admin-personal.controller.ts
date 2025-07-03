
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
import {JwtAuthGuard} from "@/auth/guards/jwt-guard.guard";
import {Personal} from "@/entities/personal.entity";
import {ApiQueryListResponse} from "@/common/decorators/swaager-api-response.decorator";
import {Pagination} from "@/common/decorators/pagination.decorator";
import {PageLimit} from "@/common/decorators/limit.decorator";
import {Filter} from "@/common/decorators/filter.decorator";
import {Sort} from "@/common/decorators/sort.decorator";
import {SortParam} from "@/common/dto/request-params/sort-param";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import { PersonalService } from '@/domain/common/personal/personal.service';
import { CreatePersonalDto } from '@/domain/common/personal/dto/create-personal.dto';
import { ReadPersonalDto } from '@/domain/common/personal/dto/read-personal.dto';
import { UpdatePersonalDto } from '@/domain/common/personal/dto/update-personal.dto';
import { OAuthJwtGuard } from '@/auth/guards/oauth-jwt-guard.guard';

@ApiTags('admin-personal')
@Controller('admin/personal')
@UseGuards(OAuthJwtGuard)
@ApiBearerAuth('sso-auth')
export class AdminPersonalController {
  constructor(private readonly service: PersonalService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<Personal> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(@Body() data: CreatePersonalDto): Promise<ReadPersonalDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdatePersonalDto,
  ): Promise<ReadPersonalDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all/filter')
  @ApiQueryListResponse(ReadPersonalDto)
  getAllWithFilter(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadPersonalDto>> {
    return this.service.getAllWithFilter(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadPersonalDto,
  })
  async getById(@Param('id') id: number): Promise<any> {
    return this.service.getById(id);
  }
}
