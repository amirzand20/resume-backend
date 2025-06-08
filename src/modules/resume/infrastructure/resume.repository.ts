import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResumeRepository } from '../domain/resume.repository.interface';
import { Person } from '../../../entity/Person.entity';
import { Education } from '../../../entity/education.entity';
import { Experience } from '../../../entity/experience.entity';
import { Skill } from '../../../entity/skill.entity';
import { Certificate } from '../../../entity/certificate.entity';
import { LanguageInfo } from '../../../entity/language-info.entity';
import { AdditionalInformation } from '../../../entity/additional-information.entity';
import { ResumeSearchDto } from '../domain/resume-search.dto';

@Injectable()
export class ResumeRepository implements IResumeRepository {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
    @InjectRepository(LanguageInfo)
    private languageRepository: Repository<LanguageInfo>,
    @InjectRepository(AdditionalInformation)
    private additionalInfoRepository: Repository<AdditionalInformation>,
  ) {}

  async findPersonById(personId: number): Promise<Person | null> {
    return this.personRepository.findOne({
      where: { id: personId },
      relations: [
        'educations',
        'experiences',
        'skills',
        'certificates',
        'languageInfos',
        'additionalInformations',
        'contactInfos',
        'documents',
      ],
    });
  }

  async savePerson(person: Person): Promise<Person> {
    return this.personRepository.save(person);
  }

  async findEducationById(educationId: number): Promise<Education | null> {
    return this.educationRepository.findOne({
      where: { id: educationId },
      relations: ['person'],
    });
  }

  async saveEducation(education: Education): Promise<Education> {
    return this.educationRepository.save(education);
  }

  async deleteEducation(educationId: number): Promise<void> {
    await this.educationRepository.delete(educationId);
  }

  async findExperienceById(experienceId: number): Promise<Experience | null> {
    return this.experienceRepository.findOne({
      where: { id: experienceId },
      relations: ['person'],
    });
  }

  async saveExperience(experience: Experience): Promise<Experience> {
    return this.experienceRepository.save(experience);
  }

  async deleteExperience(experienceId: number): Promise<void> {
    await this.experienceRepository.delete(experienceId);
  }

  async findSkillById(skillId: number): Promise<Skill | null> {
    return this.skillRepository.findOne({
      where: { id: skillId },
      relations: ['person'],
    });
  }

  async saveSkill(skill: Skill): Promise<Skill> {
    return this.skillRepository.save(skill);
  }

  async deleteSkill(skillId: number): Promise<void> {
    await this.skillRepository.delete(skillId);
  }

  async findCertificateById(certificateId: number): Promise<Certificate | null> {
    return this.certificateRepository.findOne({
      where: { id: certificateId },
      relations: ['person'],
    });
  }

  async saveCertificate(certificate: Certificate): Promise<Certificate> {
    return this.certificateRepository.save(certificate);
  }

  async deleteCertificate(certificateId: number): Promise<void> {
    await this.certificateRepository.delete(certificateId);
  }

  async findLanguageById(languageId: number): Promise<LanguageInfo | null> {
    return this.languageRepository.findOne({
      where: { id: languageId },
      relations: ['person'],
    });
  }

  async saveLanguage(language: LanguageInfo): Promise<LanguageInfo> {
    return this.languageRepository.save(language);
  }

  async deleteLanguage(languageId: number): Promise<void> {
    await this.languageRepository.delete(languageId);
  }

  async findAdditionalInfoById(infoId: number): Promise<AdditionalInformation | null> {
    return this.additionalInfoRepository.findOne({
      where: { id: infoId },
      relations: ['person'],
    });
  }

  async saveAdditionalInfo(info: AdditionalInformation): Promise<AdditionalInformation> {
    return this.additionalInfoRepository.save(info);
  }

  async deleteAdditionalInfo(infoId: number): Promise<void> {
    await this.additionalInfoRepository.delete(infoId);
  }

  async searchResumes(searchParams: ResumeSearchDto): Promise<{ data: Person[]; total: number }> {
    const { 
      name, 
      birthPlaceId, 
      locationPlaceId, 
      sexId, 
      skills, 
      education, 
      experience, 
      language, 
      page = 1, 
      limit = 10 
    } = searchParams;

    // Build query
    const queryBuilder = this.personRepository.createQueryBuilder('person')
      .leftJoinAndSelect('person.educations', 'education')
      .leftJoinAndSelect('person.experiences', 'experience')
      .leftJoinAndSelect('person.skills', 'skill')
      .leftJoinAndSelect('person.languageInfos', 'language')
      .leftJoinAndSelect('person.certificates', 'certificate')
      .leftJoinAndSelect('person.additionalInformations', 'additionalInfo');

    // Apply filters conditionally (only if they are provided)
    if (name) {
      queryBuilder.andWhere(
        '(person.first_name LIKE :name OR person.last_name LIKE :name)',
        { name: `%${name}%` }
      );
    }

    if (birthPlaceId) {
      queryBuilder.andWhere('person.birth_place_id = :birthPlaceId', { birthPlaceId });
    }

    if (locationPlaceId) {
      queryBuilder.andWhere('person.location_place_id = :locationPlaceId', { locationPlaceId });
    }

    if (sexId) {
      queryBuilder.andWhere('person.sex_id = :sexId', { sexId });
    }

    if (skills) {
      queryBuilder.andWhere('skill.name LIKE :skills', { skills: `%${skills}%` });
    }

    if (education) {
      queryBuilder.andWhere(
        '(education.university LIKE :education OR education.major LIKE :education OR education.degree_level LIKE :education)',
        { education: `%${education}%` }
      );
    }

    if (experience) {
      queryBuilder.andWhere(
        '(experience.company LIKE :experience OR experience.title LIKE :experience OR experience.description LIKE :experience)',
        { experience: `%${experience}%` }
      );
    }

    if (language) {
      queryBuilder.andWhere('language.language_name LIKE :language', { language: `%${language}%` });
    }

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Execute query
    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }
} 