import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Step7ApplicantService } from './step7-applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { ReadApplicantDto } from './dto/read-applicant.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard.guard';

@ApiTags('Step7 - Applicant Management')
@Controller('step7/applicant')
export class Step7ApplicantController {
  constructor(private readonly applicantService: Step7ApplicantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'ایجاد متقاضی جدید' })
  @ApiResponse({ status: 201, description: 'متقاضی با موفقیت ایجاد شد', type: ReadApplicantDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر' })
  @ApiResponse({ status: 409, description: 'متقاضی برای این فرد قبلاً ثبت شده است' })
  async create(@Body() dto: CreateApplicantDto): Promise<ReadApplicantDto> {
    return await this.applicantService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت همه متقاضیان' })
  @ApiResponse({ status: 200, description: 'لیست همه متقاضیان', type: [ReadApplicantDto] })
  async findAll(): Promise<ReadApplicantDto[]> {
    return await this.applicantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت متقاضی بر اساس شناسه' })
  @ApiParam({ name: 'id', description: 'شناسه متقاضی', type: 'number' })
  @ApiResponse({ status: 200, description: 'متقاضی مورد نظر', type: ReadApplicantDto })
  @ApiResponse({ status: 404, description: 'متقاضی مورد نظر یافت نشد' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ReadApplicantDto> {
    return await this.applicantService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'بروزرسانی متقاضی' })
  @ApiParam({ name: 'id', description: 'شناسه متقاضی', type: 'number' })
  @ApiResponse({ status: 200, description: 'متقاضی با موفقیت بروزرسانی شد', type: ReadApplicantDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر' })
  @ApiResponse({ status: 404, description: 'متقاضی مورد نظر یافت نشد' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateApplicantDto): Promise<ReadApplicantDto> {
    return await this.applicantService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'حذف متقاضی' })
  @ApiParam({ name: 'id', description: 'شناسه متقاضی', type: 'number' })
  @ApiResponse({ status: 200, description: 'متقاضی با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'متقاضی مورد نظر یافت نشد' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.applicantService.delete(id);
  }

  @Get('person/:personId')
  @ApiOperation({ summary: 'دریافت متقاضیان بر اساس شناسه فرد' })
  @ApiParam({ name: 'personId', description: 'شناسه فرد', type: 'number' })
  @ApiResponse({ status: 200, description: 'لیست متقاضیان فرد', type: [ReadApplicantDto] })
  async findByPersonId(@Param('personId', ParseIntPipe) personId: number): Promise<ReadApplicantDto[]> {
    return await this.applicantService.findByPersonId(personId);
  }
} 