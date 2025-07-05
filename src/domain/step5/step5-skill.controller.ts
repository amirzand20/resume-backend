import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Step5SkillService } from './step5-skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ReadSkillDto } from './dto/read-skill.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard.guard';

@ApiTags('Step5 - Skill Management')
@Controller('step5/skill')
export class Step5SkillController {
  constructor(private readonly skillService: Step5SkillService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'ایجاد مهارت جدید' })
  @ApiResponse({ status: 201, description: 'مهارت با موفقیت ایجاد شد', type: ReadSkillDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر' })
  @ApiResponse({ status: 409, description: 'مهارت با این نوع برای این فرد قبلاً ثبت شده است' })
  async create(@Body() dto: CreateSkillDto): Promise<ReadSkillDto> {
    return await this.skillService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت همه مهارت‌ها' })
  @ApiResponse({ status: 200, description: 'لیست همه مهارت‌ها', type: [ReadSkillDto] })
  async findAll(): Promise<ReadSkillDto[]> {
    return await this.skillService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت مهارت بر اساس شناسه' })
  @ApiParam({ name: 'id', description: 'شناسه مهارت', type: 'number' })
  @ApiResponse({ status: 200, description: 'مهارت مورد نظر', type: ReadSkillDto })
  @ApiResponse({ status: 404, description: 'مهارت مورد نظر یافت نشد' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ReadSkillDto> {
    return await this.skillService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'بروزرسانی مهارت' })
  @ApiParam({ name: 'id', description: 'شناسه مهارت', type: 'number' })
  @ApiResponse({ status: 200, description: 'مهارت با موفقیت بروزرسانی شد', type: ReadSkillDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر' })
  @ApiResponse({ status: 404, description: 'مهارت مورد نظر یافت نشد' })
  @ApiResponse({ status: 409, description: 'مهارت با این نوع برای این فرد قبلاً ثبت شده است' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSkillDto): Promise<ReadSkillDto> {
    return await this.skillService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'حذف مهارت' })
  @ApiParam({ name: 'id', description: 'شناسه مهارت', type: 'number' })
  @ApiResponse({ status: 200, description: 'مهارت با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'مهارت مورد نظر یافت نشد' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.skillService.delete(id);
  }

  @Get('person/:personId')
  @ApiOperation({ summary: 'دریافت مهارت‌های فرد بر اساس شناسه فرد' })
  @ApiParam({ name: 'personId', description: 'شناسه فرد', type: 'number' })
  @ApiResponse({ status: 200, description: 'لیست مهارت‌های فرد', type: [ReadSkillDto] })
  async findByPersonId(@Param('personId', ParseIntPipe) personId: number): Promise<ReadSkillDto[]> {
    return await this.skillService.findByPersonId(personId);
  }
} 