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
import { Step3CourseEducationGradeService } from './step3-course-education-grade.service';
import { 
  CreateCourseEducationGradeDto, 
  UpdateCourseEducationGradeDto, 
  ReadCourseEducationGradeDto 
} from './dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard.guard';

@ApiTags('Step3 - Course Education Grade Management')
@Controller('step3/course-education-grade')
@UseGuards(JwtAuthGuard)
export class Step3CourseEducationGradeController {
  constructor(private readonly courseEducationGradeService: Step3CourseEducationGradeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'ایجاد مقطع تحصیلی دوره جدید' })
  @ApiResponse({ 
    status: 201, 
    description: 'مقطع تحصیلی دوره با موفقیت ایجاد شد',
    type: ReadCourseEducationGradeDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'مقطع تحصیلی برای این دوره قبلاً تعریف شده است' 
  })
  async create(@Body() createCourseEducationGradeDto: CreateCourseEducationGradeDto): Promise<ReadCourseEducationGradeDto> {
    return await this.courseEducationGradeService.create(createCourseEducationGradeDto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت تمام مقاطع تحصیلی دوره‌ها' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست تمام مقاطع تحصیلی دوره‌ها',
    type: [ReadCourseEducationGradeDto] 
  })
  async findAll(): Promise<ReadCourseEducationGradeDto[]> {
    return await this.courseEducationGradeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت مقطع تحصیلی دوره بر اساس شناسه' })
  @ApiParam({ name: 'id', description: 'شناسه مقطع تحصیلی دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'مقطع تحصیلی دوره مورد نظر',
    type: ReadCourseEducationGradeDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'مقطع تحصیلی دوره مورد نظر یافت نشد' 
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ReadCourseEducationGradeDto> {
    return await this.courseEducationGradeService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'بروزرسانی مقطع تحصیلی دوره' })
  @ApiParam({ name: 'id', description: 'شناسه مقطع تحصیلی دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'مقطع تحصیلی دوره با موفقیت بروزرسانی شد',
    type: ReadCourseEducationGradeDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'مقطع تحصیلی دوره مورد نظر یافت نشد' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'مقطع تحصیلی برای این دوره قبلاً تعریف شده است' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseEducationGradeDto: UpdateCourseEducationGradeDto
  ): Promise<ReadCourseEducationGradeDto> {
    return await this.courseEducationGradeService.update(id, updateCourseEducationGradeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'حذف مقطع تحصیلی دوره' })
  @ApiParam({ name: 'id', description: 'شناسه مقطع تحصیلی دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'مقطع تحصیلی دوره با موفقیت حذف شد' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'مقطع تحصیلی دوره مورد نظر یافت نشد' 
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.courseEducationGradeService.delete(id);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'دریافت مقاطع تحصیلی بر اساس دوره' })
  @ApiParam({ name: 'courseId', description: 'شناسه دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست مقاطع تحصیلی بر اساس دوره',
    type: [ReadCourseEducationGradeDto] 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'دوره مورد نظر یافت نشد' 
  })
  async findByCourseId(
    @Param('courseId', ParseIntPipe) courseId: number
  ): Promise<ReadCourseEducationGradeDto[]> {
    return await this.courseEducationGradeService.findByCourseId(courseId);
  }

  @Get('education-grade/:educationGradeId')
  @ApiOperation({ summary: 'دریافت مقاطع تحصیلی دوره بر اساس مقطع تحصیلی' })
  @ApiParam({ name: 'educationGradeId', description: 'شناسه مقطع تحصیلی', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست مقاطع تحصیلی دوره بر اساس مقطع تحصیلی',
    type: [ReadCourseEducationGradeDto] 
  })
  async findByEducationGradeId(
    @Param('educationGradeId', ParseIntPipe) educationGradeId: number
  ): Promise<ReadCourseEducationGradeDto[]> {
    return await this.courseEducationGradeService.findByEducationGradeId(educationGradeId);
  }
} 