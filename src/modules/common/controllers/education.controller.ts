import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { EducationService } from '../services/education.service';
import { Education } from '../../../entity/education.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('educations')
@Controller('educations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all educations' })
  @ApiQuery({ name: 'personId', required: false, description: 'Filter by person ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all educations',
    type: [Education],
  })
  async findAll(@Query('personId') personId?: number): Promise<Education[]> {
    if (personId) {
      return this.educationService.findByPersonId(personId);
    }
    return this.educationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an education by ID' })
  @ApiParam({ name: 'id', description: 'Education ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns an education',
    type: Education,
  })
  @ApiResponse({
    status: 404,
    description: 'Education not found',
  })
  async findOne(@Param('id') id: number): Promise<Education> {
    return this.educationService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new education' })
  @ApiBody({ type: Education })
  @ApiResponse({
    status: 201,
    description: 'Education created successfully',
    type: Education,
  })
  async create(@Body() data: DeepPartial<Education>): Promise<Education> {
    return this.educationService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an education' })
  @ApiParam({ name: 'id', description: 'Education ID' })
  @ApiBody({ type: Education })
  @ApiResponse({
    status: 200,
    description: 'Education updated successfully',
    type: Education,
  })
  @ApiResponse({
    status: 404,
    description: 'Education not found',
  })
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<Education>,
  ): Promise<Education> {
    return this.educationService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an education' })
  @ApiParam({ name: 'id', description: 'Education ID' })
  @ApiResponse({
    status: 204,
    description: 'Education deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Education not found',
  })
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.educationService.remove(id);
  }
} 