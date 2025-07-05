import { ApiProperty } from '@nestjs/swagger';
import { ReadStep1Dto } from '../../step1/dto/read-step1.dto';
import { ReadStep2Dto } from '../../step2/dto/read-step2.dto';
import { ReadCourseDto } from '../../step3/dto/read-course.dto';
import { ReadExperienceDto } from '../../step4/dto/read-experience.dto';
import { ReadSkillDto } from '../../step5/dto/read-skill.dto';
import { ReadLanguageInfoDto } from '../../step6/dto/read-language-info.dto';
import { ReadApplicantDto } from '../../step7/dto/read-applicant.dto';

export class ResumeReportDto {
  @ApiProperty({ type: ReadStep1Dto })
  step1: ReadStep1Dto;

  @ApiProperty({ type: ReadStep2Dto })
  step2: ReadStep2Dto;

  @ApiProperty({ type: [ReadCourseDto] })
  step3: ReadCourseDto[];

  @ApiProperty({ type: [ReadExperienceDto] })
  step4: ReadExperienceDto[];

  @ApiProperty({ type: [ReadSkillDto] })
  step5: ReadSkillDto[];

  @ApiProperty({ type: [ReadLanguageInfoDto] })
  step6: ReadLanguageInfoDto[];

  @ApiProperty({ type: [ReadApplicantDto] })
  step7: ReadApplicantDto[];
} 