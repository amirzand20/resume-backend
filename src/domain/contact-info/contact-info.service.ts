import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactInfoRepository } from './contact-info.repository';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { ReadContactInfoDto } from './dto/read-contact-info.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class ContactInfoService {
  constructor(private readonly repository: ContactInfoRepository) {}

  async create(data: CreateContactInfoDto): Promise<ReadContactInfoDto> {
    const contactInfo = await this.repository.create(data);
    return this.mapToReadDto(contactInfo);
  }

  async update(id: number, data: UpdateContactInfoDto): Promise<ReadContactInfoDto> {
    const contactInfo = await this.repository.update(id, data);
    if (!contactInfo) {
      throw new NotFoundException(`ContactInfo with ID ${id} not found`);
    }
    return this.mapToReadDto(contactInfo);
  }

  async deleteById(id: number): Promise<ReadContactInfoDto> {
    const contactInfo = await this.repository.deleteById(id);
    if (!contactInfo) {
      throw new NotFoundException(`ContactInfo with ID ${id} not found`);
    }
    return this.mapToReadDto(contactInfo);
  }

  async getById(id: number): Promise<ReadContactInfoDto> {
    const contactInfo = await this.repository.getById(id);
    if (!contactInfo) {
      throw new NotFoundException(`ContactInfo with ID ${id} not found`);
    }
    return this.mapToReadDto(contactInfo);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadContactInfoDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(contactInfo: any): ReadContactInfoDto {
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
      modifiedDate: contactInfo.modifiedDate,
      createdBy: contactInfo.createdBy,
      modifiedBy: contactInfo.modifiedBy,
    };
  }
} 