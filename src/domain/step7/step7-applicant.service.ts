import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { Step7ApplicantRepository } from './step7-applicant.repository';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { ReadApplicantDto } from './dto/read-applicant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/Person.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Applicant } from '../../entities/applicant.entity';

@Injectable()
export class Step7ApplicantService {
  constructor(
    private readonly applicantRepository: Step7ApplicantRepository,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(dto: CreateApplicantDto): Promise<ReadApplicantDto> {
    // Check if person exists
    const person = await this.personRepository.findOne({ where: { id: dto.personId } });
    if (!person) {
      throw new BadRequestException('فرد مورد نظر یافت نشد');
    }
    // Check if applicant already exists for this person
    const existing = await this.applicantRepository.findByPersonId(dto.personId);
    if (existing.length > 0) {
      throw new ConflictException('متقاضی برای این فرد قبلاً ثبت شده است');
    }
    // Set created date
    const data = {
      ...dto,
      createdDate: new Date(),
    };
    const entity = await this.applicantRepository.create(data);
    return this.mapper.map(entity, Applicant, ReadApplicantDto);
  }

  async findAll(): Promise<ReadApplicantDto[]> {
    const list = await this.applicantRepository.findAll();
    return this.mapper.mapArray(list, Applicant, ReadApplicantDto);
  }

  async findById(id: number): Promise<ReadApplicantDto> {
    const entity = await this.applicantRepository.findById(id);
    if (!entity) {
      throw new NotFoundException('متقاضی مورد نظر یافت نشد');
    }
    return this.mapper.map(entity, Applicant, ReadApplicantDto);
  }

  async findByPersonId(personId: number): Promise<ReadApplicantDto[]> {
    // Check if person exists
    const person = await this.personRepository.findOne({ where: { id: personId } });
    if (!person) {
      throw new BadRequestException('فرد مورد نظر یافت نشد');
    }
    const list = await this.applicantRepository.findByPersonId(personId);
    return this.mapper.mapArray(list, Applicant, ReadApplicantDto);
  }

  async update(id: number, dto: UpdateApplicantDto): Promise<ReadApplicantDto> {
    // Check if exists
    const existing = await this.applicantRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('متقاضی مورد نظر یافت نشد');
    }
    // If personId is being updated, check if person exists
    if (dto.personId && dto.personId !== existing.personId) {
      const person = await this.personRepository.findOne({ where: { id: dto.personId } });
      if (!person) {
        throw new BadRequestException('فرد مورد نظر یافت نشد');
      }
    }
    // Set updated date
    const updateData: any = {};
    if (dto.personId !== undefined) updateData.personId = dto.personId;
    if (dto.applicantStatusId !== undefined) updateData.applicantStatusId = dto.applicantStatusId;
    if (dto.createdMethodId !== undefined) updateData.createdMethodId = dto.createdMethodId;
    if (dto.tableId !== undefined) updateData.tableId = dto.tableId;
    if (dto.updatedBy !== undefined) updateData.updatedBy = dto.updatedBy;
    updateData.updatedDate = new Date();
    const updated = await this.applicantRepository.update(id, updateData);
    if (!updated) {
      throw new NotFoundException('متقاضی مورد نظر یافت نشد');
    }
    return this.mapper.map(updated, Applicant, ReadApplicantDto);
  }

  async delete(id: number): Promise<{ message: string }> {
    // Check if exists
    const existing = await this.applicantRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('متقاضی مورد نظر یافت نشد');
    }
    const deleted = await this.applicantRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('متقاضی مورد نظر یافت نشد');
    }
    return { message: 'متقاضی با موفقیت حذف شد' };
  }
} 