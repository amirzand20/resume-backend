import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Query , UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery , ApiBearerAuth} from '@nestjs/swagger';
import { AdditionalInformationService } from '../services/additional-information.service';
import { AdditionalInformation } from '../../../entity/additional-information.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('additional-information')
@Controller('additional-information')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AdditionalInformationController {
  constructor(private readonly additionalInfoService: AdditionalInformationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all additional information' })
  @ApiQuery({ name: 'personId', required: false, description: 'Filter by person ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all additional information',
    type: [AdditionalInformation],
  })
  async findAll(@Query('personId') personId?: number): Promise<AdditionalInformation[]> {
    if (personId) {
      return this.additionalInfoService.findByPersonId(personId);
    }
    return this.additionalInfoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get additional information by ID' })
  @ApiParam({ name: 'id', description: 'Additional Information ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns additional information',
    type: AdditionalInformation,
  })
  @ApiResponse({
    status: 404,
    description: 'Additional information not found',
  })
  async findOne(@Param('id') id: number): Promise<AdditionalInformation> {
    return this.additionalInfoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new additional information' })
  @ApiBody({ type: AdditionalInformation })
  @ApiResponse({
    status: 201,
    description: 'Additional information created successfully',
    type: AdditionalInformation,
  })
  async create(@Body() data: DeepPartial<AdditionalInformation>): Promise<AdditionalInformation> {
    return this.additionalInfoService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update additional information' })
  @ApiParam({ name: 'id', description: 'Additional Information ID' })
  @ApiBody({ type: AdditionalInformation })
  @ApiResponse({
    status: 200,
    description: 'Additional information updated successfully',
    type: AdditionalInformation,
  })
  @ApiResponse({
    status: 404,
    description: 'Additional information not found',
  })
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<AdditionalInformation>,
  ): Promise<AdditionalInformation> {
    return this.additionalInfoService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete additional information' })
  @ApiParam({ name: 'id', description: 'Additional Information ID' })
  @ApiResponse({
    status: 204,
    description: 'Additional information deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Additional information not found',
  })
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.additionalInfoService.remove(id);
  }
} 