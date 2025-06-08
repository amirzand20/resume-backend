import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAdminRepository } from '../domain/admin.repository.interface';
import { Person } from '../../../entity/Person.entity';
import { Education } from '../../../entity/education.entity';
import { Experience } from '../../../entity/experience.entity';
import { Skill } from '../../../entity/skill.entity';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async findAllUsers(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async findUserById(id: number): Promise<Person | null> {
    return this.personRepository.findOne({
      where: { id },
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

  async findRecentResumes(limit: number): Promise<Person[]> {
    return this.personRepository.find({
      order: { created_date: 'DESC' },
      take: limit,
    });
  }

  async getStatistics(): Promise<any> {
    const totalUsers = await this.personRepository.count();
    const totalEducations = await this.educationRepository.count();
    const totalExperiences = await this.experienceRepository.count();
    const totalSkills = await this.skillRepository.count();

    return {
      totalUsers,
      totalEducations,
      totalExperiences,
      totalSkills,
      averageEducationsPerUser: totalUsers > 0 ? totalEducations / totalUsers : 0,
      averageExperiencesPerUser: totalUsers > 0 ? totalExperiences / totalUsers : 0,
      averageSkillsPerUser: totalUsers > 0 ? totalSkills / totalUsers : 0,
    };
  }

  async deleteUser(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }

  async countUsers(): Promise<number> {
    return this.personRepository.count();
  }
} 