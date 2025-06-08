import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Query , UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery , ApiBearerAuth} from '@nestjs/swagger';
import { DocumentService } from '../services/document.service';
import { Document } from '../../../entity/document.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('documents')
@Controller('documents')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  @ApiQuery({ name: 'personId', required: false, description: 'Filter by person ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all documents',
    type: [Document],
  })
  async findAll(@Query('personId') personId?: number): Promise<Document[]> {
    if (personId) {
      return this.documentService.findByPersonId(personId);
    }
    return this.documentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document by ID' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a document',
    type: Document,
  })
  @ApiResponse({
    status: 404,
    description: 'Document not found',
  })
  async findOne(@Param('id') id: number): Promise<Document> {
    return this.documentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new document' })
  @ApiBody({ type: Document })
  @ApiResponse({
    status: 201,
    description: 'Document created successfully',
    type: Document,
  })
  async create(@Body() data: DeepPartial<Document>): Promise<Document> {
    return this.documentService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiBody({ type: Document })
  @ApiResponse({
    status: 200,
    description: 'Document updated successfully',
    type: Document,
  })
  @ApiResponse({
    status: 404,
    description: 'Document not found',
  })
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<Document>,
  ): Promise<Document> {
    return this.documentService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({
    status: 204,
    description: 'Document deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Document not found',
  })
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.documentService.remove(id);
  }
} 