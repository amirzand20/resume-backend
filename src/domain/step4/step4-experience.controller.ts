import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Step4ExperienceService } from './step4-experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ReadExperienceDto } from './dto/read-experience.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard.guard';

@ApiTags('Step4 - Experience Management')
@Controller('step4/experience')
export class Step4ExperienceController {
  constructor(private readonly experienceService: Step4ExperienceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'ایجاد سابقه جدید' })
  @ApiResponse({ status: 201, description: 'سابقه با موفقیت ایجاد شد', type: ReadExperienceDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر' })
  @ApiResponse({ status: 409, description: 'سابقه با این عنوان شغلی قبلاً ثبت شده است' })
  async create(@Body() dto: CreateExperienceDto): Promise<ReadExperienceDto> {
    return await this.experienceService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت همه سوابق' })
  @ApiResponse({ status: 200, description: 'لیست همه سوابق', type: [ReadExperienceDto] })
  async findAll(): Promise<ReadExperienceDto[]> {
    return await this.experienceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت سابقه بر اساس شناسه' })
  @ApiParam({ name: 'id', description: 'شناسه سابقه', type: 'number' })
  @ApiResponse({ status: 200, description: 'سابقه مورد نظر', type: ReadExperienceDto })
  @ApiResponse({ status: 404, description: 'سابقه مورد نظر یافت نشد' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ReadExperienceDto> {
    return await this.experienceService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'بروزرسانی سابقه' })
  @ApiParam({ name: 'id', description: 'شناسه سابقه', type: 'number' })
  @ApiResponse({ status: 200, description: 'سابقه با موفقیت بروزرسانی شد', type: ReadExperienceDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر' })
  @ApiResponse({ status: 404, description: 'سابقه مورد نظر یافت نشد' })
  @ApiResponse({ status: 409, description: 'سابقه با این عنوان شغلی قبلاً ثبت شده است' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateExperienceDto): Promise<ReadExperienceDto> {
    return await this.experienceService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'حذف سابقه' })
  @ApiParam({ name: 'id', description: 'شناسه سابقه', type: 'number' })
  @ApiResponse({ status: 200, description: 'سابقه با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'سابقه مورد نظر یافت نشد' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.experienceService.delete(id);
  }

  @Get('person/:personId')
  @ApiOperation({ summary: 'دریافت سوابق بر اساس شناسه فرد' })
  @ApiParam({ name: 'personId', description: 'شناسه فرد', type: 'number' })
  @ApiResponse({ status: 200, description: 'لیست سوابق فرد', type: [ReadExperienceDto] })
  async findByPersonId(@Param('personId', ParseIntPipe) personId: number): Promise<ReadExperienceDto[]> {
    return await this.experienceService.findByPersonId(personId);
  }
} 