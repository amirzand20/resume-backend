import { Injectable, NotFoundException } from '@nestjs/common';
import { IResumeService } from '../domain/resume.interface';
import { IResumeRepository } from '../domain/resume.repository.interface';
import { Person } from '../../../entity/Person.entity';
import { Education } from '../../../entity/education.entity';
import { Experience } from '../../../entity/experience.entity';
import { Skill } from '../../../entity/skill.entity';
import { Certificate } from '../../../entity/certificate.entity';
import { LanguageInfo } from '../../../entity/language-info.entity';
import { AdditionalInformation } from '../../../entity/additional-information.entity';
import { ResumeSearchDto, ResumeSearchResponseDto } from '../domain/resume-search.dto';

@Injectable()
export class ResumeService implements IResumeService {
  constructor(private readonly resumeRepository: IResumeRepository) {}

  async createResume(personId: number): Promise<Person> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }
    return person;
  }

  async getResumeById(personId: number): Promise<Person> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }
    return person;
  }

  async updatePersonalInfo(personId: number, personalInfo: Partial<Person>): Promise<Person> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    // Update the person object with the new information
    Object.assign(person, personalInfo);
    
    return this.resumeRepository.savePerson(person);
  }

  async addEducation(personId: number, education: Partial<Education>): Promise<Education> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const newEducation = new Education();
    Object.assign(newEducation, education);
    // Set the person relationship
    newEducation.person = person;
    
    return this.resumeRepository.saveEducation(newEducation);
  }

  async updateEducation(educationId: number, education: Partial<Education>): Promise<Education> {
    const existingEducation = await this.resumeRepository.findEducationById(educationId);
    if (!existingEducation) {
      throw new NotFoundException(`Education with ID ${educationId} not found`);
    }

    // Update the education object with the new information
    Object.assign(existingEducation, education);
    
    return this.resumeRepository.saveEducation(existingEducation);
  }

  async deleteEducation(educationId: number): Promise<void> {
    const existingEducation = await this.resumeRepository.findEducationById(educationId);
    if (!existingEducation) {
      throw new NotFoundException(`Education with ID ${educationId} not found`);
    }

    return this.resumeRepository.deleteEducation(educationId);
  }

  async addExperience(personId: number, experience: Partial<Experience>): Promise<Experience> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const newExperience = new Experience();
    Object.assign(newExperience, experience);
    // Set the person relationship
    newExperience.person = person;
    
    return this.resumeRepository.saveExperience(newExperience);
  }

  async updateExperience(experienceId: number, experience: Partial<Experience>): Promise<Experience> {
    const existingExperience = await this.resumeRepository.findExperienceById(experienceId);
    if (!existingExperience) {
      throw new NotFoundException(`Experience with ID ${experienceId} not found`);
    }

    // Update the experience object with the new information
    Object.assign(existingExperience, experience);
    
    return this.resumeRepository.saveExperience(existingExperience);
  }

  async deleteExperience(experienceId: number): Promise<void> {
    const existingExperience = await this.resumeRepository.findExperienceById(experienceId);
    if (!existingExperience) {
      throw new NotFoundException(`Experience with ID ${experienceId} not found`);
    }

    return this.resumeRepository.deleteExperience(experienceId);
  }

  async addSkill(personId: number, skill: Partial<Skill>): Promise<Skill> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const newSkill = new Skill();
    Object.assign(newSkill, skill);
    // Set the person relationship
    newSkill.person = person;
    
    return this.resumeRepository.saveSkill(newSkill);
  }

  async updateSkill(skillId: number, skill: Partial<Skill>): Promise<Skill> {
    const existingSkill = await this.resumeRepository.findSkillById(skillId);
    if (!existingSkill) {
      throw new NotFoundException(`Skill with ID ${skillId} not found`);
    }

    // Update the skill object with the new information
    Object.assign(existingSkill, skill);
    
    return this.resumeRepository.saveSkill(existingSkill);
  }

  async deleteSkill(skillId: number): Promise<void> {
    const existingSkill = await this.resumeRepository.findSkillById(skillId);
    if (!existingSkill) {
      throw new NotFoundException(`Skill with ID ${skillId} not found`);
    }

    return this.resumeRepository.deleteSkill(skillId);
  }

  async addCertificate(personId: number, certificate: Partial<Certificate>): Promise<Certificate> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const newCertificate = new Certificate();
    Object.assign(newCertificate, certificate);
    // Set the person relationship
    newCertificate.person = person;
    
    return this.resumeRepository.saveCertificate(newCertificate);
  }

  async updateCertificate(certificateId: number, certificate: Partial<Certificate>): Promise<Certificate> {
    const existingCertificate = await this.resumeRepository.findCertificateById(certificateId);
    if (!existingCertificate) {
      throw new NotFoundException(`Certificate with ID ${certificateId} not found`);
    }

    // Update the certificate object with the new information
    Object.assign(existingCertificate, certificate);
    
    return this.resumeRepository.saveCertificate(existingCertificate);
  }

  async deleteCertificate(certificateId: number): Promise<void> {
    const existingCertificate = await this.resumeRepository.findCertificateById(certificateId);
    if (!existingCertificate) {
      throw new NotFoundException(`Certificate with ID ${certificateId} not found`);
    }

    return this.resumeRepository.deleteCertificate(certificateId);
  }

  async addLanguage(personId: number, language: Partial<LanguageInfo>): Promise<LanguageInfo> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const newLanguage = new LanguageInfo();
    Object.assign(newLanguage, language);
    // Set the person relationship
    newLanguage.person = person;
    
    return this.resumeRepository.saveLanguage(newLanguage);
  }

  async updateLanguage(languageId: number, language: Partial<LanguageInfo>): Promise<LanguageInfo> {
    const existingLanguage = await this.resumeRepository.findLanguageById(languageId);
    if (!existingLanguage) {
      throw new NotFoundException(`Language with ID ${languageId} not found`);
    }

    // Update the language object with the new information
    Object.assign(existingLanguage, language);
    
    return this.resumeRepository.saveLanguage(existingLanguage);
  }

  async deleteLanguage(languageId: number): Promise<void> {
    const existingLanguage = await this.resumeRepository.findLanguageById(languageId);
    if (!existingLanguage) {
      throw new NotFoundException(`Language with ID ${languageId} not found`);
    }

    return this.resumeRepository.deleteLanguage(languageId);
  }

  async addAdditionalInfo(personId: number, info: Partial<AdditionalInformation>): Promise<AdditionalInformation> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const newInfo = new AdditionalInformation();
    Object.assign(newInfo, info);
    // Set the person relationship
    newInfo.person = person;
    
    return this.resumeRepository.saveAdditionalInfo(newInfo);
  }

  async updateAdditionalInfo(infoId: number, info: Partial<AdditionalInformation>): Promise<AdditionalInformation> {
    const existingInfo = await this.resumeRepository.findAdditionalInfoById(infoId);
    if (!existingInfo) {
      throw new NotFoundException(`Additional Information with ID ${infoId} not found`);
    }

    // Update the info object with the new information
    Object.assign(existingInfo, info);
    
    return this.resumeRepository.saveAdditionalInfo(existingInfo);
  }

  async deleteAdditionalInfo(infoId: number): Promise<void> {
    const existingInfo = await this.resumeRepository.findAdditionalInfoById(infoId);
    if (!existingInfo) {
      throw new NotFoundException(`Additional Information with ID ${infoId} not found`);
    }

    return this.resumeRepository.deleteAdditionalInfo(infoId);
  }

  async publishResume(personId: number): Promise<boolean> {
    const person = await this.resumeRepository.findPersonById(personId);
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    // Logic to publish the resume
    // For now, we'll just return true
    return true;
  }

  async searchResumes(searchParams: ResumeSearchDto): Promise<ResumeSearchResponseDto> {
    const { data, total } = await this.resumeRepository.searchResumes(searchParams);
    
    const page = searchParams.page || 1;
    const limit = searchParams.limit || 10;
    const pageCount = Math.ceil(total / limit);
    
    return {
      data,
      total,
      page,
      limit,
      pageCount
    };
  }
} 