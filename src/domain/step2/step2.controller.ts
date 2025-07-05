import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Step2Service } from './step2.service';
import { CreateStep2Dto, UpdateStep2Dto, ReadStep2Dto } from './dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard.guard';

@ApiTags('Step2 - اطلاعات تماس')
@Controller('step2')
export class Step2Controller {
  constructor(private readonly step2Service: Step2Service) {}

  @Post()
  @ApiOperation({ 
    summary: 'ایجاد اطلاعات تماس جدید',
    description: 'ایجاد رکورد جدید اطلاعات تماس برای شخص'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'اطلاعات تماس با موفقیت ایجاد شد',
    type: ReadStep2Dto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'اطلاعات تماس قبلاً ثبت شده یا شماره موبایل تکراری' 
  })
  async create(@Body() createStep2Dto: CreateStep2Dto): Promise<ReadStep2Dto> {
    return await this.step2Service.create(createStep2Dto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'دریافت تمام اطلاعات تماس',
    description: 'دریافت لیست تمام رکوردهای اطلاعات تماس'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست اطلاعات تماس',
    type: [ReadStep2Dto] 
  })
  async findAll(): Promise<ReadStep2Dto[]> {
    return await this.step2Service.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'دریافت اطلاعات تماس بر اساس شناسه',
    description: 'دریافت اطلاعات تماس با شناسه مشخص'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'شناسه رکورد اطلاعات تماس',
    type: 'number' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'اطلاعات تماس',
    type: ReadStep2Dto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'اطلاعات تماس یافت نشد' 
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ReadStep2Dto> {
    return await this.step2Service.findById(id);
  }

  @Get('person/:personId')
  @ApiOperation({ 
    summary: 'دریافت اطلاعات تماس بر اساس شناسه شخص',
    description: 'دریافت اطلاعات تماس برای شخص مشخص'
  })
  @ApiParam({ 
    name: 'personId', 
    description: 'شناسه شخص',
    type: 'number' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'اطلاعات تماس شخص',
    type: ReadStep2Dto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'اطلاعات تماس برای این شخص یافت نشد' 
  })
  async findByPersonId(@Param('personId', ParseIntPipe) personId: number): Promise<ReadStep2Dto> {
    return await this.step2Service.findByPersonId(personId);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'بروزرسانی اطلاعات تماس',
    description: 'بروزرسانی رکورد اطلاعات تماس با شناسه مشخص'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'شناسه رکورد اطلاعات تماس',
    type: 'number' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'اطلاعات تماس با موفقیت بروزرسانی شد',
    type: ReadStep2Dto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'اطلاعات تماس یافت نشد' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'شماره موبایل یا ایمیل تکراری' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStep2Dto: UpdateStep2Dto
  ): Promise<ReadStep2Dto> {
    return await this.step2Service.update(id, updateStep2Dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'حذف اطلاعات تماس',
    description: 'حذف رکورد اطلاعات تماس با شناسه مشخص'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'شناسه رکورد اطلاعات تماس',
    type: 'number' 
  })
  @ApiResponse({ 
    status: 204, 
    description: 'اطلاعات تماس با موفقیت حذف شد' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'اطلاعات تماس یافت نشد' 
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.step2Service.delete(id);
  }

  @Post('validate/:personId')
  @ApiOperation({ 
    summary: 'اعتبارسنجی اطلاعات تماس',
    description: 'بررسی کامل بودن اطلاعات تماس برای شخص مشخص'
  })
  @ApiParam({ 
    name: 'personId', 
    description: 'شناسه شخص',
    type: 'number' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'نتیجه اعتبارسنجی',
    schema: {
      type: 'object',
      properties: {
        isValid: { type: 'boolean' },
        errors: { 
          type: 'array',
          items: { type: 'string' }
        }
      }
    }
  })
  async validateContactInfo(@Param('personId', ParseIntPipe) personId: number): Promise<{ isValid: boolean; errors: string[] }> {
    return await this.step2Service.validateContactInfo(personId);
  }
} 