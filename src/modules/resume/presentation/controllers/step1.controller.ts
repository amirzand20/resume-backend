import { Controller, Post, Body, Param, UseGuards, Request, Get, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Step1Service } from '../../application/services/step1.service';
import { CreatePersonalInfoDto } from '../../domain/dto/step1-personal-info.dto';
import { PersonalInfo } from '../../domain/entities/step1-personal-info.entity';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@ApiTags('Resume Step 1')
@Controller('resume/step1')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt-auth')
@ApiBearerAuth()
export class Step1Controller {
  constructor(private readonly step1Service: Step1Service) {}

  @Get('user-resumes')
  @ApiOperation({ 
    summary: 'Get all resumes for the authenticated user',
    description: 'Returns list of all resumes created by the user'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of resumes retrieved successfully'
  })
  async getUserResumes(@Request() req) {
    return this.step1Service.getUserResumes(req.user.id);
  }

  @Post('create')
  @ApiOperation({ 
    summary: 'Create a new resume',
    description: 'Creates a new resume with DRAFT status for the authenticated user'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Resume created successfully'
  })
  async createResume(@Request() req) {
    return this.step1Service.createResume(req.user.id);
  }

  @Post(':resumeId')
  @ApiOperation({ 
    summary: 'Create personal information for a resume',
    description: 'Creates personal information for a resume and moves to step 2'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Personal information created successfully', 
    type: PersonalInfo 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid step order - Current step must be 1' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Resume not found' 
  })
  async createPersonalInfo(
    @Request() req,
    @Param('resumeId') resumeId: number,
    @Body() createPersonalInfoDto: CreatePersonalInfoDto,
  ): Promise<PersonalInfo> {
    return this.step1Service.createPersonalInfo(req.user.id, resumeId, createPersonalInfoDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a resume',
    description: 'Deletes a resume and all its related information'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Resume deleted successfully'
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Permission denied - User does not own this resume'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Resume not found'
  })
  async deleteResume(@Request() req, @Param('id') id: number) {
    return this.step1Service.deleteResume(req.user.id, id);
  }
} 