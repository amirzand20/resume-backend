import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Query , UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery , ApiBearerAuth} from '@nestjs/swagger';
import { ContactInfoService } from '../services/contact-info.service';
import { ContactInfo } from '../../../entity/contact-info.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('contact-info')
@Controller('contact-info')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ContactInfoController {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all contact information' })
  @ApiQuery({ name: 'personId', required: false, description: 'Filter by person ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all contact information',
    type: [ContactInfo],
  })
  async findAll(@Query('personId') personId?: number): Promise<ContactInfo[]> {
    if (personId) {
      return this.contactInfoService.findByPersonId(personId);
    }
    return this.contactInfoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact information by ID' })
  @ApiParam({ name: 'id', description: 'Contact Info ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns contact information',
    type: ContactInfo,
  })
  @ApiResponse({
    status: 404,
    description: 'Contact information not found',
  })
  async findOne(@Param('id') id: number): Promise<ContactInfo> {
    return this.contactInfoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new contact information' })
  @ApiBody({ type: ContactInfo })
  @ApiResponse({
    status: 201,
    description: 'Contact information created successfully',
    type: ContactInfo,
  })
  async create(@Body() data: DeepPartial<ContactInfo>): Promise<ContactInfo> {
    return this.contactInfoService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update contact information' })
  @ApiParam({ name: 'id', description: 'Contact Info ID' })
  @ApiBody({ type: ContactInfo })
  @ApiResponse({
    status: 200,
    description: 'Contact information updated successfully',
    type: ContactInfo,
  })
  @ApiResponse({
    status: 404,
    description: 'Contact information not found',
  })
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<ContactInfo>,
  ): Promise<ContactInfo> {
    return this.contactInfoService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact information' })
  @ApiParam({ name: 'id', description: 'Contact Info ID' })
  @ApiResponse({
    status: 204,
    description: 'Contact information deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Contact information not found',
  })
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.contactInfoService.remove(id);
  }
} 