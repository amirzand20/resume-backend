import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Query , UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery , ApiBearerAuth} from '@nestjs/swagger';
import { LanguageInfoService } from '../services/language-info.service';
import { LanguageInfo } from '../../../entity/language-info.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('language-info')
@Controller('language-info')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class LanguageInfoController {
  constructor(private readonly languageInfoService: LanguageInfoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all language information' })
  @ApiQuery({ name: 'personId', required: false, description: 'Filter by person ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all language information',
    type: [LanguageInfo],
  })
  async findAll(@Query('personId') personId?: number): Promise<LanguageInfo[]> {
    if (personId) {
      return this.languageInfoService.findByPersonId(personId);
    }
    return this.languageInfoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get language information by ID' })
  @ApiParam({ name: 'id', description: 'Language Info ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns language information',
    type: LanguageInfo,
  })
  @ApiResponse({
    status: 404,
    description: 'Language information not found',
  })
  async findOne(@Param('id') id: number): Promise<LanguageInfo> {
    return this.languageInfoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new language information' })
  @ApiBody({ type: LanguageInfo })
  @ApiResponse({
    status: 201,
    description: 'Language information created successfully',
    type: LanguageInfo,
  })
  async create(@Body() data: DeepPartial<LanguageInfo>): Promise<LanguageInfo> {
    return this.languageInfoService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update language information' })
  @ApiParam({ name: 'id', description: 'Language Info ID' })
  @ApiBody({ type: LanguageInfo })
  @ApiResponse({
    status: 200,
    description: 'Language information updated successfully',
    type: LanguageInfo,
  })
  @ApiResponse({
    status: 404,
    description: 'Language information not found',
  })
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<LanguageInfo>,
  ): Promise<LanguageInfo> {
    return this.languageInfoService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete language information' })
  @ApiParam({ name: 'id', description: 'Language Info ID' })
  @ApiResponse({
    status: 204,
    description: 'Language information deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Language information not found',
  })
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.languageInfoService.remove(id);
  }
} 