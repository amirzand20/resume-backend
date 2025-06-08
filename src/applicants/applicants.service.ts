import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from '../entity/applicant.entity';
import { Person } from '../entity/Person.entity';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant)
    private applicantRepository: Repository<Applicant>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Applicant[]> {
    return this.applicantRepository.find({ relations: ['person'] });
  }

  async findOne(id: number): Promise<Applicant | null> {
    return this.applicantRepository.findOne({ 
      where: { id },
      relations: ['person']
    });
  }
} 