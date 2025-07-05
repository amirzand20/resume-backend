import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from '../../entities/applicant.entity';

@Injectable()
export class Step7ApplicantRepository {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
  ) {}

  async create(applicant: Partial<Applicant>): Promise<Applicant> {
    const newApplicant = this.applicantRepository.create(applicant);
    return await this.applicantRepository.save(newApplicant);
  }

  async findAll(): Promise<Applicant[]> {
    return await this.applicantRepository.find({ relations: ['person'] });
  }

  async findById(id: number): Promise<Applicant | null> {
    return await this.applicantRepository.findOne({ where: { id }, relations: ['person'] });
  }

  async findByPersonId(personId: number): Promise<Applicant[]> {
    return await this.applicantRepository.find({ where: { personId }, relations: ['person'] });
  }

  async update(id: number, applicant: Partial<Applicant>): Promise<Applicant | null> {
    await this.applicantRepository.update(id, applicant);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.applicantRepository.delete(id);
    return result.affected > 0;
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.applicantRepository.count({ where: { id } });
    return count > 0;
  }

  async countByPersonId(personId: number): Promise<number> {
    return await this.applicantRepository.count({ where: { personId } });
  }
} 