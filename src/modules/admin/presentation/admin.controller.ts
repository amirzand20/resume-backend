import { Controller, Get, Delete, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AdminService } from '../application/admin.service';
import { Person } from '../../../entity/Person.entity';
import { Auth } from '../../../shared/decorators/auth.decorator';

@ApiTags('admin')
@Controller('admin')
@Auth('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users',
    type: [Person],
  })
  async getAllUsers(): Promise<Person[]> {
    return this.adminService.getAllUsers();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a single user',
    type: Person,
  })
  async getUserById(@Param('id') id: number): Promise<Person> {
    return this.adminService.getUserById(id);
  }

  @Get('recent-resumes')
  @ApiOperation({ summary: 'Get recent resumes' })
  @ApiQuery({ name: 'limit', description: 'Number of resumes to return', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns recent resumes',
    type: [Person],
  })
  async getRecentResumes(@Query('limit') limit = 10): Promise<Person[]> {
    return this.adminService.getRecentResumes(limit);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get resume statistics' })
  @ApiResponse({
    status: 200,
    description: 'Returns resume statistics',
    schema: {
      type: 'object',
      properties: {
        totalUsers: { type: 'number' },
        totalEducations: { type: 'number' },
        totalExperiences: { type: 'number' },
        totalSkills: { type: 'number' },
        averageEducationsPerUser: { type: 'number' },
        averageExperiencesPerUser: { type: 'number' },
        averageSkillsPerUser: { type: 'number' },
      },
    },
  })
  async getResumeStatistics(): Promise<any> {
    return this.adminService.getResumeStatistics();
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.adminService.deleteUser(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get admin dashboard data' })
  @ApiResponse({
    status: 200,
    description: 'Returns admin dashboard data',
  })
  async getDashboard() {
    return this.adminService.getDashboardData();
  }
} 