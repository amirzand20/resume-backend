import { Person } from '../../../entity/Person.entity';
import { Education } from '../../../entity/education.entity';
import { Experience } from '../../../entity/experience.entity';
import { Skill } from '../../../entity/skill.entity';
import { Certificate } from '../../../entity/certificate.entity';
import { LanguageInfo } from '../../../entity/language-info.entity';
import { AdditionalInformation } from '../../../entity/additional-information.entity';
import { ResumeSearchDto, ResumeSearchResponseDto } from './resume-search.dto';

export interface IResumeService {
  createResume(personId: number): Promise<Person>;
  getResumeById(personId: number): Promise<Person>;
  updatePersonalInfo(personId: number, personalInfo: Partial<Person>): Promise<Person>;
  addEducation(personId: number, education: Partial<Education>): Promise<Education>;
  updateEducation(educationId: number, education: Partial<Education>): Promise<Education>;
  deleteEducation(educationId: number): Promise<void>;
  addExperience(personId: number, experience: Partial<Experience>): Promise<Experience>;
  updateExperience(experienceId: number, experience: Partial<Experience>): Promise<Experience>;
  deleteExperience(experienceId: number): Promise<void>;
  addSkill(personId: number, skill: Partial<Skill>): Promise<Skill>;
  updateSkill(skillId: number, skill: Partial<Skill>): Promise<Skill>;
  deleteSkill(skillId: number): Promise<void>;
  addCertificate(personId: number, certificate: Partial<Certificate>): Promise<Certificate>;
  updateCertificate(certificateId: number, certificate: Partial<Certificate>): Promise<Certificate>;
  deleteCertificate(certificateId: number): Promise<void>;
  addLanguage(personId: number, language: Partial<LanguageInfo>): Promise<LanguageInfo>;
  updateLanguage(languageId: number, language: Partial<LanguageInfo>): Promise<LanguageInfo>;
  deleteLanguage(languageId: number): Promise<void>;
  addAdditionalInfo(personId: number, info: Partial<AdditionalInformation>): Promise<AdditionalInformation>;
  updateAdditionalInfo(infoId: number, info: Partial<AdditionalInformation>): Promise<AdditionalInformation>;
  deleteAdditionalInfo(infoId: number): Promise<void>;
  publishResume(personId: number): Promise<boolean>;
  searchResumes(searchParams: ResumeSearchDto): Promise<ResumeSearchResponseDto>;
} 