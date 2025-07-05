import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Step1Service } from './step1.service';
import { CreateStep1Dto } from './dto/create-step1.dto';
import { UpdateStep1Dto } from './dto/update-step1.dto';
import { ReadStep1Dto } from './dto/read-step1.dto';

@ApiTags('Step1 - person-info')
@Controller('step1')
export class Step1Controller {
  constructor(private readonly step1Service: Step1Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'ایجاد اطلاعات فردی جدید',
    description: 'ایجاد رکورد جدید اطلاعات فردی با اعتبارسنجی کامل'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'اطلاعات فردی با موفقیت ایجاد شد',
    type: ReadStep1Dto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'کد ملی یا شماره موبایل تکراری' 
  })
  async create(@Body(ValidationPipe) createStep1Dto: CreateStep1Dto): Promise<ReadStep1Dto> {
    return await this.step1Service.create(createStep1Dto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'دریافت تمام اطلاعات فردی',
    description: 'دریافت لیست تمام رکوردهای اطلاعات فردی'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست اطلاعات فردی',
    type: [ReadStep1Dto] 
  })
  async findAll(): Promise<ReadStep1Dto[]> {
    return await this.step1Service.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'دریافت اطلاعات فردی بر اساس شناسه',
    description: 'دریافت اطلاعات فردی با شناسه مشخص'
  })
  @ApiParam({ name: 'id', description: 'شناسه شخص', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'اطلاعات فردی',
    type: ReadStep1Dto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'شخص مورد نظر یافت نشد' 
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ReadStep1Dto> {
    return await this.step1Service.findOne(id);
  }

  @Get('national/:nationalNo')
  @ApiOperation({ 
    summary: 'دریافت اطلاعات فردی بر اساس کد ملی',
    description: 'دریافت اطلاعات فردی با کد ملی مشخص'
  })
  @ApiParam({ name: 'nationalNo', description: 'کد ملی شخص', type: 'string' })
  @ApiResponse({ 
    status: 200, 
    description: 'اطلاعات فردی',
    type: ReadStep1Dto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'شخص با این کد ملی یافت نشد' 
  })
  async findByNationalNo(@Param('nationalNo') nationalNo: string): Promise<ReadStep1Dto> {
    return await this.step1Service.findByNationalNo(nationalNo);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'بروزرسانی اطلاعات فردی',
    description: 'بروزرسانی اطلاعات فردی با شناسه مشخص'
  })
  @ApiParam({ name: 'id', description: 'شناسه شخص', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'اطلاعات فردی با موفقیت بروزرسانی شد',
    type: ReadStep1Dto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'شخص مورد نظر یافت نشد' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'کد ملی یا شماره موبایل تکراری' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateStep1Dto: UpdateStep1Dto,
  ): Promise<ReadStep1Dto> {
    return await this.step1Service.update(id, updateStep1Dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'حذف اطلاعات فردی',
    description: 'حذف اطلاعات فردی با شناسه مشخص'
  })
  @ApiParam({ name: 'id', description: 'شناسه شخص', type: 'number' })
  @ApiResponse({ 
    status: 204, 
    description: 'اطلاعات فردی با موفقیت حذف شد' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'شخص مورد نظر یافت نشد' 
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.step1Service.remove(id);
  }

  @Get(':id/validate')
  @ApiOperation({ 
    summary: 'اعتبارسنجی تکمیل اطلاعات فردی',
    description: 'بررسی تکمیل بودن تمام فیلدهای اجباری اطلاعات فردی'
  })
  @ApiParam({ name: 'id', description: 'شناسه شخص', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'نتیجه اعتبارسنجی',
    schema: {
      type: 'object',
      properties: {
        isValid: { type: 'boolean', description: 'آیا اطلاعات کامل است' },
        missingFields: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'فیلدهای ناقص'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'شخص مورد نظر یافت نشد' 
  })
  async validateStep1Complete(@Param('id', ParseIntPipe) id: number) {
    return await this.step1Service.validateStep1Complete(id);
  }
} 