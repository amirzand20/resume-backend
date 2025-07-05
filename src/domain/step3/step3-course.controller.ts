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
import { Step3CourseService } from './step3-course.service';
import { 
  CreateCourseDto, 
  UpdateCourseDto, 
  ReadCourseDto 
} from './dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard.guard';

@ApiTags('Step3 - Course Management')
@Controller('step3/course')
export class Step3CourseController {
  constructor(private readonly courseService: Step3CourseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'ایجاد دوره جدید' })
  @ApiResponse({ 
    status: 201, 
    description: 'دوره با موفقیت ایجاد شد',
    type: ReadCourseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'دوره با این عنوان قبلاً وجود دارد' 
  })
  async create(@Body() createCourseDto: CreateCourseDto): Promise<ReadCourseDto> {
    return await this.courseService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت تمام دوره‌ها' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست تمام دوره‌ها',
    type: [ReadCourseDto] 
  })
  async findAll(): Promise<ReadCourseDto[]> {
    return await this.courseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت دوره بر اساس شناسه' })
  @ApiParam({ name: 'id', description: 'شناسه دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'دوره مورد نظر',
    type: ReadCourseDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'دوره مورد نظر یافت نشد' 
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ReadCourseDto> {
    return await this.courseService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'بروزرسانی دوره' })
  @ApiParam({ name: 'id', description: 'شناسه دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'دوره با موفقیت بروزرسانی شد',
    type: ReadCourseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'داده‌های ورودی نامعتبر' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'دوره مورد نظر یافت نشد' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'دوره با این عنوان قبلاً وجود دارد' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto
  ): Promise<ReadCourseDto> {
    return await this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'حذف دوره' })
  @ApiParam({ name: 'id', description: 'شناسه دوره', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'دوره با موفقیت حذف شد' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'دوره مورد نظر یافت نشد' 
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.courseService.delete(id);
  }

  @Get('employee-type/:employeeTypeId')
  @ApiOperation({ summary: 'دریافت دوره‌ها بر اساس نوع کارمند' })
  @ApiParam({ name: 'employeeTypeId', description: 'شناسه نوع کارمند', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست دوره‌ها بر اساس نوع کارمند',
    type: [ReadCourseDto] 
  })
  async findByEmployeeTypeId(
    @Param('employeeTypeId', ParseIntPipe) employeeTypeId: number
  ): Promise<ReadCourseDto[]> {
    return await this.courseService.findByEmployeeTypeId(employeeTypeId);
  }

  @Get('employee-force/:employeeForceId')
  @ApiOperation({ summary: 'دریافت دوره‌ها بر اساس نیروی کارمند' })
  @ApiParam({ name: 'employeeForceId', description: 'شناسه نیروی کارمند', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'لیست دوره‌ها بر اساس نیروی کارمند',
    type: [ReadCourseDto] 
  })
  async findByEmployeeForceId(
    @Param('employeeForceId', ParseIntPipe) employeeForceId: number
  ): Promise<ReadCourseDto[]> {
    return await this.courseService.findByEmployeeForceId(employeeForceId);
  }
} 