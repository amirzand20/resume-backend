import { Injectable, NotFoundException } from '@nestjs/common';
import { ResumeReportDto } from './dto/resume-report.dto';
import { Step1Service } from '../step1/step1.service';
import { Step2Service } from '../step2/step2.service';
import { Step3CourseService } from '../step3/step3-course.service';
import { Step4ExperienceService } from '../step4/step4-experience.service';
import { Step5SkillService } from '../step5/step5-skill.service';
import { Step6LanguageInfoService } from '../step6/step6-language-info.service';
import { Step7ApplicantService } from '../step7/step7-applicant.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly step1Service: Step1Service,
    private readonly step2Service: Step2Service,
    private readonly step3CourseService: Step3CourseService,
    private readonly step4ExperienceService: Step4ExperienceService,
    private readonly step5SkillService: Step5SkillService,
    private readonly step6LanguageInfoService: Step6LanguageInfoService,
    private readonly step7ApplicantService: Step7ApplicantService,
  ) {}

  async getResumeReport(personId: number): Promise<ResumeReportDto> {

    const resumeReportDto = new ResumeReportDto()
    // Step 1
    const step1 = await this.step1Service.findOne(personId);
    if (!step1) throw new NotFoundException('اطلاعات مرحله ۱ یافت نشد');

    // Step 2
    const step2 = await this.step2Service.findByPersonId(personId);
    if (!step2) throw new NotFoundException('اطلاعات مرحله ۲ یافت نشد');

    // Step 3
    const step3 = await this.step3CourseService.findAll();

    // Step 4
    const step4 = await this.step4ExperienceService.findByPersonId(personId);

    // Step 5
    const step5 = await this.step5SkillService.findByPersonId(personId);

    // Step 6
    const step6 = await this.step6LanguageInfoService.findByPersonId(personId);

    // Step 7
    const step7 = await this.step7ApplicantService.findByPersonId(personId);

    resumeReportDto.step1 = step1
    resumeReportDto.step2 = step2
    resumeReportDto.step3 = step3
    resumeReportDto.step4 = step4
    resumeReportDto.step5 = step5
    resumeReportDto.step6 = step6
    resumeReportDto.step7 = step7

    return resumeReportDto
  }
} 