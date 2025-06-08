import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Query , UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery , ApiBearerAuth} from '@nestjs/swagger';
import { CertificateService } from '../services/certificate.service';
import { Certificate } from '../../../entity/certificate.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('certificates')
@Controller('certificates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiQuery({ name: 'personId', required: false, description: 'Filter by person ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all certificates',
    type: [Certificate],
  })
  async findAll(@Query('personId') personId?: number): Promise<Certificate[]> {
    if (personId) {
      return this.certificateService.findByPersonId(personId);
    }
    return this.certificateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a certificate by ID' })
  @ApiParam({ name: 'id', description: 'Certificate ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a certificate',
    type: Certificate,
  })
  @ApiResponse({
    status: 404,
    description: 'Certificate not found',
  })
  async findOne(@Param('id') id: number): Promise<Certificate> {
    return this.certificateService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new certificate' })
  @ApiBody({ type: Certificate })
  @ApiResponse({
    status: 201,
    description: 'Certificate created successfully',
    type: Certificate,
  })
  async create(@Body() data: DeepPartial<Certificate>): Promise<Certificate> {
    return this.certificateService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a certificate' })
  @ApiParam({ name: 'id', description: 'Certificate ID' })
  @ApiBody({ type: Certificate })
  @ApiResponse({
    status: 200,
    description: 'Certificate updated successfully',
    type: Certificate,
  })
  @ApiResponse({
    status: 404,
    description: 'Certificate not found',
  })
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<Certificate>,
  ): Promise<Certificate> {
    return this.certificateService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a certificate' })
  @ApiParam({ name: 'id', description: 'Certificate ID' })
  @ApiResponse({
    status: 204,
    description: 'Certificate deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Certificate not found',
  })
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.certificateService.remove(id);
  }
} 