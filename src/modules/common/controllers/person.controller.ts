import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PersonService } from '../services/person.service';
import { Person } from '../../../entity/Person.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('persons')
@Controller('persons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @ApiOperation({ summary: 'Get all persons' })
  @ApiResponse({
    status: 200,
    description: 'Returns all persons',
    type: [Person],
  })
  async findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a person by ID' })
  @ApiParam({ name: 'id', description: 'Person ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a person',
    type: Person,
  })
  @ApiResponse({
    status: 404,
    description: 'Person not found',
  })
  async findOne(@Param('id') id: number): Promise<Person> {
    return this.personService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new person' })
  @ApiBody({ type: Person })
  @ApiResponse({
    status: 201,
    description: 'Person created successfully',
    type: Person,
  })
  async create(@Body() data: DeepPartial<Person>): Promise<Person> {
    return this.personService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a person' })
  @ApiParam({ name: 'id', description: 'Person ID' })
  @ApiBody({ type: Person })
  @ApiResponse({
    status: 200,
    description: 'Person updated successfully',
    type: Person,
  })
  @ApiResponse({
    status: 404,
    description: 'Person not found',
  })
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<Person>,
  ): Promise<Person> {
    return this.personService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a person' })
  @ApiParam({ name: 'id', description: 'Person ID' })
  @ApiResponse({
    status: 204,
    description: 'Person deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Person not found',
  })
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.personService.remove(id);
  }
} 