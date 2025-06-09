import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EducationDto {
  @ApiProperty({ description: 'The grade ID of the education' })
  @IsNumber()
  @IsNotEmpty()
  gradeId: number;

  @ApiProperty({ description: 'The level ID of the education' })
  @IsNumber()
  @IsNotEmpty()
  levelId: number;

  @ApiProperty({ description: 'The field ID of the education', required: false })
  @IsNumber()
  @IsOptional()
  fieldId?: number;

  @ApiProperty({ description: 'The institute ID of the education', required: false })
  @IsNumber()
  @IsOptional()
  instituteId?: number;

  @ApiProperty({ description: 'The graduation date of the education', required: false })
  @IsDate()
  @IsOptional()
  graduationDate?: Date;

  @ApiProperty({ description: 'The adjusted value of the education', required: false })
  @IsNumber()
  @IsOptional()
  adjusted?: number;
}

export class ExperienceDto {
  @ApiProperty({ description: 'The job title of the experience' })
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty({ description: 'The company name of the experience' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: 'The company location ID of the experience' })
  @IsNumber()
  @IsNotEmpty()
  companyLocationId: number;

  @ApiProperty({ description: 'The start date of the experience' })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ description: 'The end date of the experience', required: false })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class SkillDto {
  @ApiProperty({ description: 'The skill ID' })
  @IsNumber()
  @IsNotEmpty()
  skillId: number;

  @ApiProperty({ description: 'The level ID of the skill' })
  @IsNumber()
  @IsNotEmpty()
  levelId: number;
}

export class CertificateDto {
  @ApiProperty({ description: 'The certificate type ID' })
  @IsNumber()
  @IsNotEmpty()
  certificateTypeId: number;

  @ApiProperty({ description: 'The comment for the certificate', required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ description: 'The grant date of the certificate' })
  @IsDate()
  @IsNotEmpty()
  grantDate: Date;

  @ApiProperty({ description: 'The certificate issuer' })
  @IsString()
  @IsNotEmpty()
  certificateIssuer: string;
}

export class AdditionalInformationDto {
  @ApiProperty({ description: 'The father job ID', required: false })
  @IsNumber()
  @IsOptional()
  fatherJobId?: number;

  @ApiProperty({ description: 'The mother job ID', required: false })
  @IsNumber()
  @IsOptional()
  motherJobId?: number;

  @ApiProperty({ description: 'The wife job ID', required: false })
  @IsNumber()
  @IsOptional()
  wifeJobId?: number;

  @ApiProperty({ description: 'The child count', required: false })
  @IsNumber()
  @IsOptional()
  childCount?: number;
}

export class ResumeDto {
  @ApiProperty({ description: 'The national number of the person' })
  @IsString()
  @IsNotEmpty()
  nationalNo: string;

  @ApiProperty({ description: 'The first name of the person' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The last name of the person' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'The birth date of the person' })
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({ description: 'The birth place ID of the person' })
  @IsNumber()
  @IsNotEmpty()
  birthPlaceId: number;

  @ApiProperty({ description: 'The sex ID of the person' })
  @IsNumber()
  @IsNotEmpty()
  sexId: number;

  @ApiProperty({ description: 'The educations of the person', type: [EducationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  educations: EducationDto[];

  @ApiProperty({ description: 'The experiences of the person', type: [ExperienceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences: ExperienceDto[];

  @ApiProperty({ description: 'The skills of the person', type: [SkillDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills: SkillDto[];

  @ApiProperty({ description: 'The certificates of the person', type: [CertificateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  certificates: CertificateDto[];

  @ApiProperty({ description: 'The additional information of the person', type: AdditionalInformationDto })
  @ValidateNested()
  @Type(() => AdditionalInformationDto)
  additionalInformation: AdditionalInformationDto;
}