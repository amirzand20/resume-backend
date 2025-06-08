import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ApplicantDto } from '../dto/applicant.dto';
import { ResponseDto } from '../dto/response.dto';
import { ApplicantsService } from './applicants.service';

@ApiTags('applicants')
@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all applicants' })
  @ApiResponse({
    status: 200,
    description: 'Returns all applicants',
    type: ResponseDto,
  })
  async findAll(): Promise<ResponseDto> {
    const applicants = await this.applicantsService.findAll();
    return {
      status: 'success',
      message: 'Applicants retrieved successfully',
      data: applicants,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get applicant by ID' })
  @ApiParam({ name: 'id', description: 'Applicant ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Returns a single applicant',
    type: ResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Applicant not found',
  })
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    const applicant = await this.applicantsService.findOne(+id);
    
    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${id} not found`);
    }
    
    return {
      status: 'success',
      message: 'Applicant retrieved successfully',
      data: applicant,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new applicant' })
  @ApiBody({ type: ApplicantDto })
  @ApiResponse({
    status: 201,
    description: 'Applicant created successfully',
    type: ResponseDto,
  })
  create(@Body() applicantDto: ApplicantDto): ResponseDto {
    // Create a new object without the id from applicantDto to avoid duplication
    const { id, ...applicantData } = applicantDto;
    return {
      status: 'success',
      message: 'Applicant created successfully',
      data: {
        id: 999, // Generated ID
        ...applicantData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an applicant' })
  @ApiParam({ name: 'id', description: 'Applicant ID', example: 1 })
  @ApiBody({ type: ApplicantDto })
  @ApiResponse({
    status: 200,
    description: 'Applicant updated successfully',
    type: ResponseDto,
  })
  update(@Param('id') id: string, @Body() applicantDto: ApplicantDto): ResponseDto {
    // Create a new object without the id from applicantDto to avoid duplication
    const { id: applicantId, ...applicantData } = applicantDto;
    return {
      status: 'success',
      message: 'Applicant updated successfully',
      data: {
        id: +id,
        ...applicantData,
        updatedAt: new Date(),
      },
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an applicant' })
  @ApiParam({ name: 'id', description: 'Applicant ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Applicant deleted successfully',
    type: ResponseDto,
  })
  remove(@Param('id') id: string): ResponseDto {
    return {
      status: 'success',
      message: `Applicant with ID ${id} deleted successfully`,
    };
  }
} 