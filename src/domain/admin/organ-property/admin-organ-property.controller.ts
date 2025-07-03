import { OrganProperty } from '@/entities/organ-property.entity';
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
import {Pagination} from "@/common/decorators/pagination.decorator";
import {PageLimit} from "@/common/decorators/limit.decorator";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import { OrganPropertyService } from '@/domain/common/organ-property/organ-property.service';
import { ReadOrganPropertyDto } from '@/domain/common/organ-property/dto/read-organ-property.dto';
import { CreateOrganPropertyDto } from '@/domain/common/organ-property/dto/create-organ-property.dto';
import { OAuthJwtGuard } from '@/auth/guards/oauth-jwt-guard.guard';

@ApiTags('admin-organproperty')
@UseGuards(OAuthJwtGuard)
@ApiBearerAuth('sso-auth')
@Controller('admin/organproperty')
export class AdminOrganPropertyController {
  constructor(private readonly service: OrganPropertyService) {}

  @Get(':id')
  @ApiResponse({
    type: ReadOrganPropertyDto,
  })
  getById(
      @Param('id') id: number,
      @Pagination() page:number,
      @PageLimit() pageLimit:number
  ): Promise<QueryListResultDto<ReadOrganPropertyDto>> {
    return this.service.getById(id,pageLimit,page);
  }

  @Post()
  @ApiResponse({
    type: ReadOrganPropertyDto,
  })
  async create(
    @Body() data: CreateOrganPropertyDto,
  ): Promise<ReadOrganPropertyDto> {
    return this.service.create(data);
  }

  @Put(':organId')
  async update(
    @Param('organId') organId: number,
    @Body()
    data: CreateOrganPropertyDto,
  ): Promise<ReadOrganPropertyDto> {
    return await this.service.update(organId, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<OrganProperty> {
    return this.service.deleteById(id);
  }
}
