import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { ResumeReportDto } from './dto/resume-report.dto';

@ApiTags('Resume Report')
@Controller('report/resume')
export class ReportController {
  constructor(private readonly resumeReportService: ReportService) {}

  @Get(':personId')
  @ApiOperation({ summary: 'دریافت گزارش کامل رزومه بر اساس personId' })
  @ApiParam({ name: 'personId', description: 'شناسه فرد', type: Number })
  @ApiResponse({ status: 200, description: 'گزارش کامل رزومه', type: ResumeReportDto })
  async getResumeReport(@Param('personId', ParseIntPipe) personId: number): Promise<ResumeReportDto> {
    return await this.resumeReportService.getResumeReport(personId);
  }
} 