import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { Step2Repository } from './step2.repository';
import { CreateStep2Dto, UpdateStep2Dto, ReadStep2Dto } from './dto';
import { ContactInfo } from '../../entities/contact-info.entity';
import { Person } from '../../entities/Person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class Step2Service {
  constructor(
    private readonly step2Repository: Step2Repository,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createStep2Dto: CreateStep2Dto): Promise<ReadStep2Dto> {
    // بررسی وجود شخص
    const person = await this.personRepository.findOne({
      where: { id: createStep2Dto.personId }
    });
    if (!person) {
      throw new NotFoundException('شخص مورد نظر یافت نشد');
    }

    // بررسی وجود محل سکونت (فعلاً فقط بررسی می‌کنیم که عدد مثبت باشد)
    if (createStep2Dto.locationPlaceId <= 0) {
      throw new BadRequestException('شناسه محل سکونت باید عدد مثبت باشد');
    }

    // بررسی تکراری نبودن شماره موبایل
    const existingMobile = await this.step2Repository.findByMobileNumber(createStep2Dto.mobileNumber);
    if (existingMobile) {
      throw new ConflictException('شماره موبایل قبلاً ثبت شده است');
    }

    // بررسی تکراری نبودن ایمیل (اگر ارائه شده)
    if (createStep2Dto.emailAddress) {
      const existingEmail = await this.step2Repository.findByEmail(createStep2Dto.emailAddress);
      if (existingEmail) {
        throw new ConflictException('آدرس ایمیل قبلاً ثبت شده است');
      }
    }

    // بررسی وجود رکورد قبلی برای این شخص
    const existingContactInfo = await this.step2Repository.findByPersonId(createStep2Dto.personId);
    if (existingContactInfo) {
      throw new ConflictException('اطلاعات تماس برای این شخص قبلاً ثبت شده است');
    }

    // اعتبارسنجی شماره‌های موبایل
    await this.validateMobileNumbers(createStep2Dto);

    const contactInfo = await this.step2Repository.create({
      ...createStep2Dto,
      isActive: createStep2Dto.isActive ?? true,
      createdDate: new Date()
    });

    return this.mapToReadDto(contactInfo);
  }

  async findAll(): Promise<ReadStep2Dto[]> {
    const contactInfos = await this.step2Repository.findAll();
    return contactInfos.map(contactInfo => this.mapToReadDto(contactInfo));
  }

  async findById(id: number): Promise<ReadStep2Dto> {
    const contactInfo = await this.step2Repository.findById(id);
    if (!contactInfo) {
      throw new NotFoundException('اطلاعات تماس مورد نظر یافت نشد');
    }
    return this.mapToReadDto(contactInfo);
  }

  async findByPersonId(personId: number): Promise<ReadStep2Dto> {
    const contactInfo = await this.step2Repository.findByPersonId(personId);
    if (!contactInfo) {
      throw new NotFoundException('اطلاعات تماس برای این شخص یافت نشد');
    }
    return this.mapToReadDto(contactInfo);
  }

  async update(id: number, updateStep2Dto: UpdateStep2Dto): Promise<ReadStep2Dto> {
    const existingContactInfo = await this.step2Repository.findById(id);
    if (!existingContactInfo) {
      throw new NotFoundException('اطلاعات تماس مورد نظر یافت نشد');
    }

    // بررسی وجود شخص (اگر تغییر کرده)
    if (updateStep2Dto.personId && updateStep2Dto.personId !== existingContactInfo.personId) {
      const person = await this.personRepository.findOne({
        where: { id: updateStep2Dto.personId }
      });
      if (!person) {
        throw new NotFoundException('شخص مورد نظر یافت نشد');
      }
    }

    // بررسی وجود محل سکونت (اگر تغییر کرده)
    if (updateStep2Dto.locationPlaceId && updateStep2Dto.locationPlaceId !== existingContactInfo.locationPlaceId) {
      if (updateStep2Dto.locationPlaceId <= 0) {
        throw new BadRequestException('شناسه محل سکونت باید عدد مثبت باشد');
      }
    }

    // بررسی تکراری نبودن شماره موبایل (اگر تغییر کرده)
    if (updateStep2Dto.mobileNumber && updateStep2Dto.mobileNumber !== existingContactInfo.mobileNumber) {
      const existingMobile = await this.step2Repository.findByMobileNumber(updateStep2Dto.mobileNumber, id);
      if (existingMobile) {
        throw new ConflictException('شماره موبایل قبلاً ثبت شده است');
      }
    }

    // بررسی تکراری نبودن ایمیل (اگر تغییر کرده)
    if (updateStep2Dto.emailAddress && updateStep2Dto.emailAddress !== existingContactInfo.emailAddress) {
      const existingEmail = await this.step2Repository.findByEmail(updateStep2Dto.emailAddress, id);
      if (existingEmail) {
        throw new ConflictException('آدرس ایمیل قبلاً ثبت شده است');
      }
    }

    // اعتبارسنجی شماره‌های موبایل
    await this.validateMobileNumbers(updateStep2Dto);

    const updatedContactInfo = await this.step2Repository.update(id, {
      ...updateStep2Dto,
      updatedDate: new Date()
    });
    return this.mapToReadDto(updatedContactInfo);
  }

  async delete(id: number): Promise<{ message: string }> {
    const existingContactInfo = await this.step2Repository.findById(id);
    if (!existingContactInfo) {
      throw new NotFoundException('اطلاعات تماس مورد نظر یافت نشد');
    }

    const deleted = await this.step2Repository.delete(id);
    if (!deleted) {
      throw new BadRequestException('خطا در حذف اطلاعات تماس');
    }

    return { message: 'اطلاعات تماس با موفقیت حذف شد' };
  }

  async validateContactInfo(personId: number): Promise<{ isValid: boolean; errors: string[] }> {
    const contactInfo = await this.step2Repository.findByPersonId(personId);
    const errors: string[] = [];

    if (!contactInfo) {
      errors.push('اطلاعات تماس ثبت نشده است');
      return { isValid: false, errors };
    }

    if (!contactInfo.mobileNumber) {
      errors.push('شماره موبایل الزامی است');
    }

    if (!contactInfo.locationAddress) {
      errors.push('آدرس محل سکونت الزامی است');
    }

    if (!contactInfo.locationPlaceId) {
      errors.push('محل سکونت الزامی است');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private async validateMobileNumbers(dto: CreateStep2Dto | UpdateStep2Dto): Promise<void> {
    const mobileNumbers = [
      dto.mobileNumber,
      dto.fatherMobileNumber,
      dto.motherMobileNumber,
      dto.familiarMobileNumber
    ].filter(Boolean);

    // بررسی تکراری نبودن شماره‌های موبایل
    const uniqueNumbers = new Set(mobileNumbers);
    if (uniqueNumbers.size !== mobileNumbers.length) {
      throw new BadRequestException('شماره‌های موبایل نمی‌توانند تکراری باشند');
    }

    // بررسی فرمت شماره‌های موبایل
    const mobileRegex = /^09\d{9}$/;
    for (const mobileNumber of mobileNumbers) {
      if (!mobileRegex.test(mobileNumber)) {
        throw new BadRequestException(`شماره موبایل ${mobileNumber} فرمت صحیح ندارد`);
      }
    }
  }

  private mapToReadDto(contactInfo: ContactInfo): ReadStep2Dto {
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
      createdAt: contactInfo.createdDate,
      updatedAt: contactInfo.updatedDate
    };
  }
} 