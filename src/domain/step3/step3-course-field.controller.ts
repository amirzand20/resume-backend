import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  ParseIntPipe,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Step3CourseFieldService } from './step3-course-field.service';
import { 
  CreateCourseFieldDto, 
  UpdateCourseFieldDto, 
  ReadCourseFieldDto 
} from './dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard.guard';

@ApiTags('Step3 - Course Field Management')
@Controller('step3/course-field')
@UseGuards(JwtAuthGuard)
export class Step3CourseFieldController {
  constructor(private readonly courseFieldService: Step3CourseFieldService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'ایجاد رشته دوره جدید' })
  @ApiResponse({ 
    status: 201, 
    description: 'رشته دوره با موفقیت ایجاد شد',
    type: ReadCourseFieldDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'رشته دوره برای این دوره قبلاً تعریف شده است' 
  })
  async create(@Body() createCourseFieldDto: CreateCourseFieldDto): Promise<ReadCourseFieldDto> {
    return await this.courseFieldService.create(createCourseFieldDto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت تمام رشته‌های دوره' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست تمام رشته‌های دوره',
    type: [ReadCourseFieldDto] 
  })
  async findAll(): Promise<ReadCourseFieldDto[]> {
    return await this.courseFieldService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت رشته دوره بر اساس شناسه' })
  @ApiParam({ name: 'id', description: 'شناسه رشته دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'رشته دوره مورد نظر',
    type: ReadCourseFieldDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'رشته دوره مورد نظر یافت نشد' 
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ReadCourseFieldDto> {
    return await this.courseFieldService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'بروزرسانی رشته دوره' })
  @ApiParam({ name: 'id', description: 'شناسه رشته دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'رشته دوره با موفقیت بروزرسانی شد',
    type: ReadCourseFieldDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'رشته دوره مورد نظر یافت نشد' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'رشته دوره برای این دوره قبلاً تعریف شده است' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseFieldDto: UpdateCourseFieldDto
  ): Promise<ReadCourseFieldDto> {
    return await this.courseFieldService.update(id, updateCourseFieldDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'حذف رشته دوره' })
  @ApiParam({ name: 'id', description: 'شناسه رشته دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'رشته دوره با موفقیت حذف شد' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'رشته دوره مورد نظر یافت نشد' 
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.courseFieldService.delete(id);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'دریافت رشته‌های دوره بر اساس دوره' })
  @ApiParam({ name: 'courseId', description: 'شناسه دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست رشته‌های دوره بر اساس دوره',
    type: [ReadCourseFieldDto] 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'دوره مورد نظر یافت نشد' 
  })
  async findByCourseId(
    @Param('courseId', ParseIntPipe) courseId: number
  ): Promise<ReadCourseFieldDto[]> {
    return await this.courseFieldService.findByCourseId(courseId);
  }

  @Get('course-field/:courseFieldId')
  @ApiOperation({ summary: 'دریافت رشته‌های دوره بر اساس رشته دوره' })
  @ApiParam({ name: 'courseFieldId', description: 'شناسه رشته دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست رشته‌های دوره بر اساس رشته دوره',
    type: [ReadCourseFieldDto] 
  })
  async findByCourseFieldId(
    @Param('courseFieldId', ParseIntPipe) courseFieldId: number
  ): Promise<ReadCourseFieldDto[]> {
    return await this.courseFieldService.findByCourseFieldId(courseFieldId);
  }

  @Get('capacity/:capacity')
  @ApiOperation({ summary: 'دریافت رشته‌های دوره بر اساس ظرفیت' })
  @ApiParam({ name: 'capacity', description: 'ظرفیت', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست رشته‌های دوره بر اساس ظرفیت',
    type: [ReadCourseFieldDto] 
  })
  async findByCapacity(
    @Param('capacity', ParseIntPipe) capacity: number
  ): Promise<ReadCourseFieldDto[]> {
    return await this.courseFieldService.findByCapacity(capacity);
  }
} 