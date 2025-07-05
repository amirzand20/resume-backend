import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { Step1Repository } from './step1.repository';
import { CreateStep1Dto } from './dto/create-step1.dto';
import { UpdateStep1Dto } from './dto/update-step1.dto';
import { ReadStep1Dto } from './dto/read-step1.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Person } from '@/entities/Person.entity';

@Injectable()
export class Step1Service {
  constructor(
    private readonly step1Repository: Step1Repository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(createStep1Dto: CreateStep1Dto): Promise<ReadStep1Dto> {
    // بررسی تکراری نبودن کد ملی
    const existingPersonByNationalNo = await this.step1Repository.findByNationalNo(createStep1Dto.nationalNo);
    if (existingPersonByNationalNo) {
      throw new ConflictException('کد ملی قبلاً در سیستم ثبت شده است');
    }

    // بررسی تکراری نبودن شماره موبایل
    const existingPersonByMobile = await this.step1Repository.validateMobileNumberExists(createStep1Dto.mobileNumber);
    if (existingPersonByMobile) {
      throw new ConflictException('شماره موبایل قبلاً در سیستم ثبت شده است');
    }

    // بررسی سن (حداقل 18 سال)
    const birthDate = new Date(createStep1Dto.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {

    }
    
    if (age < 18) {
      throw new BadRequestException('سن شخص باید حداقل 18 سال باشد');
    }

    // بررسی تاریخ تولد (نباید در آینده باشد)
    if (birthDate > today) {
      throw new BadRequestException('تاریخ تولد نمی‌تواند در آینده باشد');
    }

    const person = await this.step1Repository.create(createStep1Dto);
    return this.mapper.map(person, Person, ReadStep1Dto);
  }

  async findAll(): Promise<ReadStep1Dto[]> {
    const persons = await this.step1Repository.findAll();
    return this.mapper.mapArray(persons, Person, ReadStep1Dto);
  }

  async findOne(id: number): Promise<ReadStep1Dto> {
    const person = await this.step1Repository.findOne(id);
    if (!person) {
      throw new NotFoundException('شخص مورد نظر یافت نشد');
    }
    return this.mapper.map(person, Person, ReadStep1Dto);
  }

  async findByNationalNo(nationalNo: string): Promise<ReadStep1Dto> {
    const person = await this.step1Repository.findByNationalNo(nationalNo);
    if (!person) {
      throw new NotFoundException('شخص با این کد ملی یافت نشد');
    }
    return this.mapper.map(person, Person, ReadStep1Dto);
  }

  async update(id: number, updateStep1Dto: UpdateStep1Dto): Promise<ReadStep1Dto> {
    // بررسی وجود شخص
    const existingPerson = await this.step1Repository.findOne(id);
    if (!existingPerson) {
      throw new NotFoundException('شخص مورد نظر یافت نشد');
    }

    // بررسی تکراری نبودن کد ملی (اگر تغییر کرده باشد)
    if (updateStep1Dto.nationalNo && updateStep1Dto.nationalNo !== existingPerson.nationalNo) {
      const existingPersonByNationalNo = await this.step1Repository.findByNationalNo(updateStep1Dto.nationalNo);
      if (existingPersonByNationalNo) {
        throw new ConflictException('کد ملی قبلاً در سیستم ثبت شده است');
      }
    }

    // بررسی تکراری نبودن شماره موبایل (اگر تغییر کرده باشد)
    if (updateStep1Dto.mobileNumber && updateStep1Dto.mobileNumber !== existingPerson.mobileNumber) {
      const existingPersonByMobile = await this.step1Repository.validateMobileNumberExists(updateStep1Dto.mobileNumber, id);
      if (existingPersonByMobile) {
        throw new ConflictException('شماره موبایل قبلاً در سیستم ثبت شده است');
      }
    }

    // بررسی سن (اگر تاریخ تولد تغییر کرده باشد)
    if (updateStep1Dto.birthDate) {
      const birthDate = new Date(updateStep1Dto.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {

      }
      
      if (age < 18) {
        throw new BadRequestException('سن شخص باید حداقل 18 سال باشد');
      }

      // بررسی تاریخ تولد (نباید در آینده باشد)
      if (birthDate > today) {
        throw new BadRequestException('تاریخ تولد نمی‌تواند در آینده باشد');
      }
    }

    const updatedPerson = await this.step1Repository.update(id, updateStep1Dto);
    return this.mapper.map(updatedPerson, Person, ReadStep1Dto);
  }

  async remove(id: number): Promise<void> {
    const person = await this.step1Repository.findOne(id);
    if (!person) {
      throw new NotFoundException('شخص مورد نظر یافت نشد');
    }
    await this.step1Repository.remove(id);
  }

  async validateStep1Complete(id: number): Promise<{ isValid: boolean; missingFields: string[] }> {
    const person = await this.step1Repository.findOne(id);
    if (!person) {
      throw new NotFoundException('شخص مورد نظر یافت نشد');
    }

    const requiredFields = [
      { field: 'nationalNo', value: person.nationalNo, name: 'کد ملی' },
      { field: 'firstName', value: person.firstName, name: 'نام' },
      { field: 'lastName', value: person.lastName, name: 'نام خانوادگی' },
      { field: 'birthDate', value: person.birthDate, name: 'تاریخ تولد' },
      { field: 'birthPlaceId', value: person.birthPlaceId, name: 'محل تولد' },
      { field: 'sexId', value: person.sexId, name: 'جنسیت' },
      { field: 'mobileNumber', value: person.mobileNumber, name: 'شماره موبایل' },
    ];

    const missingFields: string[] = [];

    requiredFields.forEach(({ field, value, name }) => {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        missingFields.push(name);
      }
    });

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  }
} 