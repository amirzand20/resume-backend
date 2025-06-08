import { Person } from '../../../entity/Person.entity';
import { Education } from '../../../entity/education.entity';
import { Experience } from '../../../entity/experience.entity';
import { Skill } from '../../../entity/skill.entity';
import { Certificate } from '../../../entity/certificate.entity';
import { LanguageInfo } from '../../../entity/language-info.entity';
import { AdditionalInformation } from '../../../entity/additional-information.entity';
import { ResumeSearchDto } from './resume-search.dto';

export interface IResumeRepository {
  findPersonById(personId: number): Promise<Person | null>;
  savePerson(person: Person): Promise<Person>;
  
  findEducationById(educationId: number): Promise<Education | null>;
  saveEducation(education: Education): Promise<Education>;
  deleteEducation(educationId: number): Promise<void>;
  
  findExperienceById(experienceId: number): Promise<Experience | null>;
  saveExperience(experience: Experience): Promise<Experience>;
  deleteExperience(experienceId: number): Promise<void>;
  
  findSkillById(skillId: number): Promise<Skill | null>;
  saveSkill(skill: Skill): Promise<Skill>;
  deleteSkill(skillId: number): Promise<void>;
  
  findCertificateById(certificateId: number): Promise<Certificate | null>;
  saveCertificate(certificate: Certificate): Promise<Certificate>;
  deleteCertificate(certificateId: number): Promise<void>;
  
  findLanguageById(languageId: number): Promise<LanguageInfo | null>;
  saveLanguage(language: LanguageInfo): Promise<LanguageInfo>;
  deleteLanguage(languageId: number): Promise<void>;
  
  findAdditionalInfoById(infoId: number): Promise<AdditionalInformation | null>;
  saveAdditionalInfo(info: AdditionalInformation): Promise<AdditionalInformation>;
  deleteAdditionalInfo(infoId: number): Promise<void>;

  searchResumes(searchParams: ResumeSearchDto): Promise<{ data: Person[]; total: number }>;
} 