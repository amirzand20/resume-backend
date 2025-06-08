import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Person } from '../../../entity/Person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
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
    
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    
    return person;
  }

  async create(data: DeepPartial<Person>): Promise<Person> {
    const person = this.personRepository.create(data);
    return this.personRepository.save(person);
  }

  async update(id: number, data: DeepPartial<Person>): Promise<Person> {
    const person = await this.findOne(id);
    Object.assign(person, data);
    return this.personRepository.save(person);
  }

  async remove(id: number): Promise<void> {
    const person = await this.findOne(id);
    await this.personRepository.remove(person);
  }
} 