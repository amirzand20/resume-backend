import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Step6LanguageInfoService } from './step6-language-info.service';
import { CreateLanguageInfoDto } from './dto/create-language-info.dto';
import { UpdateLanguageInfoDto } from './dto/update-language-info.dto';
import { ReadLanguageInfoDto } from './dto/read-language-info.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard.guard';

@ApiTags('Step6 - LanguageInfo Management')
@Controller('step6/language-info')
export class Step6LanguageInfoController {
  constructor(private readonly languageInfoService: Step6LanguageInfoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'ایجاد اطلاعات زبان جدید' })
  @ApiResponse({ status: 201, description: 'اطلاعات زبان با موفقیت ایجاد شد', type: ReadLanguageInfoDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر' })
  @ApiResponse({ status: 409, description: 'اطلاعات زبان برای این فرد قبلاً ثبت شده است' })
  async create(@Body() dto: CreateLanguageInfoDto): Promise<ReadLanguageInfoDto> {
    return await this.languageInfoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت همه اطلاعات زبان' })
  @ApiResponse({ status: 200, description: 'لیست همه اطلاعات زبان', type: [ReadLanguageInfoDto] })
  async findAll(): Promise<ReadLanguageInfoDto[]> {
    return await this.languageInfoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت اطلاعات زبان بر اساس شناسه' })
  @ApiParam({ name: 'id', description: 'شناسه اطلاعات زبان', type: 'number' })
  @ApiResponse({ status: 200, description: 'اطلاعات زبان مورد نظر', type: ReadLanguageInfoDto })
  @ApiResponse({ status: 404, description: 'اطلاعات زبان مورد نظر یافت نشد' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ReadLanguageInfoDto> {
    return await this.languageInfoService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'بروزرسانی اطلاعات زبان' })
  @ApiParam({ name: 'id', description: 'شناسه اطلاعات زبان', type: 'number' })
  @ApiResponse({ status: 200, description: 'اطلاعات زبان با موفقیت بروزرسانی شد', type: ReadLanguageInfoDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر' })
  @ApiResponse({ status: 404, description: 'اطلاعات زبان مورد نظر یافت نشد' })
  @ApiResponse({ status: 409, description: 'اطلاعات زبان برای این فرد قبلاً ثبت شده است' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLanguageInfoDto): Promise<ReadLanguageInfoDto> {
    return await this.languageInfoService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'حذف اطلاعات زبان' })
  @ApiParam({ name: 'id', description: 'شناسه اطلاعات زبان', type: 'number' })
  @ApiResponse({ status: 200, description: 'اطلاعات زبان با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'اطلاعات زبان مورد نظر یافت نشد' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.languageInfoService.delete(id);
  }

  @Get('person/:personId')
  @ApiOperation({ summary: 'دریافت اطلاعات زبان بر اساس شناسه فرد' })
  @ApiParam({ name: 'personId', description: 'شناسه فرد', type: 'number' })
  @ApiResponse({ status: 200, description: 'لیست اطلاعات زبان فرد', type: [ReadLanguageInfoDto] })
  async findByPersonId(@Param('personId', ParseIntPipe) personId: number): Promise<ReadLanguageInfoDto[]> {
    return await this.languageInfoService.findByPersonId(personId);
  }
} 