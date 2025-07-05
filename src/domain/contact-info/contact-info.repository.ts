import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from '@/entities/contact-info.entity';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { ReadContactInfoDto } from './dto/read-contact-info.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class ContactInfoRepository {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly repository: Repository<ContactInfo>,
  ) {}

  async create(data: CreateContactInfoDto): Promise<ContactInfo> {
    const contactInfo = this.repository.create(data);
    return await this.repository.save(contactInfo);
  }

  async update(id: number, data: UpdateContactInfoDto): Promise<ContactInfo> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<ContactInfo> {
    const contactInfo = await this.repository.findOne({ where: { id } });
    if (contactInfo) {
      await this.repository.delete(id);
    }
    return contactInfo;
  }

  async getById(id: number): Promise<ContactInfo> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadContactInfoDto>> {
    const queryBuilder = this.repository.createQueryBuilder('contactInfo');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('contactInfo.personId = :personId', { personId: filter.personId });
    }
    if (filter.locationPlaceId) {
      queryBuilder.andWhere('contactInfo.locationPlaceId = :locationPlaceId', { locationPlaceId: filter.locationPlaceId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('contactInfo.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }
    if (filter.isActive !== undefined) {
      queryBuilder.andWhere('contactInfo.isActive = :isActive', { isActive: filter.isActive });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`contactInfo.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('contactInfo.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(contactInfo: ContactInfo): ReadContactInfoDto {
    return {
      id: contactInfo.id,
      personId: contactInfo.personId,
      locationPlaceId: contactInfo.locationPlaceId,
      locationAddress: contactInfo.locationAddress,
      mobileNumber: contactInfo.mobileNumber,
      telephoneNumber: contactInfo.telephoneNumber,
      postCode: contactInfo.postCode,
      fatherMobileNumber: contactInfo.fatherMobileNumber,
      motherMobileNumber: contactInfo.motherMobileNumber,
      emailAddress: contactInfo.emailAddress,
      familiarMobileNumber: contactInfo.familiarMobileNumber,
      createdMethodId: contactInfo.createdMethodId,
      tableId: contactInfo.tableId,
      isActive: contactInfo.isActive,
      createdDate: contactInfo.createdDate,
      modifiedDate: contactInfo.updatedDate,
      createdBy: parseInt(contactInfo.createdBy),
      modifiedBy: contactInfo.updatedBy ? parseInt(contactInfo.updatedBy) : 0,
    };
  }
} 