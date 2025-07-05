import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '@/entities/Person.entity';
import { CreateStep1Dto } from './dto/create-step1.dto';
import { UpdateStep1Dto } from './dto/update-step1.dto';

@Injectable()
export class Step1Repository {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createStep1Dto: CreateStep1Dto): Promise<Person> {
    const person = this.personRepository.create({
      nationalNo: createStep1Dto.nationalNo,
      firstName: createStep1Dto.firstName,
      lastName: createStep1Dto.lastName,
      birthDate: new Date(createStep1Dto.birthDate),
      birthPlaceId: createStep1Dto.birthPlaceId,
      locationPlaceId: createStep1Dto.locationPlaceId,
      sexId: createStep1Dto.sexId,
      aboutMe: createStep1Dto.aboutMe,
      mobileNumber: createStep1Dto.mobileNumber,
      telephoneNumber: createStep1Dto.telephoneNumber,
      emailAddress: createStep1Dto.emailAddress,
      address: createStep1Dto.address,
      postCode: createStep1Dto.postCode,
      profileImage: createStep1Dto.profileImage,
      createdDate: new Date(),
    });

    return await this.personRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({
      order: { createdDate: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Person> {
    return await this.personRepository.findOne({ where: { id } });
  }

  async findByNationalNo(nationalNo: string): Promise<Person> {
    return await this.personRepository.findOne({ where: { nationalNo } });
  }

  async update(id: number, updateStep1Dto: UpdateStep1Dto): Promise<Person> {
    const updateData: any = {};
    
    if (updateStep1Dto.nationalNo) updateData.nationalNo = updateStep1Dto.nationalNo;
    if (updateStep1Dto.firstName) updateData.firstName = updateStep1Dto.firstName;
    if (updateStep1Dto.lastName) updateData.lastName = updateStep1Dto.lastName;
    if (updateStep1Dto.birthDate) updateData.birthDate = new Date(updateStep1Dto.birthDate);
    if (updateStep1Dto.birthPlaceId) updateData.birthPlaceId = updateStep1Dto.birthPlaceId;
    if (updateStep1Dto.locationPlaceId !== undefined) updateData.locationPlaceId = updateStep1Dto.locationPlaceId;
    if (updateStep1Dto.sexId) updateData.sexId = updateStep1Dto.sexId;
    if (updateStep1Dto.aboutMe !== undefined) updateData.aboutMe = updateStep1Dto.aboutMe;
    if (updateStep1Dto.mobileNumber) updateData.mobileNumber = updateStep1Dto.mobileNumber;
    if (updateStep1Dto.telephoneNumber !== undefined) updateData.telephoneNumber = updateStep1Dto.telephoneNumber;
    if (updateStep1Dto.emailAddress !== undefined) updateData.emailAddress = updateStep1Dto.emailAddress;
    if (updateStep1Dto.address !== undefined) updateData.address = updateStep1Dto.address;
    if (updateStep1Dto.postCode !== undefined) updateData.postCode = updateStep1Dto.postCode;
    if (updateStep1Dto.profileImage !== undefined) updateData.profileImage = updateStep1Dto.profileImage;

    await this.personRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }

  async validateNationalNoExists(nationalNo: string, excludeId?: number): Promise<boolean> {
    const query = this.personRepository.createQueryBuilder('person')
      .where('person.nationalNo = :nationalNo', { nationalNo });
    
    if (excludeId) {
      query.andWhere('person.id != :excludeId', { excludeId });
    }
    
    const count = await query.getCount();
    return count > 0;
  }

  async validateMobileNumberExists(mobileNumber: string, excludeId?: number): Promise<boolean> {
    const query = this.personRepository.createQueryBuilder('person')
      .where('person.mobileNumber = :mobileNumber', { mobileNumber });
    
    if (excludeId) {
      query.andWhere('person.id != :excludeId', { excludeId });
    }
    
    const count = await query.getCount();
    return count > 0;
  }
} 