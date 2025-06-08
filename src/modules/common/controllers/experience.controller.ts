import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Query , UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery , ApiBearerAuth} from '@nestjs/swagger';
import { ExperienceService } from '../services/experience.service';
import { Experience } from '../../../entity/experience.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('experiences')
@Controller('experiences')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all experiences' })
  @ApiQuery({ name: 'personId', required: false, description: 'Filter by person ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all experiences',
    type: [Experience],
  })
  async findAll(@Query('personId') personId?: number): Promise<Experience[]> {
    if (personId) {
      return this.experienceService.findByPersonId(personId);
    }
    return this.experienceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an experience by ID' })
  @ApiParam({ name: 'id', description: 'Experience ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns an experience',
    type: Experience,
  })
  @ApiResponse({
    status: 404,
    description: 'Experience not found',
  })
  async findOne(@Param('id') id: number): Promise<Experience> {
    return this.experienceService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new experience' })
  @ApiBody({ type: Experience })
  @ApiResponse({
    status: 201,
    description: 'Experience created successfully',
    type: Experience,
  })
  async create(@Body() data: DeepPartial<Experience>): Promise<Experience> {
    return this.experienceService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an experience' })
  @ApiParam({ name: 'id', description: 'Experience ID' })
  @ApiBody({ type: Experience })
  @ApiResponse({
    status: 200,
    description: 'Experience updated successfully',
    type: Experience,
  })
  @ApiResponse({
    status: 404,
    description: 'Experience not found',
  })
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<Experience>,
  ): Promise<Experience> {
    return this.experienceService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an experience' })
  @ApiParam({ name: 'id', description: 'Experience ID' })
  @ApiResponse({
    status: 204,
    description: 'Experience deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Experience not found',
  })
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.experienceService.remove(id);
  }
} 