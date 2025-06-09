import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume, ResumeStatus } from '../../domain/entities/resume.entity';
import { PersonalInfo } from '../../domain/entities/step1-personal-info.entity';
import { CreatePersonalInfoDto } from '../../domain/dto/step1-personal-info.dto';

@Injectable()
export class Step1Service {
  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
    @InjectRepository(PersonalInfo)
    private personalInfoRepository: Repository<PersonalInfo>,
  ) {}

  async getUserResumes(userId: number) {
    try {
      const resumes = await this.resumeRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' }
      });

      return resumes;
    } catch (error) {
      console.error('Error in getUserResumes:', error);
      throw error;
    }
  }

  async createResume(userId: number) {
    try {
      const resume = this.resumeRepository.create({
        userId,
        currentStep: 1,
        isCompleted: false,
        status: ResumeStatus.DRAFT
      });

      return await this.resumeRepository.save(resume);
    } catch (error) {
      console.error('Error in createResume:', error);
      throw error;
    }
  }

  async createPersonalInfo(userId: number, resumeId: number, createPersonalInfoDto: CreatePersonalInfoDto) {
    try {
      const resume = await this.resumeRepository.findOne({ where: { id: resumeId } });
      if (!resume) {
        throw new NotFoundException('Resume not found');
      }

      if (resume.userId !== userId) {
        throw new ForbiddenException('You do not have permission to modify this resume');
      }

      if (resume.currentStep !== 1) {
        throw new ForbiddenException('Cannot modify personal info at this step');
      }

      const personalInfo = this.personalInfoRepository.create({
        ...createPersonalInfoDto,
        resumeId
      });

      const savedPersonalInfo = await this.personalInfoRepository.save(personalInfo);

      // Update resume step and status
      resume.currentStep = 2;
      resume.status = ResumeStatus.IN_PROGRESS;
      await this.resumeRepository.save(resume);

      return savedPersonalInfo;
    } catch (error) {
      console.error('Error in createPersonalInfo:', error);
      throw error;
    }
  }

  async deleteResume(userId: number, id: number) {
    try {
      const resume = await this.resumeRepository.findOne({ where: { id } });
      if (!resume) {
        throw new NotFoundException('Resume not found');
      }

      if (resume.userId !== userId) {
        throw new ForbiddenException('You do not have permission to delete this resume');
      }

      // Delete all related data
      await this.personalInfoRepository.delete({ resumeId: id });

      // Finally delete the resume
      await this.resumeRepository.delete(id);

      return { message: 'Resume and all related data deleted successfully' };
    } catch (error) {
      console.error('Error in deleteResume:', error);
      throw error;
    }
  }
} 