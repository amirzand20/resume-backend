import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { Step4ExperienceRepository } from './step4-experience.repository';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ReadExperienceDto } from './dto/read-experience.dto';
import { Experience } from '../../entities/experience.entity';

@Injectable()
export class Step4ExperienceService {
  constructor(private readonly experienceRepository: Step4ExperienceRepository) {}

  async create(createDto: CreateExperienceDto): Promise<ReadExperienceDto> {
    if (new Date(createDto.startDate) >= new Date(createDto.endDate)) {
      throw new BadRequestException('تاریخ شروع باید قبل از تاریخ پایان باشد');
    }
    // جلوگیری از ثبت سابقه تکراری برای یک فرد با عنوان شغلی یکسان
    const duplicate = await this.experienceRepository.findByJobTitle(createDto.jobTitle);
    if (duplicate) {
      throw new ConflictException('سابقه با این عنوان شغلی قبلاً ثبت شده است');
    }
    const experienceData: Partial<Experience> = {
      ...createDto,
      startDate: new Date(createDto.startDate),
      endDate: new Date(createDto.endDate),
      createdDate: new Date(),
      createdBy: createDto.createdBy
    };
    const experience = await this.experienceRepository.create(experienceData);
    return this.mapToReadDto(experience);
  }

  async findAll(): Promise<ReadExperienceDto[]> {
    const experiences = await this.experienceRepository.findAll();
    return experiences.map(e => this.mapToReadDto(e));
  }

  async findById(id: number): Promise<ReadExperienceDto> {
    const experience = await this.experienceRepository.findById(id);
    if (!experience) throw new NotFoundException('سابقه مورد نظر یافت نشد');
    return this.mapToReadDto(experience);
  }

  async update(id: number, updateDto: UpdateExperienceDto): Promise<ReadExperienceDto> {
    const existing = await this.experienceRepository.findById(id);
    if (!existing) throw new NotFoundException('سابقه مورد نظر یافت نشد');
    if (updateDto.startDate && updateDto.endDate) {
      if (new Date(updateDto.startDate) >= new Date(updateDto.endDate)) {
        throw new BadRequestException('تاریخ شروع باید قبل از تاریخ پایان باشد');
      }
    }
    if (updateDto.jobTitle) {
      const duplicate = await this.experienceRepository.findByJobTitle(updateDto.jobTitle, id);
      if (duplicate) {
        throw new ConflictException('سابقه با این عنوان شغلی قبلاً ثبت شده است');
      }
    }
    const updateData: Partial<Experience> = {};
    if (updateDto.personId !== undefined) updateData.personId = updateDto.personId;
    if (updateDto.jobTitle !== undefined) updateData.jobTitle = updateDto.jobTitle;
    if (updateDto.jobTypeId !== undefined) updateData.jobTypeId = updateDto.jobTypeId;
    if (updateDto.jobOrganId !== undefined) updateData.jobOrganId = updateDto.jobOrganId;
    if (updateDto.startDate) updateData.startDate = new Date(updateDto.startDate);
    if (updateDto.endDate) updateData.endDate = new Date(updateDto.endDate);
    if (updateDto.createdMethodId !== undefined) updateData.createdMethodId = updateDto.createdMethodId;
    if (updateDto.tableId !== undefined) updateData.tableId = updateDto.tableId;
    if (updateDto.updatedBy) {
      updateData.updatedBy = updateDto.updatedBy;
      updateData.updatedDate = new Date();
    }
    const updated = await this.experienceRepository.update(id, updateData);
    if (!updated) throw new NotFoundException('خطا در بروزرسانی سابقه');
    return this.mapToReadDto(updated);
  }

  async delete(id: number): Promise<{ message: string }> {
    const existing = await this.experienceRepository.findById(id);
    if (!existing) throw new NotFoundException('سابقه مورد نظر یافت نشد');
    const deleted = await this.experienceRepository.delete(id);
    if (!deleted) throw new BadRequestException('خطا در حذف سابقه');
    return { message: 'سابقه با موفقیت حذف شد' };
  }

  async findByPersonId(personId: number): Promise<ReadExperienceDto[]> {
    const experiences = await this.experienceRepository.findByPersonId(personId);
    return experiences.map(e => this.mapToReadDto(e));
  }

  private mapToReadDto(e: Experience): ReadExperienceDto {
    return {
      id: e.id,
      personId: e.personId,
      jobTitle: e.jobTitle,
      jobTypeId: e.jobTypeId,
      jobOrganId: e.jobOrganId,
      startDate: e.startDate,
      endDate: e.endDate,
      createdMethodId: e.createdMethodId,
      tableId: e.tableId,
      createdDate: e.createdDate,
      updatedDate: e.updatedDate
    };
  }
} 