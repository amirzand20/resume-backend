import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Query , UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery , ApiBearerAuth} from '@nestjs/swagger';
import { SkillService } from '../services/skill.service';
import { Skill } from '../../../entity/skill.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('skills')
@Controller('skills')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiQuery({ name: 'personId', required: false, description: 'Filter by person ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all skills',
    type: [Skill],
  })
  async findAll(@Query('personId') personId?: number): Promise<Skill[]> {
    if (personId) {
      return this.skillService.findByPersonId(personId);
    }
    return this.skillService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a skill by ID' })
  @ApiParam({ name: 'id', description: 'Skill ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a skill',
    type: Skill,
  })
  @ApiResponse({
    status: 404,
    description: 'Skill not found',
  })
  async findOne(@Param('id') id: number): Promise<Skill> {
    return this.skillService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new skill' })
  @ApiBody({ type: Skill })
  @ApiResponse({
    status: 201,
    description: 'Skill created successfully',
    type: Skill,
  })
  async create(@Body() data: DeepPartial<Skill>): Promise<Skill> {
    return this.skillService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a skill' })
  @ApiParam({ name: 'id', description: 'Skill ID' })
  @ApiBody({ type: Skill })
  @ApiResponse({
    status: 200,
    description: 'Skill updated successfully',
    type: Skill,
  })
  @ApiResponse({
    status: 404,
    description: 'Skill not found',
  })
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<Skill>,
  ): Promise<Skill> {
    return this.skillService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a skill' })
  @ApiParam({ name: 'id', description: 'Skill ID' })
  @ApiResponse({
    status: 204,
    description: 'Skill deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Skill not found',
  })
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.skillService.remove(id);
  }
} 