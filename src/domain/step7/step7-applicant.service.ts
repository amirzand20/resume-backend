import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { Step7ApplicantRepository } from './step7-applicant.repository';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { ReadApplicantDto } from './dto/read-applicant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/Person.entity';

@Injectable()
export class Step7ApplicantService {
  constructor(
    private readonly applicantRepository: Step7ApplicantRepository,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
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
    return this.mapToReadDto(entity);
  }

  async findAll(): Promise<ReadApplicantDto[]> {
    const list = await this.applicantRepository.findAll();
    return list.map(item => this.mapToReadDto(item));
  }

  async findById(id: number): Promise<ReadApplicantDto> {
    const entity = await this.applicantRepository.findById(id);
    if (!entity) {
      throw new NotFoundException('متقاضی مورد نظر یافت نشد');
    }
    return this.mapToReadDto(entity);
  }

  async findByPersonId(personId: number): Promise<ReadApplicantDto[]> {
    // Check if person exists
    const person = await this.personRepository.findOne({ where: { id: personId } });
    if (!person) {
      throw new BadRequestException('فرد مورد نظر یافت نشد');
    }
    const list = await this.applicantRepository.findByPersonId(personId);
    return list.map(item => this.mapToReadDto(item));
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
    return this.mapToReadDto(updated);
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

  private mapToReadDto(entity: any): ReadApplicantDto {
    return {
      id: entity.id,
      personId: entity.personId,
      applicantStatusId: entity.applicantStatusId,
      createdMethodId: entity.createdMethodId,
      tableId: entity.tableId,
      createdBy: entity.createdBy,
      createdDate: entity.createdDate,
      updatedBy: entity.updatedBy,
      updatedDate: entity.updatedDate,
    };
  }
} 