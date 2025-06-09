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

  @ApiProperty({ description: 'The grant date of the certificate', required: false })
  @IsDate()
  @IsOptional()
  grantDate?: Date;

  @ApiProperty({ description: 'The certificate issuer', required: false })
  @IsString()
  @IsOptional()
  certificateIssuer?: string;
}

export class AdditionalInformationDto {
  @ApiProperty({ description: 'The father job ID' })
  @IsNumber()
  @IsNotEmpty()
  fatherJobId: number;

  @ApiProperty({ description: 'The father job organ ID' })
  @IsNumber()
  @IsNotEmpty()
  fatherJobOrganId: number;

  @ApiProperty({ description: 'The mother job ID', required: false })
  @IsNumber()
  @IsOptional()
  motherJobId?: number;

  @ApiProperty({ description: 'The mother job organ ID', required: false })
  @IsNumber()
  @IsOptional()
  motherJobOrganId?: number;

  @ApiProperty({ description: 'The wife job ID', required: false })
  @IsNumber()
  @IsOptional()
  wifeJobId?: number;

  @ApiProperty({ description: 'The wife job organ ID', required: false })
  @IsNumber()
  @IsOptional()
  wifeJobOrganId?: number;

  @ApiProperty({ description: 'The child count', required: false })
  @IsNumber()
  @IsOptional()
  childCount?: number;

  @ApiProperty({ description: 'The income level ID', required: false })
  @IsNumber()
  @IsOptional()
  incomeLevelId?: number;

  @ApiProperty({ description: 'The brother count', required: false })
  @IsNumber()
  @IsOptional()
  brotherCount?: number;

  @ApiProperty({ description: 'The sister count', required: false })
  @IsNumber()
  @IsOptional()
  sisterCount?: number;

  @ApiProperty({ description: 'The father education grade ID', required: false })
  @IsNumber()
  @IsOptional()
  fatherEducationGradeId?: number;

  @ApiProperty({ description: 'The mother education grade ID', required: false })
  @IsNumber()
  @IsOptional()
  motherEducationGradeId?: number;

  @ApiProperty({ description: 'The child number', required: false })
  @IsNumber()
  @IsOptional()
  childNumber?: number;
}

export class ResumeDto {
  @ApiProperty({ description: 'The personal information of the user' })
  @IsNotEmpty()
  @IsString()
  nationalNo: string;

  @ApiProperty({ description: 'The first name of the user' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The birth date of the user' })
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({ description: 'The birth place ID of the user' })
  @IsNumber()
  @IsNotEmpty()
  birthPlaceId: number;

  @ApiProperty({ description: 'The location place ID of the user', required: false })
  @IsNumber()
  @IsOptional()
  locationPlaceId?: number;

  @ApiProperty({ description: 'The sex ID of the user' })
  @IsNumber()
  @IsNotEmpty()
  sexId: number;

  @ApiProperty({ description: 'The about me of the user', required: false })
  @IsString()
  @IsOptional()
  aboutMe?: string;

  @ApiProperty({ description: 'The mobile number of the user' })
  @IsNotEmpty()
  @IsString()
  mobileNumber: string;

  @ApiProperty({ description: 'The telephone number of the user', required: false })
  @IsString()
  @IsOptional()
  telephoneNumber?: string;

  @ApiProperty({ description: 'The email address of the user', required: false })
  @IsString()
  @IsOptional()
  emailAddress?: string;

  @ApiProperty({ description: 'The address of the user', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'The post code of the user', required: false })
  @IsString()
  @IsOptional()
  postCode?: string;

  @ApiProperty({ description: 'The profile image of the user', required: false })
  @IsString()
  @IsOptional()
  profileImage?: string;

  @ApiProperty({ description: 'The education details of the user', type: [EducationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  educations: EducationDto[];

  @ApiProperty({ description: 'The experience details of the user', type: [ExperienceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences: ExperienceDto[];

  @ApiProperty({ description: 'The skill details of the user', type: [SkillDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills: SkillDto[];

  @ApiProperty({ description: 'The certificate details of the user', type: [CertificateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  certificates: CertificateDto[];

  @ApiProperty({ description: 'The additional information of the user', type: AdditionalInformationDto })
  @ValidateNested()
  @Type(() => AdditionalInformationDto)
  additionalInformation: AdditionalInformationDto;
} 